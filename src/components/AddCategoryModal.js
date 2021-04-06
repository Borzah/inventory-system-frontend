import Modal from 'react-bootstrap/Modal';
import { useState, useContext } from 'react';
import { useSelector } from "react-redux";
import { addCategoryToApi } from '../services';
import { ThemeContext } from '../contexts/ThemeContext';
import { CategoriesContext } from '../contexts/CategoriesContext';

const AddCategoryModal = ({ show, hideModal }) => {

    const user = useSelector(state => state);

    const [themeContext, setThemeContext] = useContext(ThemeContext);
    const [categoriesContext, setCategoriesContext] = useContext(CategoriesContext);

    const [categoryToAdd, setCategoryToAdd] = useState(null);

    const setHideModal = () => {
        setCategoryToAdd(null);
        hideModal();
    }

    const addNewCategory = (e) => {
        e.preventDefault();
        if (!categoryToAdd || categoryToAdd.trim() === "") {
            alert("Category name cannot be empty!");
        } else {
            const category = {
                categoryName: categoryToAdd,
                userId: user.userId
            }
            addCategoryToApi(category, user.token)
              .then((response) => {
                setCategoriesContext([...categoriesContext, response.data]);
                hideModal();
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
                <Modal.Header style={{color: "white"}} className={`${themeContext.backgroundTheme}`}>
                <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                <input 
                    className="form-control me-2" 
                    type="text" 
                    placeholder="New Category" 
                    aria-label="New Category"
                    onChange={(e) => setCategoryToAdd(e.target.value)}>
                </input>

                <button 
                    className={`btn ${themeContext.buttonTheme}`} 
                    type="submit" 
                    onClick={(e) => addNewCategory(e)}>
                    Add!
                </button>

                </Modal.Body>
                <Modal.Footer>
                <button className={`btn ${themeContext.buttonTheme}`} onClick={setHideModal}>
                    Close
                </button>
                </Modal.Footer>
            </Modal>
    )
}

export default AddCategoryModal;
