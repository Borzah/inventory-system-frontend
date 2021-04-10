import { Link } from 'react-router-dom';
import { CurrentFolderContext } from "../contexts/CurrentFolderContext";
import { useState, useContext, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CategoriesContext } from '../contexts/CategoriesContext';
import { 
    addImageToItem, 
    addOrUpdateItem, 
    getAllUserFoldersFromApi, 
    getItemDtoFromApi 
} from '../services';
import { ThemeContext } from '../contexts/ThemeContext';
import { getItemToAddOrUpdate } from '../utils';

const AddItem = (props) => {

    const history = useHistory();
    const user = useSelector(state => state);

    const { parameter } = props.match.params;

    const [currentFolderContext, setCurrentFolderContext] = useContext(CurrentFolderContext);

    const [categories, setCategories] = useContext(CategoriesContext);
    const [themeContext, setThemeContext] = useContext(ThemeContext);

    const [itemName, setItemName] = useState(null);
    const [serialNumber, setSerialNumber] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [category, setCategory] = useState(null);
    const [description, setDescription] = useState(null);
    const [itemPrice, setItemPrice] = useState(null)
    const [folderToAddInto, setFolderToAddInto] = useState(currentFolderContext);
    const [allFolders, setAllFolders] = useState([]);
    
    const [initialCategory, setInitialCategory] = useState(null);
    const [initialFolder, setInitialFolder] = useState(null);

    const fillInput = (name, serialNum, cat, desc, price, folder) => {
        setItemName(name);
        setSerialNumber(serialNum);
        setCategory(cat);
        setDescription(desc);
        setItemPrice(price);
        setFolderToAddInto(folder)
    }

    useEffect(() => {
        if (typeof user === 'undefined' || user.role === "ADMIN") {
            history.replace("/");
        } else {
            getAllUserFoldersFromApi(user.token)
            .then(response => {
                const data = response.data;
                setAllFolders(data);
            }).catch(error => {
                let errMsg =  (error.response.data.message);
                alert(errMsg);
            })
            setInitialFolder(currentFolderContext);
            if (parameter !== "add") {
                getItemDtoFromApi(parameter, user.token)
                .then(response => {
                    const data  = response.data;
                    setInitialCategory(data.categoryId);
                    setInitialFolder(data.folderId);
                    fillInput(data.itemName, data.serialNumber, data.categoryId, data.description, data.itemPrice, data.folderId)
                }).catch(error => {
                    let errMsg =  (error.response.data.message);
                    alert(errMsg);
                })
            }
        }
    }, [])

    const addItem = (e) => {
        e.preventDefault();
        let requestString = '/api/items';
        if (parameter !== "add") {
            requestString = `/api/items/${parameter}`;
        }
        if (!itemName || itemName.trim() === "") {
            alert("Item name must be present");
        } else {
            let item = getItemToAddOrUpdate( 
                itemName, 
                folderToAddInto, 
                serialNumber, 
                category, 
                description, 
                itemPrice);
            if (item.folderId === "NO_FOLDER" || item.folderId === "Choose_") {
                item.folderId = null;
            }
            if (item.categoryId === "NO_CATEGORY" || item.categoryId === "Choose_") {
                item.categoryId = null; 
            }
            let requestMethod = parameter === "add" ? 'post' : 'put';
            addOrUpdateItem(requestMethod, requestString, item, user.token)
              .then((response) => {
                let itemId = response.data.itemId;
                if (selectedFile) {
                    let formData = new FormData();
                    formData.append("imageFile", selectedFile);
                    addImageToItem(itemId, formData, user.token)
                        .then((response) => {
                            history.replace("/");
                        }).catch(error => {
                            let errMsg =  (error.response.data.message);
                            alert(errMsg);
                      });
                }
                history.replace("/");
              }).catch(error => {
                let errMsg =  (error.response.data.message);
                alert(errMsg);
          });
        }
    }

    return (
        <div className="container mb-3 mt-3">

            <h3>
                {parameter === "add" ? 'Add item' : 'Update item'}
            </h3>
            
            <form>
                <label>Name</label>
                <input 
                    className="form-control me-2 m-1" 
                    type="text" 
                    value={itemName || ""}
                    aria-label="Item Name"
                    onChange={(e) => setItemName(e.target.value)}>
                </input>

                <label>Serial Number</label>
                <input className="form-control me-2 m-1" 
                    type="text"
                    value={serialNumber || ""}
                    aria-label="Serial Number"
                    onChange={(e) => setSerialNumber(e.target.value)}>
                </input>

                <label htmlFor="formFile" className="form-label">
                    Image
                </label>
                <input 
                    className="form-control m-1"
                    type="file" 
                    onChange={(e) => setSelectedFile(e.target.files[0])}>
                </input>

                <label>Category</label>
                <select 
                    className="form-select"
                    id="inputGroupSelect01"
                    onChange={(e) => setCategory(e.target.value)}>
                    <option value={initialCategory ? initialCategory : ""}>Choose_</option>
                    <option value={""}>NO_CATEGORY</option>
                    {categories.map(category => 
                        <option 
                            key={category.categoryId} 
                            value={category.categoryId}>
                            {category.categoryName}
                        </option>)}
                </select>

                <label>Folder</label>
                <select 
                    className="form-select"
                    id="inputGroupSelect02"
                    onChange={(e) => setFolderToAddInto(e.target.value)}>
                    <option value={initialFolder ? initialFolder : ""}>Choose_</option>
                    <option value={""}>NO_FOLDER</option>
                    {allFolders.map(folder => 
                        <option 
                            key={folder.folderId} 
                            value={folder.folderId}>
                            {folder.folderName}
                        </option>)}
                </select>

                <label>Description</label>
                <input 
                    className="form-control me-2 m-1" 
                    type="text" 
                    value={description || ""}
                    aria-label="Description"
                    onChange={(e) => setDescription(e.target.value)}>
                </input>

                <label>Price</label>
                <input 
                    className="form-control me-2 m-1" 
                    type="number"
                    value={itemPrice || ""} 
                    aria-label="Price"
                    onChange={(e) => setItemPrice(e.target.value)}>
                </input>

                {parameter === "add" ? 
                    <button 
                        className={`btn ${themeContext.buttonTheme}`} 
                        type="submit" 
                        onClick={(e) => addItem(e)}>
                        Add
                    </button>

                    : <button 
                        className={`btn ${themeContext.buttonTheme}`} 
                        type="submit" 
                        onClick={(e) => addItem(e)}>
                        Update
                      </button> }
            </form>
            <hr></hr>
            <Link 
                type="button" 
                className={`btn ${themeContext.buttonTheme}`} 
                to="/">
                Cancel
            </Link>

        </div>
    )
}

export default AddItem;
