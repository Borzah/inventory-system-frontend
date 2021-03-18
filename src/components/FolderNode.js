import React from 'react'

const FolderNode = (props) => {

    return (
        <div className="element-node border border border-warning rounded m-2 p-3">
        <i class="fas fa-box-open"></i> {props.folder.folderName}
        </div>
    )
}

export default FolderNode;