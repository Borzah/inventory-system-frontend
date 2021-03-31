import { useState, useContext } from 'react'
import { Link, useHistory } from "react-router-dom";
import { registerUserIn } from '../services';
import { ThemeContext } from '../contexts/ThemeContext';

const RegisterView = () => {

    const [themeContext, setThemeContext] = useContext(ThemeContext);

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
                history.push("/")
            }).catch(error => {
                let errMsg =  (error.response.data.message);
                alert(errMsg);
          });
        }
    }

    return (
        <div className="container mb-3 mt-3">
            <h2><i className="fas fa-user-plus"></i> Register</h2>
            
            <div className="container mb-5 mt-5 pb-3 pt-3 shadow-lg rounded">

                <input 
                    className="form-control me-2 mb-3" 
                    type="email" 
                    placeholder="Username (email)" 
                    aria-label="Username (email)"
                    onChange={(e) => setUsername(e.target.value)}>
                </input>

                <input 
                    className="form-control me-2 mb-3" 
                    type="password" 
                    placeholder="Password" 
                    aria-label="Password"
                    onChange={(e) => setPassword(e.target.value)}>
                </input>

                <div className="d-flex justify-content-around">
                    <button 
                    className={`btn ${themeContext.buttonTheme}`} 
                    type="submit" 
                    onClick={(e) => register(e)}>
                     Register</button>
                </div>

                <div className="d-flex justify-content-around mt-3">
                    <Link type="button" className={`btn ${themeContext.buttonTheme}`} to="/">
                     Back</Link>
                </div>
            
            </div>
        </div>
    )
}

export default RegisterView;
