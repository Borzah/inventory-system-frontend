import { useState } from 'react'
import { useHistory } from "react-router-dom";
import { registerUserIn } from '../services';

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
            registerUserIn(registerUser)
            .then(response => {
                console.log(response)
                alert('You are registered!')
                history.push("/")
            }).catch(error => {
                let errMsg =  (error.response.data.message);
                alert(errMsg);
          });
        }
    }

    return (
        <div className="container mb-3 mt-3">
            <h2>Register</h2>
            
            <div className="container mb-5 mt-5 pb-3 pt-3 shadow-lg rounded">

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

            <button className="btn btn-outline-success" type="submit" onClick={(e) => register(e)}>Register</button>
            </div>
        </div>
    )
}

export default RegisterView;
