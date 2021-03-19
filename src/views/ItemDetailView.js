import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { CurrentFolderContext } from "../contexts/CurrentFolderContext";

const ItemDetailView = (props) => {

    const { itemId } = props.match.params;

    const [item, setItem] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/inventory/${itemId}`)
            .then(response => {
                const data  = response.data
                setItem(data);
            }).catch(error => {
                console.log(error);
            })
    }, [])

    return (
        <div>{ item ?
        <div className="container p-5 border border-primary rounded m-5">
            <div>{item.itemName}</div>
            <div>{item.dateAdded}</div>
            <hr></hr>
            {item.imageBytes ? <img src={`data:image/png;base64,${item.imageBytes}`} width={200} height={300}/> : ''}
            <hr></hr>
            {item.serialNumber ? <div>{item.serialNumber}</div> : ''}
            <hr></hr>
            {item.categoryName ? <div>{item.categoryName}</div> : ''}
            <hr></hr>
            {item.description ? <div>{item.description}</div> : ''}
            <hr></hr>
        </div> : ''
        }</div>
    )
}

export default ItemDetailView;
