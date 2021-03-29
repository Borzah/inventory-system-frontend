import React from 'react'

const FolderNode = (props) => {

    return (
        <div className="folder-node element-node border border-secondary rounded m-2 p-3 shadow-sm">
        <i class="fas fa-box-open"></i> {props.folder.folderName}
        </div>
    )
}

export default FolderNode;