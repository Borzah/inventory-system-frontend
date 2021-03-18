import React from 'react'
import { Link } from 'react-router-dom'

const AddItem = () => {
    return (
        <div className="container p-5 border border-primary rounded m-5">
            <h3>Add item</h3>
            <form>
                <input className="form-control me-2 m-1" type="text" placeholder="Item Name" aria-label="Item Name"></input>
                <input className="form-control me-2 m-1" type="text" placeholder="Serial Number" aria-label="Serial Number"></input>
                <label for="formFile" class="form-label">Default file input example</label>
                <input className="form-control m-1" type="file" id="formFile"></input>
                <input className="form-control me-2 m-1" type="text" placeholder="Description" aria-label="Description"></input>
                <button className="btn btn-outline-success" type="submit">Add</button>
            </form>
            <Link type="button" className="btn btn-secondary" to="/">Cancel</Link>
        </div>
    )
}

export default AddItem;
