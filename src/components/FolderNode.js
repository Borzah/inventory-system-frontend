import React from 'react'
import { handleBigOnePieceString } from '../utils';

const FolderNode = (props) => {

    return (
        <div className="col mb-4">
        <div className="folder-node element-node border border-secondary rounded m-2 p-3 shadow-sm">
        <i className="fas fa-box-open"></i> {props.folder.folderName.length > 20 ? handleBigOnePieceString(props.folder.folderName) : props.folder.folderName}
        </div>
        </div>
    )
}

export default FolderNode;