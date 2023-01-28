import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' })


    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, email, password, cpassword } = credentials;
        if (cpassword === password) {

            const response = await fetch(`http://localhost:5000/api/auth/createUser`, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            })
            const info = await response.json();
            localStorage.setItem('token', info.authtoken);
            navigate('/home');
        }
        else {
            alert('Password not matched')
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }


    return (
        <div className='container my-5 mx-5'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onChange} minLength={5} required />
                </div>
                <div className='d-flex justify-content-between'>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                    <Link to='/'><button className="btn btn-success">Already have an account</button></Link>
                </div>
            </form>
        </div>
    )
}

export default SignUp