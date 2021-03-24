import React from 'react'
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const CategoryView = () => {

    const history = useHistory();
    const user = useSelector(state => state)

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
                categoryName: categoryToAdd,
                userId: user.userId
            }
            axios.post('http://localhost:8080/api/categories', category, {headers: {
                'Authorization': `Bearer ${user.token}`
              }})
              .then((response) => {
                console.log(response);
                alert("Category added")
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
