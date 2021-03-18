import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ItemNode from '../components/ItemNode'

const AllItems = () => {

    const [items, setItems] = useState([]);
    const [searchInput, setSearchInput] = useState("");

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
        getData(`http://localhost:8080/api/inventory/user/3?search=${res}`);
    }

    return (
        <div>
        <h2>Items</h2>
        <hr></hr>

        <div className="container">
        <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchInput(e.target.value)}></input>
        <button class="btn btn-outline-success" type="submit" onClick={(e) => searchForItems(e)}>Search</button>
        </form>
        </div>

        <hr></hr>
        {items.map(itm => <ItemNode item={itm}/>)}
        </div>
    )
}

export default AllItems;
