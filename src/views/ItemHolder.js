import ItemNode from '../components/ItemNode';
import FolderNode from '../components/FolderNode';
import Spinner from 'react-bootstrap/Spinner';
import AddFolderModal from '../components/AddFolderModal';
import DeleteFolderModal from '../components/DeleteFolderModal';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentFolderContext } from "../contexts/CurrentFolderContext";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getInventoryContent } from '../services';
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

    const [currentFolderContext, setCurrentFolderContext] = useContext(CurrentFolderContext);
    const [themeContext, setThemeContext] = useContext(ThemeContext);

    const addFolderClose = () => {
        setShowAddFolder(false);
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
    }

    useEffect(() => {
        whenGoingOnPage();
    }, []);

    const goBackToParentFolder = () => {
        if (parentFolderId) {
            getData(`/api/inventory?folderId=${parentFolderId}`);
        } else {
            getData('/api/inventory');
        }
    }

    return (
        <div className="container mb-3 mt-3">

            <h2>
                <i className="fas fa-warehouse"></i> Inventory
            </h2>
            
            { !isLoading ?

                <div className="container mb-3 pb-3 pt-3 mt-3 shadow-lg">

                <div className="d-flex flex-row bd-highlight mb-3">

                {currentFolderId ? 
                    <div>
                        <button 
                            type="button" 
                            className={`btn ${themeContext.buttonTheme}`} 
                            onClick={() => goBackToParentFolder()}>
                            <i className="fas fa-arrow-left"></i>
                        </button>
                    </div> : ''}

                    <div style={{width: "20px"}}></div>

                    <p className="h6 text-start align-self-end">
                        {pathName.length > 20 
                            ? handleBigOnePieceString(pathName) 
                            : pathName}
                    </p>
                
                </div>

                    <hr></hr>

                    <div className="row">
                        <h4 className="col-md mw-50">
                            Folders
                        </h4>
                    </div>

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                        {folders.map(fol => 
                            <div 
                                key={fol.folderId} 
                                onClick={() => getData(`/api/inventory?folderId=${fol.folderId}`)}>

                                <FolderNode key={fol.folderId} folder={fol}/>
                                
                            </div>)}
                    </div>

                    <hr></hr>

                    <h4>Items</h4>

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                        {items.map(itm => <ItemNode key={itm.itemId} item={itm}/>)}
                    </div>

                    <hr></hr>            

                    <div className="row">

                        <div className="col-md mt-2">
                            <Link 
                                type="button" 
                                className={`btn ${themeContext.buttonTheme}`} 
                                to="/item/add">
                                Add Item
                            </Link>
                        </div>

                        <div className="col-md mt-2">
                            <button 
                                type="button" 
                                className={`btn ${themeContext.buttonTheme}`} 
                                onClick={addFolderShow}>
                                Add folder
                            </button>
                        </div>

                        {currentFolderId ?   
                            <div className="col-md mt-2">
                                <button 
                                    type="button" 
                                    className={`btn ${themeContext.buttonTheme}`} 
                                    onClick={deleteFolderShow}>
                                    DeleteFolder
                                </button>
                            </div> : ''}
                    </div>

                    <AddFolderModal 
                        show={showAddFolder} 
                        hideModal={addFolderClose} 
                        whenGoingOnPage={whenGoingOnPage} />

                    <DeleteFolderModal 
                        show={showDeleteFolder} 
                        hideModal={deleteFolderClose} 
                        goBackToParentFolder={goBackToParentFolder} 
                        folderId={currentFolderId} />
                
                </div>

                : <Spinner className="extra-margin-top" animation="border" />
            }

        </div>
    )
}

export default ItemHolder;
