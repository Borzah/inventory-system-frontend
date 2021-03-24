import { useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";

const RegisterView = () => {

    const history = useHistory();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const register = () => {
        if (!username || !password) {
            alert("Cannot be empty fields!")
        } else {
            let registerUser = {
                username,
                password
            }
            axios.post('http://localhost:8080/api/user/register', registerUser)
            .then(response => {
                console.log(response)
                alert('You are registered!')
                history.push("/")
            }).catch(error => {
                console.log(error);
            })
        }
    }

    return (
        <div className="container p-5 border border-primary rounded m-5">
            <h2>Register</h2>
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

            <button className="btn btn-outline-success" type="submit" onClick={(e) => register(e)}>Register</button>
            
        </div>
    )
}

export default RegisterView;
