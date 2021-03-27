import React from 'react'
import { useEffect, useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CategoriesContext } from '../contexts/CategoriesContext';
import { addCategoryToApi } from '../services';

export const CategoryView = () => {

    const history = useHistory();
    const user = useSelector(state => state)

    const [categoriesContext, setCategoriesContext] = useContext(CategoriesContext);

    const [categoryToAdd, setCategoryToAdd] = useState("");
    const [show, setShow] = useState(false);

    const closeAddCategory = () => setShow(false);
    const openAddCategory = () => setShow(true);

    useEffect(() => {
        if (typeof user === 'undefined') {
            history.push("/")
        } else if (user.role === "ADMIN") {
            history.push("/admin")
        }
    }, [])

    const addNewCategory = (e) => {
        e.preventDefault();
        if (categoryToAdd.trim() == "") {
            alert("Category name cannot be empty!")
        } else {
            const category = {
                categoryName: categoryToAdd,
                userId: user.userId
            }
            addCategoryToApi(category, user.token)
              .then((response) => {
                setCategoriesContext([...categoriesContext, response.data])
                alert("Category added")
              }).catch(error => {
                let errMsg =  (error.response.data.message);
                alert(errMsg);
          });
        }
    }

    return (
        <div className="container mb-3 mt-3">
            <h3>Categories</h3>
            <hr></hr>
            {categoriesContext.map(category => <div><h4>{category.categoryName}</h4><hr></hr></div>)}
            
            <Button variant="primary" onClick={openAddCategory}>
                Add new category!
            </Button>

            <Modal
                show={show}
                onHide={closeAddCategory}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                <input class="form-control me-2" type="text" placeholder="New Category" aria-label="New Category"
                onChange={(e) => setCategoryToAdd(e.target.value)}></input>
                <button class="btn btn-outline-success" type="submit" onClick={(e) => addNewCategory(e)}>Add!</button>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={closeAddCategory}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
