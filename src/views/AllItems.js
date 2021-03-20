import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ItemNode from '../components/ItemNode'

const AllItems = () => {

    const [items, setItems] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchAttribute, setSearchAttribute] = useState("")

    const getData = (pathName) => {
        axios.get(pathName)
            .then(response => {
                const data  = response.data
                console.log(data)
                setItems(data)
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        getData('http://localhost:8080/api/inventory/user/3');
    }, []);

    const searchForItems = (e) => {
        e.preventDefault();
        let res = searchInput.replace(/ /g, "_");
        //console.log(searchAttribute)
        if (searchAttribute === "" && res === "") {
            getData('http://localhost:8080/api/inventory/user/3');
        } else if (searchAttribute === "") {
            getData(`http://localhost:8080/api/inventory/user/3?search=${res}`);
        } else if (searchInput === "") {
            getData(`http://localhost:8080/api/inventory/user/3?attribute=${searchAttribute}`)
        } else {
            getData(`http://localhost:8080/api/inventory/user/3?attribute=${searchAttribute}&search=${res}`);
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
