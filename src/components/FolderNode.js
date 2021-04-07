import { useContext } from 'react';
import { handleBigOnePieceString } from '../utils';
import { ThemeContext } from '../contexts/ThemeContext';

const FolderNode = (props) => {

    const [themeContext, setThemeContext] = useContext(ThemeContext);

    return (
        <div className="col mb-4">

            <div className={`${themeContext.elementNode} border border-secondary rounded m-2 p-3 shadow-sm`}>

                <i className="fas fa-box-open"></i> 

                {props.folder.folderName.length > 20 ? 
                    handleBigOnePieceString(props.folder.folderName) : props.folder.folderName}

            </div>
            
        </div>
    )
}

export default FolderNode;
