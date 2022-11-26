import React, { useState } from 'react'
import RegisterRedirect from './RegisterRedirect'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {

    const navigate = useNavigate();

    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");

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
            url: "http://localhost:8080/login",
            data: loginData,
            headers: { "Content-Type": "application/json" },
          })
        .then(function (response) {
            const res = response.data;
            if (res.valid){
                // TODO
            } else {
                // TODO
            }
        })
        .catch(function (error) {
            console.log(error);
            // TODO
        });
    }

    return (
        <div className='h-screen w-full max-w-xl flex flex-col justify-center mx-auto'>
            <div className='border-2 border-black rounded-lg'>
                <form id="loginForm" className='p-10 flex flex-col items-center justify-items-stretch pb-6' onSubmit={loginHandler} method="post">
                    <h2 className='w-full mx-auto text-center text-5xl font-bold mb-10'>Binotify Premium</h2>
                    <div className='w-full'>
                        <label htmlFor="loginCred" className='w-full text-left block'>Email/Username</label>
                        <input id="loginCred" name='loginCred' className='border-2 rounded-lg border-black p-1 w-full mb-8' type="text" placeholder='Enter your email/username' onChange={credInputHandler}/>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="loginPass" className='w-full text-left block'>Password</label>
                        <input id="loginPass" name='loginPass' className='border-2 rounded-lg border-black p-1 w-full mb-8' type="password" placeholder='Enter your password' onChange={passInputHandler}/>
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
