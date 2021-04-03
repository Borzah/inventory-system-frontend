import { useEffect, useState, useContext } from 'react';
import ItemNode from '../components/ItemNode';
import FolderNode from '../components/FolderNode';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { CurrentFolderContext } from "../contexts/CurrentFolderContext";
import { CategoriesContext } from '../contexts/CategoriesContext';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addFodlerWithApi, deleteFolderWithApi, getCategoriesFromApi, getInventoryContent } from '../services';
import Spinner from 'react-bootstrap/Spinner';
import { handleBigOnePieceString } from '../utils';
import { ThemeContext } from '../contexts/ThemeContext';

const ItemHolder = () => {

    const history = useHistory();

    const [folders, setFolders] = useState([]);
    const [items, setItems] = useState([]);
    const [parentFolderId, setParentFolderId] = useState();
    const [currentFolderId, setCurrentFolderId] = useState();
    const [pathName, setPathName] = useState();

    const [showAddFolder, setShowAddFolder] = useState(false);
    const [showDeleteFolder, setShowDeleteFolder] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const user = useSelector(state => state);

    const [folderToAddName, setFolderToAddName] = useState("");

    const [currentFolderContext, setCurrentFolderContext] = useContext(CurrentFolderContext);
    const [categoriesContext, setCategoriesContext] = useContext(CategoriesContext);
    const [themeContext, setThemeContext] = useContext(ThemeContext);

    const addFolderClose = () => {
        setShowAddFolder(false);
        setFolderToAddName();
    }

    const addFolderShow = () => {
        setShowAddFolder(true);
    }

    const deleteFolderShow = () => {
        setShowDeleteFolder(true);
    }

    const deleteFolderClose = () => {
        setShowDeleteFolder(false);
    }

    const getCategories = (user) => {
        getCategoriesFromApi(user.token)
            .then(response => {
                const data  = response.data;
                setCategoriesContext(data);
            }).catch(error => {
                let errMsg =  (error.response.data.message);
                    alert(errMsg);
            })
    }

    const getData = (pathString) => {
        setIsLoading(true);
        getInventoryContent(pathString, user.token)
            .then(response => {
                const data  = response.data;
                setParentFolderId(data.parentFolderId);
                setFolders(data.folders);
                setItems(data.items);
                setCurrentFolderId(data.currentFolderId);
                setCurrentFolderContext(data.currentFolderId);
                setPathName(data.currentFolderPathName);
                setIsLoading(false);
            }).catch(error => {
                let errMsg =  (error.response.data.message);
                    alert(errMsg);
            })
    }

    const whenGoingOnPage = () => {
        if (currentFolderContext) {
            getData(`/api/inventory?folderId=${currentFolderContext}`);
        } else {
            getData('/api/inventory');
        }
        getCategories(user);
    }

    useEffect(() => {
        if (typeof user === 'undefined') {
            history.push("/");
        } else if (user.role === "ADMIN") {
            history.push("/admin");
        } else {
            whenGoingOnPage();
        }
    }, []);

    const goBackToParentFolder = () => {
        if (parentFolderId) {
            getData(`/api/inventory?folderId=${parentFolderId}`);
        } else {
            getData('/api/inventory');
        }
    }

    const addNewFolder = (e) => {
        e.preventDefault();
        if (!folderToAddName || folderToAddName.trim() == "") {
            alert("Folder name cannot be empty!");
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
              }).catch(error => {
                    let errMsg =  (error.response.data.message);
                    alert(errMsg);
              });
        }
    }

    const deleteFolder = () => {
        deleteFolderClose();
        deleteFolderWithApi(currentFolderId, user.token)
            .then(res => {
                setCurrentFolderContext(parentFolderId);
                goBackToParentFolder();
            });
    }

    return (
        <div className="container mb-3 mt-3">
            <h2><i className="fas fa-warehouse"></i> Inventory</h2>
            
            { !isLoading ?
            <div className="container mb-3 pb-3 pt-3 mt-3 shadow-lg">

            <p className="h6 text-start">{pathName.length > 20 ? handleBigOnePieceString(pathName) : pathName}</p>
            <hr></hr>
            <div className="row"><h4 className="col-md mw-50">Folders</h4></div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            {folders.map(fol => <div key={fol.folderId} onClick={() => getData(`/api/inventory?folderId=${fol.folderId}`)}>
                <FolderNode key={fol.folderId} folder={fol}/>
            </div>)}</div>
            <hr></hr>
            <h4>Items</h4>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            {items.map(itm => <ItemNode key={itm.itemId} item={itm}/>)}</div>
            <hr></hr>
            
            

            <div className="row">
                {currentFolderId ? <div className="col-md mt-2"><button type="button" className={`btn ${themeContext.buttonTheme}`} onClick={() => goBackToParentFolder()}
                >Go Back</button></div> : ''}
                <div className="col-md mt-2">
                <Link type="button" className={`btn ${themeContext.buttonTheme}`} to="/item/add">Add Item</Link>
                </div>
                <div className="col-md mt-2">
                <button type="button" className={`btn ${themeContext.buttonTheme}`} onClick={addFolderShow}>Add folder</button>
                </div>
                <div className="col-md mt-2">
                {currentFolderId ? <button type="button" className={`btn ${themeContext.buttonTheme}`} onClick={deleteFolderShow}>DeleteFolder</button>: ''}
                </div>
            </div>

            <Modal
                show={showAddFolder}
                onHide={addFolderClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header style={{color: "white"}} className={`${themeContext.backgroundTheme}`}>
                <Modal.Title>Add folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <input className="form-control me-2" type="text" placeholder="New Folder Name" aria-label="New Folder Name"
                onChange={(e) => setFolderToAddName(e.target.value)}></input>
                <button className={`btn ${themeContext.buttonTheme}`} type="submit" onClick={(e) => addNewFolder(e)}>Add!</button>

                </Modal.Body>
                <Modal.Footer>
                <Button className={`${themeContext.buttonTheme}`} onClick={addFolderClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showDeleteFolder}
                onHide={setShowDeleteFolder}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header style={{color: "white"}} className={`${themeContext.backgroundTheme}`}>
                <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <div className="text-bold">All items and folders in it will be also deleted!</div>
                <button className={`btn ${themeContext.buttonTheme} mt-2`} type="submit" onClick={() => deleteFolder()}>Delete</button>

                </Modal.Body>
                <Modal.Footer>
                <Button className={`${themeContext.buttonTheme}`} onClick={deleteFolderClose}>
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
