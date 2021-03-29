import React from 'react'
import { useHistory } from 'react-router-dom';

const ItemNode = (props) => {

    const history = useHistory();

    const pathString = `/items/${props.item.itemId}`;

    return (
            <div onClick={() => history.push(pathString)} className="item-node element-node border border-dark rounded m-2 p-3 shadow-sm">
                <i class="far fa-sticky-note"></i> {props.item.itemName}
            </div>
    )
}

export default ItemNode;
