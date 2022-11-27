import React, { useState } from 'react'
import RegisterRedirect from './RegisterRedirect'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {

    const navigate = useNavigate();

    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");

    const [loginErrorExists, setLoginErrorExists] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const credInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredential(event.target.value);
    }

    const passInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const loginData = {
            cred: credential,
            pass: password
        }
        axios({
            method: "post",
            url: "http://localhost:8081/login",
            data: loginData,
            headers: { "Content-Type": "application/json" },
          })
        .then(function (response) {
            const status = response.status;
            const data = response.data;
            if (status === 200){
                setLoginErrorExists(false);
                setErrorMsg("");
                // TODO: save token, redirect
            } 
        })
        .catch(function (error) {
            // console.log(error);
            const status = error.response.status;
            const data = error.response.data;
            setLoginErrorExists(true);
            if (status === 401){
                setErrorMsg("Invalid credential");
            } else if (status === 500){
                setErrorMsg("Something wrong with the server");
            }
        });
    }

    return (
        <div className='h-screen w-full max-w-xl flex flex-col justify-center mx-auto'>
            <div className='border-2 border-black rounded-lg'>
                <form id="loginForm" className='p-10 flex flex-col items-center justify-items-stretch pb-6' onSubmit={loginHandler} method="post">
                    <h2 className='w-full mx-auto text-center text-5xl font-bold mb-10'>Binotify Premium</h2>
                    <p className={`${(loginErrorExists) ? "bg-rose-600 text-white w-full text-center h-10 leading-10 rounded-md mb-4" : ""}`}>{errorMsg}</p>
                    <div className='w-full'>
                        <label htmlFor="loginCred" className='w-full text-left block'>Email/Username</label>
                        <input id="loginCred" name='loginCred' className='border-2 rounded-lg border-black p-1 w-full mb-8' type="text" placeholder='Enter your email/username' onChange={credInputHandler} value={credential}/>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="loginPass" className='w-full text-left block'>Password</label>
                        <input id="loginPass" name='loginPass' className='border-2 rounded-lg border-black p-1 w-full mb-8' type="password" placeholder='Enter your password' onChange={passInputHandler} value={password}/>
                    </div>
                    <button className='border-2 rounded-lg border-black p-1 w-full max-w-[100px]' type='submit'>Login</button>
                </form>
                <hr />
                <RegisterRedirect/>
            </div>
        </div>
    )
}

export default LoginForm
