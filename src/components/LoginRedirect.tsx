import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginRedirect = () => {

    const navigate = useNavigate();

    const loginRedirectHandler = () => {
        navigate('/login');
    };

    return (
        <div>
            <form id="redirectLogInForm" className='flex flex-col items-center justify-items-stretch mt-3'>
                <label htmlFor="logInButton" className='mb-2'>Already have an account?</label>
                <button id="logInButton" className='border-2 rounded-lg border-black p-1 w-full mb-8 max-w-sm' onClick={loginRedirectHandler}>LOG IN</button>
            </form>
        </div>
    )
}

export default LoginRedirect