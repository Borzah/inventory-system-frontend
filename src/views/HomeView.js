import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { LOGIN_USER } from '../constants/actionTypes';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const HomeView = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const history = useHistory();

    const user = useSelector(state => state);

    useEffect(() => {
        if (typeof user !== 'undefined') {
            if (user.role === 'USER') {
                history.push("/inventory")
            } else {
                history.push("/admin")
            }
        } else {
            console.log("NO user yet!")
        }
    }, [])

    const dispatch = useDispatch();

    const login = () => {
        if (!username || !password) {
            alert("Cannot be empty fiels!")
        } else {
            let loginUser = {
                username,
                password
            }
            axios.post('http://localhost:8080/api/user/login', loginUser)
            .then(response => {
                const data  = response.data
                console.log(data);
                dispatch({
                    type: LOGIN_USER,
                    payload: data
                })
                if (data.role === 'USER') {
                    history.push("/inventory")
                } else {
                    history.push("/admin")
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }

    return (
        <div className="container p-5 border border-primary rounded m-5">
            <h1>Inventory app</h1>
            <hr></hr>

            <input 
                className="form-control me-2" 
                type="text" 
                placeholder="Username" 
                aria-label="Username"
                onChange={(e) => setUsername(e.target.value)}>
            </input>

            <hr></hr>

            <input 
                className="form-control me-2" 
                type="text" 
                placeholder="Password" 
                aria-label="Password"
                onChange={(e) => setPassword(e.target.value)}>
            </input>

            <hr></hr>

            <button className="btn btn-outline-success" type="submit" onClick={(e) => login(e)}>Login</button>

            <hr></hr>
            <Link className="btn btn-outline-warning" to="/register">Register</Link>
        </div>
    )
}

export default HomeView;
