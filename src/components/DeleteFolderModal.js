import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { deleteFolderWithApi } from '../services';
import { CurrentFolderContext } from "../contexts/CurrentFolderContext";
import { useSelector } from "react-redux";

const DeleteFolderModal = ({ show, hideModal, goBackToParentFolder, folderId }) => {

    const [themeContext, setThemeContext] = useContext(ThemeContext);
    const [currentFolderContext, setCurrentFolderContext] = useContext(CurrentFolderContext);

    const user = useSelector(state => state);

    const deleteFolder = () => {
        hideModal();
        deleteFolderWithApi(folderId, user.token)
            .then(res => {
                setCurrentFolderContext(folderId);
                goBackToParentFolder();
            });
    }

    return (
        <Modal
                show={show}
                onHide={hideModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header 
                    style={{color: "white"}} 
                    className={`${themeContext.backgroundTheme}`}>

                    <Modal.Title>
                        Are you sure?
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    <div className="text-bold">
                        All items and folders in it will be also deleted!
                    </div>

                    <button 
                        className={`btn ${themeContext.buttonTheme} mt-2`} 
                        type="submit" 
                        onClick={() => deleteFolder()}>
                        Delete
                    </button>

                </Modal.Body>

                <Modal.Footer>

                    <Button 
                        className={`${themeContext.buttonTheme}`} 
                        onClick={hideModal}>
                        Cancel
                    </Button>

                </Modal.Footer>

            </Modal>
    )
}

export default DeleteFolderModal;
