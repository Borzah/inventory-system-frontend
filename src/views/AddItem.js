import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { CurrentFolderContext } from "../contexts/CurrentFolderContext";
import { useState, useContext, useEffect } from 'react';

const AddItem = (props) => {

    const { parameter } = props.match.params;

    const [currentFolderContext, setCurrentFolderContext] = useContext(CurrentFolderContext);

    const [categories, setCategories] = useState([]);

    const [itemName, setItemName] = useState("");
    const [serialNumber, setSerialNumber] = useState(null);
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
        setSerialNumber(null);
        setSelectedFile(null);
        setCategory(null);
        setDescription(null);
        setItemPrice(null);
    }

    const fillInput = (name, serialNum, cat, desc, price) => {
        setItemName(name);
        setSerialNumber(serialNum);
        setCategory(cat);
        setDescription(desc);
        setItemPrice(price);
    }

    useEffect(() => {
        console.log(getCategories())
        if (parameter !== "add") {
            axios.get(`http://localhost:8080/api/items/${parameter}`)
            .then(response => {
                const data  = response.data
                console.log(data);
                fillInput(data.itemName, data.serialNumber, data.categoryId, data.description, data.itemPrice)
            }).catch(error => {
                console.log(error);
            })
        }
    }, [])

    const addItem = (e) => {
        e.preventDefault();
        let requestString = 'http://localhost:8080/api/items';
        if (parameter !== "add") {
            requestString = `http://localhost:8080/api/items/${parameter}`;
        }
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
            if (serialNumber) {
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
            let requestMethod = parameter === "add" ? 'post' : 'put';
            axios({
                method: requestMethod,
                url: requestString,
                data: item 
            })
              .then((response) => {
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
                if (parameter === "add") {
                    zeroizeInput();
                }
                alert("Item added");
              }, (error) => {
                console.log(error);
            });
        }
    }

    return (
        <div className="container p-5 border border-primary rounded m-5">
            <h3>{parameter === "add" ? 'Add item' : 'Update item'}</h3>
            
            <form>
                <label>Name</label>
                <input 
                className="form-control me-2 m-1" 
                type="text" 
                value={itemName}
                aria-label="Item Name"
                onChange={(e) => setItemName(e.target.value)}></input>

                <label>Serial Number</label>
                <input className="form-control me-2 m-1" 
                type="text"
                value={serialNumber}
                aria-label="Serial Number"
                onChange={(e) => setSerialNumber(e.target.value)}></input>

                <label for="formFile" class="form-label">Image</label>
                <input className="form-control m-1"
                 type="file" 
                 onChange={(e) => setSelectedFile(e.target.files[0])}></input>

                 <label>Category</label>
                <select 
                    className="form-select"
                    id="inputGroupSelect01"
                    onChange={(e) => setCategory(e.target.value)}>
                    <option selected value={category}>Choose...</option>
                    {categories.map(category => <option value={category.categoryId}>{category.categoryName}</option>)}
                </select>

                <label>Description</label>
                <input 
                className="form-control me-2 m-1" 
                type="text" 
                value={description}
                aria-label="Description"
                onChange={(e) => setDescription(e.target.value)}></input>

                <label>Price</label>
                <input 
                className="form-control me-2 m-1" 
                type="number"
                value={itemPrice} 
                aria-label="Price"
                onChange={(e) => setItemPrice(e.target.value)}></input>

                {parameter === "add" ? 
                <button className="btn btn-outline-success" type="submit" onClick={(e) => addItem(e)}>Add</button>
                :<button className="btn btn-outline-success" type="submit" onClick={(e) => addItem(e)}>Update</button> }
            </form>

            <Link type="button" className="btn btn-secondary" to="/inventory">Cancel</Link>
        </div>
    )
}

export default AddItem;
