import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ItemNode from '../components/ItemNode';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllItems } from '../services';

const AllItems = () => {

    const history = useHistory();
    const user = useSelector(state => state)

    const [items, setItems] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchAttribute, setSearchAttribute] = useState("")

    const getData = (pathName) => {
        getAllItems(pathName, user.token)
            .then(response => {
                const data  = response.data
                setItems(data)
            }).catch(error => {
                let errMsg =  error.response.data.message;
                alert(errMsg);
            })
    }

    useEffect(() => {
        if (typeof user === 'undefined') {
            history.push("/")
        } else if (user.role === "ADMIN") {
            history.push("/admin")
        } else {
            getData(`/api/inventory/user/${user.userId}`);
        }
    }, []);

    const searchForItems = (e) => {
        e.preventDefault();
        let res = searchInput.replace(/ /g, "_");
        if (searchAttribute === "" && res === "") {
            getData(`/api/inventory/user/${user.userId}`)
        } else if (searchAttribute === "") {
            getData(`/api/inventory/user/${user.userId}?search=${res}`);
        } else if (searchInput === "") {
            getData(`/api/inventory/user/${user.userId}?attribute=${searchAttribute}`)
        } else {
            getData(`/api/inventory/user/${user.userId}?attribute=${searchAttribute}&search=${res}`);
        }
    }

    return (
        <div>
        <h2>Items</h2>
        <hr></hr>
        <div className="container">
        <form class="d-flex">
        <input 
            class="form-control me-2" 
            type="search" placeholder="Search" 
            aria-label="Search" 
            onChange={(e) => setSearchInput(e.target.value)}>
        </input>

        <select 
            className="form-select"
            id="inputGroupSelect01"
            onChange={(e) => setSearchAttribute(e.target.value)}>
            <option selected value="">Search by</option>
            <option value="name">Name</option>
            <option value="serialNumber">Serial number</option>
            <option value="category">Category</option>
            <option value="description">Description</option>
            <option value="price">Price</option>
            
        </select>

        <button class="btn btn-outline-success" type="submit" onClick={(e) => searchForItems(e)}>Search</button>
        
        </form>
        </div>

        <hr></hr>
        {items.map(itm => <ItemNode item={itm}/>)}
        </div>
    )
}

export default AllItems;
