import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT_USER } from '../constants/actionTypes';
import { logUserOut } from '../services';
import { useCookies } from "react-cookie";

const Navbar = () => {

    const [cookie, setCookie, removeCookie] = useCookies(["jwtToken"]);

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
        logUserOut(user.userId, user.token)
        .then(response => {
            dispatch({
                type: LOGOUT_USER,
                payload: {}
            })
            removeCookie("jwtToken");
            window.location.reload();
        }).catch(error => {
            let errMsg =  error.response.data.message;
            alert(errMsg);
        })
    }

    return (
        <nav className="background-main navbar navbar-expand-lg navbar-light sticky-top shadow">
        { isUser ? 
            <div className="container-fluid">
                <div style={{color: "white"}} className="navbar-brand">Inventory</div>
                
                <button style={{backgroundColor: "white"}} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link style={{color: "white"}} className="nav-link" to='/inventory'><i className="fas fa-warehouse"></i> My inventory</Link>
                    </li>
                    <li className="nav-item">
                    <Link style={{color: "white"}} className="nav-link" to="/all"><i className="fas fa-cubes"></i> All items</Link>
                    </li>
                    <li className="nav-item">
                    <Link style={{color: "white"}} className="nav-link" to="/categories"><i className="far fa-list-alt"></i> Categories</Link>
                    </li>
                    <li className="nav-item">
                    <div style={{color: "white"}} className="nav-link nav-pointer" onClick={(e) => logout(e)}><i className="fas fa-sign-out-alt"></i> Log out</div>
                    </li>
                </ul>
        </div>
    </div>
        : <div className="container-fluid">
        <div style={{color: "white"}} className="navbar-brand">Inventory</div>
        {isAdmin && cookie.jwtToken ? 
            
            <div style={{color: "white"}} className="nav-link nav-pointer" onClick={(e) => logout(e)}><i className="fas fa-sign-out-alt"></i> Log out</div>
            
            : ''}
    </div>}
    </nav>
    )
}

export default Navbar;
