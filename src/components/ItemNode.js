import React from 'react'
import { useHistory } from 'react-router-dom';
import { handleBigOnePieceString } from '../utils';

const ItemNode = (props) => {

    const history = useHistory();

    const pathString = `/items/${props.item.itemId}`;

    return (
        <div className="col mb-4">
            <div onClick={() => history.push(pathString)} className="item-node element-node border border-dark rounded m-2 p-3 shadow-sm">
                <i className="far fa-sticky-note"></i> {props.item.itemName.length > 20 ? handleBigOnePieceString(props.item.itemName) : props.item.itemName}
            </div>
        </div>
    )
}

export default ItemNode;
