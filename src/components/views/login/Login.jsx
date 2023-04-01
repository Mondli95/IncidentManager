import axios from 'axios';
import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../../context/Context';
import './login.css';

export default function Login() {

    const username = useRef('');
    const password = useRef('');
    const { dispatch, isFetching, error } = useContext(Context)
    const route = useNavigate()
    // const [errorOccured, setError] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_VERIFICATION' });

        const loginRequest = {
            'username': username.current.value,
            'password': password.current.value
        };

        try {
            const login = await axios({
                method: 'post',
                url: 'https://localhost:7213/blogs-v1/user-login',
                data: loginRequest,
                config: {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            });

            const userDetails = await axios.get("https://localhost:7213/blogs-v1/get-user-details?Id=" + login.data);

            dispatch({ type: 'USER_VERIFIED', payload: userDetails.data });

            route("/");

        } catch (error) {
            dispatch({ type: 'LOGIN_FAILED' });
        }
    }

    return (
        <div className='login'>
            <div className="loginContainer">
                <form className="loginForm">
                    <div className="loginInputItem">
                        <label className="loginLabel">Username</label>
                        <input type="text" className="loginInput" ref={username} />
                    </div>
                    <div className="loginInputItem">
                        <label className="loginLabel">Password</label>
                        <input type="password" className="loginInput" ref={password} />
                    </div>
                </form>
                <button className="loginBtn" onClick={handleLogin} disabled={isFetching} >Login</button>
                {error && <span className="errorMessage">Username or password incorrect?</span>}
                <Link to={'/register'} > Register</Link>
            </div>
        </div>
    )
}
