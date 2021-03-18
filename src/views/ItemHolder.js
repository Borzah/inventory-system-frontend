import { useEffect, useState } from 'react';
import axios from 'axios';
import ItemNode from '../components/ItemNode'
import FolderNode from '../components/FolderNode'
import { Link } from 'react-router-dom'

const ItemHolder = () => {

    const [folders, setFolders] = useState([]);
    const [items, setItems] = useState([]);
    const [parentFolderId, setParentFolderId] = useState();
    const [currentFolderId, setCurrentFolderId] = useState();
    const [currentFolderName, setCurrentFolderName] = useState();
    const [pathName, setPathName] = useState()

    const getData = (pathString) => {
        axios.get(pathString)
            .then(response => {
                const data  = response.data
                console.log(data)
                setParentFolderId(data.parentFolderId)
                setFolders(data.folders)
                setItems(data.items)
                setCurrentFolderId(data.currentFolderId)
                setCurrentFolderName(data.currentFolderName)
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
                <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add folder</button>
            </div>

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Add folder</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input class="form-control me-2" type="text" placeholder="New Folder Name" aria-label="New Folder Name"></input>
                    <button class="btn btn-outline-success" type="submit">Add!</button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
                </div>
            </div>
            </div>

        </div>
    )
}
//onClick={getData(`http://localhost:8080/api/inventory?user=1&folder=${previousFolderId}`)}
export default ItemHolder;
