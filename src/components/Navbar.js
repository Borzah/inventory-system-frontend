import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT_USER } from '../constants/actionTypes';
import { logUserOut } from '../services';
import { useCookies } from "react-cookie";
import { ThemeContext } from '../contexts/ThemeContext';

const Navbar = () => {

    const [themeContext, setThemeContext] = useContext(ThemeContext);

    const [cookie, setCookie, removeCookie] = useCookies(["jwtToken"]);

    const user = useSelector(state => state);

    const dispatch = useDispatch();

    const [isUser, setIsUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const getCurrentUserRole = () => {
        if (typeof user === 'undefined') {
            setIsUser(false);
            setIsAdmin(false);
        } else if (user.role === 'USER') {
            setIsUser(true);
            setIsAdmin(false);
        } else {
            setIsUser(false);
            setIsAdmin(true);
        }
    }

    useEffect(() => {
        getCurrentUserRole();
    }, [user])

    const logout = (e) => {
        e.preventDefault();
        logUserOut(user.token)
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
        <nav className={`${themeContext.backgroundTheme} navbar navbar-expand-lg navbar-light sticky-top shadow`}> 

            <div className="container-fluid">

                <div 
                    style={{color: "white"}} 
                    className="navbar-brand">
                    <Link to="/" style={{color: "white", textDecoration: "none"}}>
                    Inventory</Link>
                </div>
                
                <button 
                    style={{backgroundColor: "white"}} 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">

                        <span className="navbar-toggler-icon">
                        </span>

                </button>

                <div 
                    className="collapse navbar-collapse" 
                    id="navbarSupportedContent">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        {isUser && cookie.jwtToken ? 
                            <li className="nav-item">
                                <Link 
                                    style={{color: "white"}} 
                                    className="nav-link" 
                                    to='/'>
                                    <i className="fas fa-warehouse"></i> My inventory
                                </Link>
                            </li> : ''}

                        {isUser && cookie.jwtToken ?
                            <li className="nav-item">
                                <Link 
                                    style={{color: "white"}} 
                                    className="nav-link" 
                                    to="/all">
                                    <i className="fas fa-cubes"></i> All items
                                </Link>
                            </li> : ''}

                        {isUser && cookie.jwtToken ?
                            <li className="nav-item">
                                <Link 
                                    style={{color: "white"}} 
                                    className="nav-link" 
                                    to="/categories">
                                    <i className="far fa-list-alt"></i> Categories
                                </Link>
                            </li> : ''}

                        {isAdmin && cookie.jwtToken ? 
                            <li className="nav-item">
                                <Link 
                                    style={{color: "white"}} 
                                    className="nav-link" 
                                    to='/'>
                                    <i className="fas fa-chart-bar"></i> Statistics
                                </Link>
                            </li> : ''}


                        <li className="nav-item">
                            <Link 
                                style={{color: "white"}} 
                                className="nav-link" 
                                to="/settings">
                                <i className="fas fa-cog"></i> Settings
                            </Link>
                        </li>

                        {(isAdmin || isUser) && cookie.jwtToken ?
                        <li className="nav-item">
                            <div 
                                style={{color: "white"}} 
                                className="nav-link nav-pointer" 
                                onClick={(e) => logout(e)}>
                                <i className="fas fa-sign-out-alt"></i> Log out
                            </div>
                        </li> : ''}

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
