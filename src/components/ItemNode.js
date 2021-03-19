import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

const ItemNode = (props) => {

    const history = useHistory();

    const pathString = `/items/${props.item.itemId}`;

    return (
            <div onClick={() => history.push(pathString)} className="element-node border border border-success rounded m-2 p-3">
                <i class="far fa-sticky-note"></i> {props.item.itemName}
            </div>
    )
}

export default ItemNode;
