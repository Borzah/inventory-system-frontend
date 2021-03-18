import React from 'react'

const ItemNode = (props) => {

    return (
        <div className="element-node border border border-success rounded m-2 p-3">
        <i class="far fa-sticky-note"></i> {props.item.itemName}
        </div>
    )
}

export default ItemNode;
