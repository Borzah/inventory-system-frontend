import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteItemWithApi, getItemFromApi } from '../services';

const ItemDetailView = (props) => {

    const user = useSelector(state => state)

    const { itemId } = props.match.params;
    const history = useHistory();

    const updateString = `/item/${itemId}`

    const [item, setItem] = useState();

    useEffect(() => {
        if (typeof user === 'undefined') {
            history.push("/")
        } else if (user.role === "ADMIN") {
            history.push("/admin")
        } else {
            getItemFromApi(itemId, user.token)
                .then(response => {
                    const data  = response.data
                    setItem(data);
                }).catch(error => {
                    console.log(error);
                })
        }
    }, [])

    const deleteItem = () => {
        deleteItemWithApi(itemId, user.token)
            .then(res => {
                history.goBack();
                alert('Item deleted')
            });
    }

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

            <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-danger" onClick={deleteItem}>Delete item</button>
                <Link type="button" className="btn btn-primary" to={updateString}>Update Item</Link>
                <button type="button" className="btn btn-warning" onClick={() => {history.goBack();}}>Go back</button>
            </div>
            
        </div> : ''
        }
        </div>
    )
}

export default ItemDetailView;
