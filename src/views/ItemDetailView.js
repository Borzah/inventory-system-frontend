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
            <h3>{item.itemName}</h3>
            <hr></hr>
            <h4>Date added</h4>
            <div>{item.dateAdded}</div>
            <hr></hr>
            {item.imageBytes ? <div>
                <h4>Item image:</h4>
                <img src={`data:image/png;base64,${item.imageBytes}`} width={200} height={300}/>
                <hr></hr>
            </div> : ''}

            {item.serialNumber ? <div>
                <h4>Serial number:</h4>
                <div>{item.serialNumber}</div>
                <hr></hr>
            </div> : ''}

            {item.categoryName ? <div>
                <h4>Category:</h4>
                <div>{item.categoryName}</div>
                <hr></hr>
            </div> : ''}

            {item.description ? <div>
                <h4>Description:</h4>
                <div>{item.description}</div>
            </div> : ''}

            {item.itemPrice ? <div>
                <h4>Price:</h4>
                <div>{item.itemPrice}</div>
            </div> : ''}
            
        </div> : ''
        }</div>
    )
}

export default ItemDetailView;
