import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ItemNode from '../components/ItemNode'
import FolderNode from '../components/FolderNode'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { CurrentFolderContext } from "../contexts/CurrentFolderContext";

const ItemHolder = () => {
;
    const [folders, setFolders] = useState([]);
    const [items, setItems] = useState([]);
    const [parentFolderId, setParentFolderId] = useState();
    const [currentFolderId, setCurrentFolderId] = useState();
    const [pathName, setPathName] = useState()
    const [showAddFolder, setShowAddFolder] = useState(false);

    const [folderToAddName, setFolderToAddName] = useState("");
    const [folderToAddParentId, setFolderToAddParentId] = useState();

    const [currentFolderContext, setCurrentFolderContext] = useContext(CurrentFolderContext);

    const addFolderClose = () => {
        setShowAddFolder(false);
        setFolderToAddName()
    }
    const addFolderShow = () => {
        setShowAddFolder(true);
        console.log(currentFolderId)
    }

    const getData = (pathString) => {
        axios.get(pathString)
            .then(response => {
                const data  = response.data
                console.log(data)
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

    useEffect(() => {
        getData('http://localhost:8080/api/inventory?user=3');
    }, []);

    const goBackToParentFolder = () => {
        if (parentFolderId) {
            getData(`http://localhost:8080/api/inventory?user=3&folder=${parentFolderId}`);
        } else {
            getData('http://localhost:8080/api/inventory?user=3');
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
                parentId: currentFolderId,
                userId: 3
            }
            axios.post('http://localhost:8080/api/folders', newFolder)
              .then((response) => {
                console.log(response);
              }, (error) => {
                console.log(error);
            });
            addFolderClose();
            window.location.reload();
        }
    }

    return (
        <div className="container p-5 border border-primary rounded m-5">
            <h1>{pathName}</h1>
            <hr></hr>
            <h2>Folders</h2>
            {folders.map(fol => <div onClick={() => getData(`http://localhost:8080/api/inventory?user=3&folder=${fol.folderId}`)}>
                <FolderNode folder={fol}/>
            </div>)}
            <hr></hr>
            <h2>Items</h2>
            {items.map(itm => <ItemNode item={itm}/>)}
            <hr></hr>
            <div className="d-flex justify-content-between">
                {currentFolderId ? <button type="button" className="btn btn-danger" onClick={() => goBackToParentFolder()}
                >Go Back</button> : ''}
                <Link type="button" className="btn btn-primary" to="/add">Add Item</Link>
                <button type="button" className="btn btn-secondary" onClick={addFolderShow}>Add folder</button>
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
//onClick={getData(`http://localhost:8080/api/inventory?user=1&folder=${previousFolderId}`)}
export default ItemHolder;
