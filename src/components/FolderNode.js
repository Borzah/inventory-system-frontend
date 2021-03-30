import React from 'react'
import { handleBigOnePieceString } from '../utils';

const FolderNode = (props) => {

    return (
        <div className="folder-node element-node border border-secondary rounded m-2 p-3 shadow-sm">
        <i class="fas fa-box-open"></i> {props.folder.folderName.length > 20 ? handleBigOnePieceString(props.folder.folderName) : props.folder.folderName}
        </div>
    )
}

export default FolderNode;