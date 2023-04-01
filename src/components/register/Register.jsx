import axios from 'axios';
import { useContext, useRef, useState } from 'react';
import { Context } from '../../context/Context';
import './register.css';

export default function Register() {

    const email = useRef('');
    const username = useRef('');
    const password = useRef('');
    const [error, setError] = useState(false);
    const { dispatch } = useContext(Context);

    const register = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://localhost:7213/blogs-v1/register-account", {
                username,
                password,
                email
            });

            const login = await axios({
                method: 'post',
                url: 'https://localhost:7213/blogs-v1/user-login',
                data: {
                    'username': username.current.value,
                    'password': password.current.value
                },
                config: {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            });

            const userDetails = await axios.get("https://localhost:7213/blogs-v1/get-user-details?Id=" + login.data);

            dispatch({ type: 'USER_VERIFIED', payload: userDetails.data });

            response.data && window.location.replace("/login");
        } catch (error) {
            setError(true);
            console.log(error);
        }

        // console.log(email.current.value + '' + password.current.value + '' + confirmEmail.current.value);
    }

    return (
        <div className='register'>
            <div className="registerTitle">
                <h1>Register</h1>
            </div>
            <div className="registerContainer">
                <form className="registerForm">
                    <div className="registerInput">
                        <label>Username</label>
                        <input type="text" ref={username} required placeholder='someone@domain.com' />
                    </div>
                    <div className="registerInput">
                        <label>Email</label>
                        <input type="email" ref={email} required placeholder='someone@domain.com' />
                    </div>
                    <div className="registerInput">
                        <label>Password</label>
                        <input type="password" ref={password} required placeholder='*******' />
                    </div>
                </form>
                <button className="registerBtn" onClick={register}>Submit</button>
            </div>
        </div>
    )
}
