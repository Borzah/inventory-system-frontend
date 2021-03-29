import React from 'react'
import { useEffect, useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CategoriesContext } from '../contexts/CategoriesContext';
import { addCategoryToApi, getItemsByCategory } from '../services';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ItemNode from '../components/ItemNode';

export const CategoryView = () => {

    const history = useHistory();
    const user = useSelector(state => state)

    const [categoriesContext, setCategoriesContext] = useContext(CategoriesContext);

    const [categoryToAdd, setCategoryToAdd] = useState("");
    const [show, setShow] = useState(false);
    const [categoryItems, setCategoryItems] = useState([]);

    const closeAddCategory = () => setShow(false);
    const openAddCategory = () => setShow(true);

    useEffect(() => {
        if (typeof user === 'undefined') {
            history.push("/")
        } else if (user.role === "ADMIN") {
            history.push("/admin")
        } else {
            getItemsByCategory(user.userId, user.token)
            .then(response => {
                let data = response.data;
                let resultList = []
                for (var key of Object.keys(data)) {
                    if (data[key].length > 0) {
                        resultList.push(
                            {
                                "name": key,
                                "items": data[key]
                            }
                        )
                    }
                }
                setCategoryItems(resultList)
            })
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
            
            <div className="container rounded mb-3 pb-3 pt-3 mt-3 shadow-lg">
            
            {categoryItems.length > 0 ? <Accordion>

                {categoryItems.map((category, index) => 
                    <Card>
                        <Accordion.Toggle className="secondary-block-pointer pt-3 pb-3" as={Card.Header} eventKey={index.toString()}>
                        {category.name}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={index.toString()}>
                        <Card.Body>
                            {category.items.map(itm => <ItemNode item={itm}/>)}
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>)}
            </Accordion>
             : <p>You have no items with categories yet.</p>
                }
                <hr></hr>
            
            <Button className="my-button" onClick={openAddCategory}>
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
                <Button className="my-button" onClick={closeAddCategory}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

            </div>
        </div>
    )
}
