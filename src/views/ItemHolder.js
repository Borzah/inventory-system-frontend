import { useEffect, useState, useContext } from 'react';
import ItemNode from '../components/ItemNode'
import FolderNode from '../components/FolderNode'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { CurrentFolderContext } from "../contexts/CurrentFolderContext";
import { CategoriesContext } from '../contexts/CategoriesContext';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addFodlerWithApi, deleteFolderWithApi, getCategoriesFromApi, getInventoryContent } from '../services';
import Spinner from 'react-bootstrap/Spinner';

const ItemHolder = () => {

    const history = useHistory();

    const [folders, setFolders] = useState([]);
    const [items, setItems] = useState([]);
    const [parentFolderId, setParentFolderId] = useState();
    const [currentFolderId, setCurrentFolderId] = useState();
    const [pathName, setPathName] = useState()
    const [showAddFolder, setShowAddFolder] = useState(false);

    const [isLoading, setIsLoading] = useState(true)

    const user = useSelector(state => state)

    const [folderToAddName, setFolderToAddName] = useState("");

    const [currentFolderContext, setCurrentFolderContext] = useContext(CurrentFolderContext);
    const [categoriesContext, setCategoriesContext] = useContext(CategoriesContext);

    const addFolderClose = () => {
        setShowAddFolder(false);
        setFolderToAddName()
    }
    const addFolderShow = () => {
        setShowAddFolder(true);
    }

    const getCategories = (user) => {
        getCategoriesFromApi(user.userId, user.token)
            .then(response => {
                const data  = response.data
                setCategoriesContext(data)
            }).catch(error => {
                let errMsg =  (error.response.data.message);
                    alert(errMsg);
            })
    }

    const getData = (pathString) => {
        setIsLoading(true);
        getInventoryContent(pathString, user.token)
            .then(response => {
                const data  = response.data
                setParentFolderId(data.parentFolderId)
                setFolders(data.folders)
                setItems(data.items)
                setCurrentFolderId(data.currentFolderId)
                setCurrentFolderContext(data.currentFolderId)
                setPathName(data.currentFolderPathName)
                setIsLoading(false)
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
        getCategories(user);
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
            
            { !isLoading ?
            <div className="container mb-3 pb-3 pt-3 mt-3 shadow-lg">

            <p className="h6 text-start">{pathName}</p>
            <hr></hr>
            <div className="row"><h4 className="col-md mw-50">Folders</h4></div>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            {folders.map(fol => <div className="col mb-4"><div onClick={() => getData(`/api/inventory?user=${user.userId}&folder=${fol.folderId}`)}>
                <FolderNode folder={fol}/>
            </div></div>)}</div>
            <hr></hr>
            <h4>Items</h4>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            {items.map(itm => <div className="col mb-4"><ItemNode item={itm}/></div>)}</div>
            <hr></hr>
            
            

            <div class="row">
                {currentFolderId ? <div className="col-md mt-2"><button type="button" className="btn my-button" onClick={() => goBackToParentFolder()}
                >Go Back</button></div> : ''}
                <div className="col-md mt-2">
                <Link type="button" className="btn my-button" to="/item/add">Add Item</Link>
                </div>
                <div className="col-md mt-2">
                <button type="button" className="btn my-button" onClick={addFolderShow}>Add folder</button>
                </div>
                <div className="col-md mt-2">
                {currentFolderId ? <button type="button" className="btn my-button" onClick={deleteFolder}>DeleteFolder</button>: ''}
                </div>
            </div>

            <Modal
                show={showAddFolder}
                onHide={addFolderClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <input class="form-control me-2" type="text" placeholder="New Folder Name" aria-label="New Folder Name"
                onChange={(e) => setFolderToAddName(e.target.value)}></input>
                <button class="btn my-button" type="submit" onClick={(e) => addNewFolder(e)}>Add!</button>

                </Modal.Body>
                <Modal.Footer>
                <Button className="my-button" onClick={addFolderClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            
            </div>
            : <Spinner className="extra-margin-top" animation="border" />}
        </div>
    )
}

export default ItemHolder;
