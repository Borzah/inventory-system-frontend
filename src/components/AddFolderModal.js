import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useContext } from 'react';
import { CurrentFolderContext } from "../contexts/CurrentFolderContext";
import { addFodlerWithApi } from '../services';
import { ThemeContext } from '../contexts/ThemeContext';
import { useSelector } from "react-redux";

const AddFolderModal = ({ show, hideModal, whenGoingOnPage }) => {

    const [folderToAddName, setFolderToAddName] = useState(null);

    const user = useSelector(state => state);

    const [currentFolderContext, setCurrentFolderContext] = useContext(CurrentFolderContext);
    const [themeContext, setThemeContext] = useContext(ThemeContext);

    const setHideModal = () => {
        setFolderToAddName(null);
        hideModal();
    }
    
    const addNewFolder = (e) => {
        e.preventDefault();
        if (!folderToAddName || folderToAddName.trim() === "") {
            alert("Folder name cannot be empty!");
        } else {
            let folderName = folderToAddName.trim();
            let newFolder = {
                folderName: folderName
            }
            if (currentFolderContext) {
                newFolder = {...newFolder, parentId: currentFolderContext}
            }
            addFodlerWithApi(newFolder, user.token)
              .then((response) => {
                    setHideModal();
                    whenGoingOnPage();
              }).catch(error => {
                    let errMsg =  (error.response.data.message);
                    alert(errMsg);
              });
        }
    }

    return (
        <Modal
                show={show}
                onHide={setHideModal}
                backdrop="static"
                keyboard={true}
            >
                <Modal.Header 
                    style={{color: "white"}} 
                    className={`${themeContext.backgroundTheme}`}>

                    <Modal.Title>
                        Add folder
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    <input 
                        className="form-control me-2" 
                        type="text" 
                        placeholder="New Folder Name" 
                        aria-label="New Folder Name"
                        onChange={(e) => setFolderToAddName(e.target.value)}>
                    </input>
                    <button 
                        className={`btn ${themeContext.buttonTheme}`} 
                        type="submit" 
                        onClick={(e) => addNewFolder(e)}>
                        Add!
                    </button>

                    </Modal.Body>

                <Modal.Footer>

                    <Button 
                        className={`${themeContext.buttonTheme}`} 
                        onClick={setHideModal}>
                        Close
                    </Button>

                </Modal.Footer>
                
            </Modal>
    )
}

export default AddFolderModal;
