import React from 'react'
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

export const CategoryView = () => {
    const [categoryToAdd, setCategoryToAdd] = useState("");
    const [show, setShow] = useState(false);

    const closeAddCategory = () => setShow(false);
    const openAddCategory = () => setShow(true);

    const addNewCategory = (e) => {
        e.preventDefault();
        if (categoryToAdd.trim() == "") {
            alert("Category name cannot be empty!")
        } else {
            const category = {
                categoryName: categoryToAdd
            }
            axios.post('http://localhost:8080/api/categories', category)
              .then((response) => {
                console.log(response);
                window.location.reload();
              }, (error) => {
                console.log(error);
            });
        }
    }

    return (
        <div className="container p-5 border border-primary rounded m-5">
            <h3>Categories</h3>
            
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
