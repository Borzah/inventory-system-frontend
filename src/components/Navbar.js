import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { LOGOUT_USER } from '../constants/actionTypes';
import axios from 'axios';

const Navbar = () => {

    const user = useSelector(state => state)

    const dispatch = useDispatch();

    const [isUndefined, setIsUndefined] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const getCurrentUserRole = () => {
        if (typeof user === 'undefined') {
            setIsUndefined(true)
            setIsUser(false)
            setIsAdmin(false)
        } else if (user.role === 'USER') {
            setIsUndefined(false)
            setIsUser(true)
            setIsAdmin(false)
        } else {
            setIsUndefined(false)
            setIsUser(false)
            setIsAdmin(true)
        }
    }

    useEffect(() => {
        getCurrentUserRole();
    }, [user])

    const logout = (e) => {
        e.preventDefault();
        // console.log(user.userId)
        // console.log(user.token)
        let userId = user.userId
        let token = user.token
        axios.post(`http://localhost:8080/api/user/logout/${userId}`, {}, {headers: {
            'Authorization': `Bearer ${token}`
          }})
        .then(response => {
            dispatch({
                type: LOGOUT_USER,
                payload: {}
            })
            window.location.reload();
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        { isUser ? 
            <div className="container-fluid">
                <div className="navbar-brand">Navbar</div>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link active" to='/inventory'>My inventory</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/all">All items</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/categories">Categories</Link>
                    </li>
                    <li className="nav-item">
                    <div className="nav-link nav-pointer" onClick={(e) => logout(e)}>Log out</div>
                    </li>
                </ul>
        </div>
    </div>
        : <div className="container-fluid">
        <div className="navbar-brand">Navbar</div>
        {isAdmin ? 
            
            <div className="nav-link nav-pointer" onClick={(e) => logout(e)}>Log out</div>
            
            : ''}
    </div>}
    </nav>
    )
}

                    // <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    //     <li><a className="dropdown-item" href="#">Action</a></li>
                    //     <li><a className="dropdown-item" href="#">Another action</a></li>
                    //     <li><hr className="dropdown-divider"></hr></li>
                    //     <li><a className="dropdown-item" href="#">Something else here</a></li>
                    // </ul>

export default Navbar;
