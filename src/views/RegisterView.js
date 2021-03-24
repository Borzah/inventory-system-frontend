import { useState } from 'react'

const RegisterView = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const register = () => {
        
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
                onChange={(e) => setUsername(e.target.value)}>
            </input>

            <hr></hr>

            <button className="btn btn-outline-success" type="submit" onClick={(e) => register(e)}>Register</button>
            
        </div>
    )
}

export default RegisterView;
