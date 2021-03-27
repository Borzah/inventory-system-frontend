import { useEffect, useState, useContext } from 'react';
import ItemNode from '../components/ItemNode'
import FolderNode from '../components/FolderNode'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { CurrentFolderContext } from "../contexts/CurrentFolderContext";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addFodlerWithApi, deleteFolderWithApi, getInventoryContent } from '../services';

const ItemHolder = () => {

    const history = useHistory();

    const [folders, setFolders] = useState([]);
    const [items, setItems] = useState([]);
    const [parentFolderId, setParentFolderId] = useState();
    const [currentFolderId, setCurrentFolderId] = useState();
    const [pathName, setPathName] = useState()
    const [showAddFolder, setShowAddFolder] = useState(false);

    const user = useSelector(state => state)

    const [folderToAddName, setFolderToAddName] = useState("");

    const [currentFolderContext, setCurrentFolderContext] = useContext(CurrentFolderContext);

    const addFolderClose = () => {
        setShowAddFolder(false);
        setFolderToAddName()
    }
    const addFolderShow = () => {
        setShowAddFolder(true);
    }

    const getData = (pathString) => {
        getInventoryContent(pathString, user.token)
            .then(response => {
                const data  = response.data
                setParentFolderId(data.parentFolderId)
                setFolders(data.folders)
                setItems(data.items)
                setCurrentFolderId(data.currentFolderId)
                setCurrentFolderContext(data.currentFolderId)
                setPathName(data.currentFolderPathName)
            }).catch(error => {
                console.log(error);
            })
    }

    const whenGoingOnPage = () => {
        if (currentFolderContext) {
            getData(`/api/inventory?user=${user.userId}&folder=${currentFolderContext}`)
        } else {
            getData(`/api/inventory?user=${user.userId}`);
        }
    }

    useEffect(() => {
        if (typeof user === 'undefined') {
            history.push("/")
        } else if (user.role === "ADMIN") {
            history.push("/admin")
        } else {
            whenGoingOnPage();
        }
    }, []);

    const goBackToParentFolder = () => {
        if (parentFolderId) {
            getData(`/api/inventory?user=${user.userId}&folder=${parentFolderId}`);
        } else {
            getData(`/api/inventory?user=${user.userId}`);
        }
    }

    const addNewFolder = (e) => {
        e.preventDefault();
        if (!folderToAddName || folderToAddName.trim() == "") {
            alert("Folder name cannot be empty!")
        } else {
            let folderName = folderToAddName.trim();
            let newFolder = {
                folderName: folderName,
                userId: user.userId
            }
            if (currentFolderId) {
                newFolder = {...newFolder, parentId: currentFolderId}
            }
            addFodlerWithApi(newFolder, user.token)
              .then((response) => {
                    addFolderClose();
                    whenGoingOnPage();
                    alert('Folder added')
              }).catch(error => {
                    let errMsg =  (error.response.data.message);
                    alert(errMsg);
              });
        }
    }

    const deleteFolder = () => {
        deleteFolderWithApi(currentFolderId, user.token)
            .then(res => {
                setCurrentFolderContext(parentFolderId)
                goBackToParentFolder();
                alert('Folder deleted')
            });
    }

    return (
        <div className="container mb-3 mt-3">
            <h2>Inventory</h2>
            <hr></hr>
            <h3>{pathName}</h3>
            <hr></hr>
            <h4>Folders</h4>
            {folders.length > 0 ? folders.map(fol => <div onClick={() => getData(`http://localhost:8080/api/inventory?user=${user.userId}&folder=${fol.folderId}`)}>
                <FolderNode folder={fol}/>
            </div>) : ''}
            <hr></hr>
            <h4>Items</h4>
            {items.length > 0 ? items.map(itm => <ItemNode item={itm}/>): ''}
            <hr></hr>
            
            

            <div class="row">
                {currentFolderId ? <div className="col-md mt-2"><button type="button" className="btn btn-warning" onClick={() => goBackToParentFolder()}
                >Go Back</button></div> : ''}
                <div className="col-md mt-2">
                <Link type="button" className="btn btn-primary" to="/item/add">Add Item</Link>
                </div>
                <div className="col-md mt-2">
                <button type="button" className="btn btn-secondary" onClick={addFolderShow}>Add folder</button>
                </div>
                <div className="col-md mt-2">
                <button type="button" className="btn btn-danger" onClick={deleteFolder}>DeleteFolder</button>
                </div>
            </div>

            <Modal
                show={showAddFolder}
                onHide={addFolderClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <input class="form-control me-2" type="text" placeholder="New Folder Name" aria-label="New Folder Name"
                onChange={(e) => setFolderToAddName(e.target.value)}></input>
                <button class="btn btn-outline-success" type="submit" onClick={(e) => addNewFolder(e)}>Add!</button>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={addFolderClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default ItemHolder;

            // <div className="d-flex justify-content-between">
            //     {currentFolderId ? <button type="button" className="btn btn-warning" onClick={() => goBackToParentFolder()}
            //     >Go Back</button> : ''}
            //     <Link type="button" className="btn btn-primary" to="/item/add">Add Item</Link>
            //     <button type="button" className="btn btn-secondary" onClick={addFolderShow}>Add folder</button>
            //     <button type="button" className="btn btn-danger" onClick={deleteFolder}>DeleteFolder</button>
            // </div>
