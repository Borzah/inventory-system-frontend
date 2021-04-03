import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { LOGIN_USER, LOGOUT_USER } from '../constants/actionTypes';
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { 
    getUserDataWithCookie, 
    loginUserIn 
} from '../services';
import HomeCarousel from '../components/HomeCarousel';
import { ThemeContext } from '../contexts/ThemeContext';

const HomeView = () => {

    const [themeContext, setThemeContext] = useContext(ThemeContext);

    const [cookie, setCookie, removeCookie] = useCookies(["jwtToken"]);

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const history = useHistory();

    useEffect(() => {
        if (cookie.jwtToken) {
            const jwt = cookie.jwtToken;
            getUserDataWithCookie(jwt)
            .then(response => {
                const data = {...response.data, token: jwt};
                dispatch({
                    type: LOGIN_USER,
                    payload: data
                })
                if (data.role === 'USER') {
                    history.push("/inventory");
                } else {
                    history.push("/admin");
                }
            }).catch(error => {
                dispatch({
                    type: LOGOUT_USER,
                    payload: {}
                })
                removeCookie("jwtToken");
            })
        }
    }, [])

    const dispatch = useDispatch();

    const login = () => {
        if (!username || !password) {
            alert("Cannot be empty fiels!");
        } else {
            let loginUser = {
                username,
                password
            }
            loginUserIn(loginUser)
            .then(response => {
                const data  = response.data;
                dispatch({
                    type: LOGIN_USER,
                    payload: data
                })
                setCookie("jwtToken", data.token,
                    {
                        path: '/'
                    }
                )
                if (data.role === 'USER') {
                    history.push("/inventory");
                } else {
                    history.push("/admin");
                }
            }).catch(error => {
                if (error.response.data.message === "Unauthorized") {
                    alert("Wrong username and/or password!");
                }
            })
        }
    }

    return (
        <>
        <HomeCarousel />
        <div className="container mb-3 mt-3">

        <div className="container mb-5 mt-5 pb-3 pt-3 shadow-lg rounded">
            <h3 className="d-flex justify-content-around mb-4">
            <div><i className="fas fa-user-ninja"></i> Login</div></h3>

            <input 
                className="form-control me-2 mb-3" 
                type="email" 
                placeholder="Username" 
                aria-label="Username"
                onChange={(e) => setUsername(e.target.value)}>
            </input>

            <input 
                className="form-control me-2 mb-3" 
                type="password" 
                placeholder="Password" 
                aria-label="Password"
                onChange={(e) => setPassword(e.target.value)}>
            </input>

            <div className="d-flex justify-content-around mb-3">
                <button className={`btn ${themeContext.buttonTheme}`} type="submit" onClick={(e) => login(e)}>
                 Login</button>
            </div>

            <div className="d-flex justify-content-around">
                <Link className={`btn ${themeContext.buttonTheme}`} to="/register">
                 Register</Link>
            
            </div>
        </div>
        </div>
        </>
    )
}

export default HomeView;
