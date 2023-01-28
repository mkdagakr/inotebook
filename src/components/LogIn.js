import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const LogIn = () => {

    const [credentials, setCredentials] = useState({email: '', password: ''});
    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();
        const {email, password} = credentials;

        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })

    
        const info = await response.json();
        localStorage.setItem('token', info.authtoken);
        setCredentials({email: '', password: ''});
        navigate('/home');
    }

    const onChange = (event) => {
        setCredentials({...credentials, [event.target.name]: event.target.value});
    }


    return (
        <div className='d-flex my-5'>
            <div className='container my-auto'>
                <h1>iNoteBook</h1>
                <p>iNoteBook helps you to save your notes.</p>
            </div>
            <div className='container my-auto'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credentials.email} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} />
                    </div>
                    <div className='d-flex justify-content-between'>
                        <button type="submit" className="btn btn-primary">LogIn</button>
                        <Link to='/signup'><button className="btn btn-success">Create New Account</button></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LogIn