import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { deleteItemWithApi } from '../services';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const DeleteItemModal = ({ show, hideModal, itemToDeleteId }) => {

    const [themeContext, setThemeContext] = useContext(ThemeContext);

    const history = useHistory();

    const user = useSelector(state => state);

    const deleteItem = () => {
        hideModal();
        deleteItemWithApi(itemToDeleteId, user.token)
            .then(res => {
                history.goBack();
            });
    }

    return (
        <Modal
                show={show}
                onHide={hideModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header style={{color: "white"}} 
                              className={`${themeContext.backgroundTheme}`}>
                <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <div className="text-bold">All item data will be gone!</div>
                <button 
                    className={`btn ${themeContext.buttonTheme} mt-2`} 
                    type="submit" 
                    onClick={() => deleteItem()}>Delete</button>

                </Modal.Body>
                <Modal.Footer>
                <Button className={`${themeContext.buttonTheme}`} onClick={hideModal}>
                    Cancel
                </Button>
                </Modal.Footer>
            </Modal>
    )
}

export default DeleteItemModal;
