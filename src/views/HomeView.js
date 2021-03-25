import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { LOGIN_USER } from '../constants/actionTypes';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { CategoriesContext } from '../contexts/CategoriesContext';

const HomeView = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [categoriesContext, setCategoriesContext] = useContext(CategoriesContext);

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
            axios.post('/api/user/login', loginUser)
            .then(response => {
                const data  = response.data
                console.log(data);
                dispatch({
                    type: LOGIN_USER,
                    payload: data
                })
                if (data.role === 'USER') {
                    history.push("/inventory")
                    getCategories(data);
                } else {
                    history.push("/admin")
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }

    const getCategories = (user) => {
        axios.get(`api/categories/user/${user.userId}`, {headers: {
            'Authorization': `Bearer ${user.token}`
          }})
            .then(response => {
                const data  = response.data
                setCategoriesContext(data)
            }).catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="container p-5 border border-primary rounded m-5">
            <h1>Inventory app</h1>
            <hr></hr>

            <input 
                className="form-control me-2" 
                type="email" 
                placeholder="Username" 
                aria-label="Username"
                onChange={(e) => setUsername(e.target.value)}>
            </input>

            <hr></hr>

            <input 
                className="form-control me-2" 
                type="password" 
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
