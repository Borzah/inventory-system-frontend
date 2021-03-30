import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteItemWithApi, getItemFromApi } from '../services';
import { getDateFromFullDate, handleBigOnePieceString } from '../utils';
import Spinner from 'react-bootstrap/Spinner';
import { ThemeContext } from '../contexts/ThemeContext';

const ItemDetailView = (props) => {

    const [themeContext, setThemeContext] = useContext(ThemeContext);

    const user = useSelector(state => state)

    const { itemId } = props.match.params;
    const history = useHistory();

    const updateString = `/item/${itemId}`

    const [isLoading, setIsLoading] = useState(true);

    const [item, setItem] = useState();

    useEffect(() => {
        if (typeof user === 'undefined') {
            history.push("/")
        } else if (user.role === "ADMIN") {
            history.push("/admin")
        } else {
            setIsLoading(true)
            getItemFromApi(itemId, user.token)
                .then(response => {
                    const data  = response.data
                    setItem(data);
                    setIsLoading(false)
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
        <div>{ !isLoading ?
        <div className="container mb-3 pb-3 pt-3 mt-3 shadow-lg">
            <h3>{item.itemName.length > 20 ? handleBigOnePieceString(item.itemName) : item.itemName}</h3>
            <hr></hr>
            <h4>Date added</h4>
            <div>{getDateFromFullDate(item.dateAdded)}</div>
            <hr></hr>
            {item.imageBytes ? <div>
                <h4>Item image:</h4>
                <img src={`data:image/png;base64,${item.imageBytes}`} width={200} height={300}/>
                <hr></hr>
            </div> : ''}

            {item.serialNumber ? <div>
                <h4>Serial number:</h4>
                <div>{item.serialNumber.length > 20 ? handleBigOnePieceString(item.serialNumber) : item.serialNumber}</div>
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
                <hr></hr>
            </div> : ''}

            {item.itemPrice ? <div>
                <h4>Price:</h4>
                <div>{`${item.itemPrice.toFixed(2)} $`}</div>
                <hr></hr>
            </div> : ''}

            <div className="d-flex justify-content-between mt-2">
                <button type="button" className={`btn ${themeContext.buttonTheme}`} onClick={deleteItem}>Delete</button>
                <Link type="button" className={`btn ${themeContext.buttonTheme}`} to={updateString}>Update</Link>
                <button type="button" className={`btn ${themeContext.buttonTheme}`} onClick={() => {history.goBack();}}>Go back</button>
            </div>
            
        </div> : <Spinner className="extra-margin-top" animation="border" />
        }
        </div>
    )
}

export default ItemDetailView;

            
