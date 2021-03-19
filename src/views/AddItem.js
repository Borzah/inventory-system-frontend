import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { CurrentFolderContext } from "../contexts/CurrentFolderContext";
import { useState, useContext, useEffect } from 'react';

const AddItem = () => {

    const [currentFolderContext, setCurrentFolderContext] = useContext(CurrentFolderContext);

    const [categories, setCategories] = useState([]);

    const [itemName, setItemName] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [category, setCategory] = useState(null);
    const [description, setDescription] = useState(null);
    const [itemPrice, setItemPrice] = useState(null)

    const [resultItemId, setResultItemId] = useState(null);

    const getCategories = () => {
        axios.get('http://localhost:8080/api/categories')
            .then(response => {
                const data  = response.data
                setCategories(data);
            }).catch(error => {
                console.log(error);
            })
    }

    const zeroizeInput = () => {
        setItemName("");
        setSerialNumber("");
        setSelectedFile(null);
        setCategory(null);
        setDescription(null);
        setItemPrice(null);
    }

    useEffect(() => {
        console.log(getCategories())
    }, [])

    const addItem = (e) => {
        e.preventDefault();
        if (itemName.trim() === "") {
            alert("Item name must be present")
        } else {
            let item = {
                itemName,
                userId: 3,
            }
            if (currentFolderContext) {
                item = {...item, folderId: currentFolderContext}
            }
            if (serialNumber !== "") {
                item = {...item, serialNumber}
            }
            if (category) {
                item = {...item, categoryId: category}
            }
            if (description) {
                item = {...item, description}
            }
            if (itemPrice) {
                item = {...item, itemPrice}
            }
            console.log(item);
            axios.post('http://localhost:8080/api/items', item)
              .then((response) => {
                //setResultItemId(response.data.itemId)
                let itemId = response.data.itemId;
                if (selectedFile) {
                    let formData = new FormData();
                    formData.append("imageFile", selectedFile);
                    axios.post(`http://localhost:8080/api/images/${itemId}`, formData)
                        .then((response) => {
                            console.log(response);
                        }, (error) => {
                            console.log(error);
                        });
                }
              }, (error) => {
                console.log(error);
            });
        }
        zeroizeInput();
        alert("Item added");
    }

    return (
        <div className="container p-5 border border-primary rounded m-5">
            <h3>Add item</h3>
            
            <form>
                <input 
                className="form-control me-2 m-1" 
                type="text" placeholder="Item Name" 
                aria-label="Item Name"
                onChange={(e) => setItemName(e.target.value)}></input>

                <input className="form-control me-2 m-1" 
                type="text" placeholder="Serial Number" 
                aria-label="Serial Number"
                onChange={(e) => setSerialNumber(e.target.value)}></input>

                <label for="formFile" class="form-label">Add image</label>
                <input className="form-control m-1"
                 type="file" 
                 onChange={(e) => setSelectedFile(e.target.files[0])}></input>

                <select 
                    className="form-select"
                    id="inputGroupSelect01"
                    onChange={(e) => setCategory(e.target.value)}>
                    <option selected>Choose...</option>
                    {categories.map(category => <option value={category.categoryId}>{category.categoryName}</option>)}
                </select>

                <input 
                className="form-control me-2 m-1" 
                type="text" 
                placeholder="Description" 
                aria-label="Description"
                onChange={(e) => setDescription(e.target.value)}></input>

                <input 
                className="form-control me-2 m-1" 
                type="number"
                placeholder="Price" 
                aria-label="Price"
                onChange={(e) => setItemPrice(e.target.value)}></input>

                <button className="btn btn-outline-success" type="submit" onClick={(e) => addItem(e)}>Add</button>
            </form>

            <Link type="button" className="btn btn-secondary" to="/">Cancel</Link>
        </div>
    )
}

export default AddItem;
