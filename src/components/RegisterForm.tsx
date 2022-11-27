import React, { useState } from 'react'
import LoginRedirect from './LoginRedirect.js'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [serverErrorExists, setServerErrorExists] = useState(false);
    const [emailErrorExists, setEmailErrorExists] = useState(false);
    const [usernameErrorExists, setUsernameErrorExists] = useState(false);
    const [passwordErrorExists, setPasswordErrorExists] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const nameInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const usernameInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const emailInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const passwordInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const password2InputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword2(event.target.value);
    }

    const registerHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let validEmail = true;
        let validUsername = true;
        if (email.search(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === -1){
            validEmail = false;
        }
        if (username.search(/^[a-zA-Z0-9_]+$/) === -1){ 
            validUsername = false;
        }
        if (validEmail && validUsername){
            const registerData = {
                name: name,
                username: username,
                email: email,
                pass: password,
                pass2: password2
            }
            axios({
                method: "post",
                url: "http://localhost:8080/login",
                data: registerData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function (response) {
                const res = response.data;
                if (res.valid){
                    setEmailErrorExists(false);
                    setUsernameErrorExists(false);
                    setPasswordErrorExists(false);
                    setServerErrorExists(false);
                    setErrorMsg("");
                    // TODO: redirect, keep session?
                } else {
                    setEmailErrorExists(false);
                    setUsernameErrorExists(false);
                    setPasswordErrorExists(false);
                    setServerErrorExists(false);
                    setErrorMsg(res.note);
                    if (res.note === "Username already exists"){
                        setUsernameErrorExists(true);
                    } else if (res.note === "Email already exists"){
                        setEmailErrorExists(true);
                    } else if (res.note === "Confirm password doesn't match"){
                        setPasswordErrorExists(true);
                    } else if (res.note === "Something wrong with the server"){
                        setServerErrorExists(true);
                    }
                }
            })
            .catch(function (error) {
                // console.log(error);
                setEmailErrorExists(false);
                setUsernameErrorExists(false);
                setPasswordErrorExists(false);
                setServerErrorExists(true);
                setErrorMsg("Something wrong with the server");
            });
        } else if (validEmail && !validUsername) {
            setErrorMsg("Invalid username format");
            setUsernameErrorExists(true);
            setEmailErrorExists(false);
            setPasswordErrorExists(false);
            setServerErrorExists(false);
        } else if (validUsername && !validEmail) {
            setErrorMsg("Invalid email format");
            setEmailErrorExists(true);
            setUsernameErrorExists(false);
            setPasswordErrorExists(false);
            setServerErrorExists(false);
        } else if (!validEmail && !validUsername){
            setErrorMsg("Invalid email and username format");
            setUsernameErrorExists(true);
            setEmailErrorExists(true);
            setPasswordErrorExists(false);
            setServerErrorExists(false);
        }
    }
    
    return (
        <div className='w-full max-w-xl flex flex-col justify-center mx-auto my-10'>
            <div className='border-2 border-black rounded-lg'>
                <form id="registerForm" className='p-10 flex flex-col items-center justify-items-stretch pb-6' onSubmit={registerHandler} method="post">
                    <h2 className='w-full mx-auto text-center text-5xl font-bold mb-10'>Binotify Premium</h2>
                    <p className={`${(emailErrorExists || usernameErrorExists || passwordErrorExists || serverErrorExists) ? "bg-rose-600 text-white w-full text-center h-10 leading-10 rounded-md mb-4" : ""}`}>{errorMsg}</p>
                    <div className='w-full'>
                        <label htmlFor="registerName" className='w-full text-left block'>Name</label>
                        <input id="registerName" name='registerName' className='border-2 rounded-lg border-black p-1 w-full mb-8' type="text" placeholder='Enter your name' onChange={nameInputHandler}/>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="registerUsername" className='w-full text-left block'>Username</label>
                        <input id="registerUsername" name='registerUsername' className={`border-2 rounded-lg p-1 w-full mb-8 ${usernameErrorExists ? "border-rose-600" : "border-black"}`} type="text" placeholder='Enter your username' onChange={usernameInputHandler}/>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="registerEmail" className='w-full text-left block'>Email</label>
                        <input id="registerEmail" name='registerEmail' className={`border-2 rounded-lg p-1 w-full mb-8 ${emailErrorExists ? "border-rose-600" : "border-black"}`} type="text" placeholder='Enter your email' onChange={emailInputHandler}/>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="registerPass" className='w-full text-left block'>Password</label>
                        <input id="registerPass" name='registerPass' className={`border-2 rounded-lg p-1 w-full mb-8 ${passwordErrorExists ? "border-rose-600" : "border-black"}`} type="password" placeholder='Enter your password' onChange={passwordInputHandler}/>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="registerPass2" className='w-full text-left block'>Confirm Password</label>
                        <input id="registerPass2" name='registerPass2' className={`border-2 rounded-lg p-1 w-full mb-8 ${passwordErrorExists ? "border-rose-600" : "border-black"}`} type="password" placeholder='Confirm your password' onChange={password2InputHandler}/>
                    </div>
                    <button className='border-2 rounded-lg border-black p-1 w-full max-w-[100px]' type='submit'>Sign up</button>
                </form>
                <hr />
                <LoginRedirect/>
            </div>
        </div>
    )
}

export default RegisterForm