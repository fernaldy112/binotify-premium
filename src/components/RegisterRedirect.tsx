import React from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterRedirect = () => {

    const navigate = useNavigate();

    const regRedirectHandler = () => {
        navigate('/register');
    };

    return (
        <div>
            <form id="redirectSignUpForm" className='flex flex-col items-center justify-items-stretch mt-3'>
                <label htmlFor="signUpButton" className='mb-2'>Don't have an account?</label>
                <button id="signUpButton" className='border-2 rounded-lg border-black p-1 w-full mb-8 max-w-sm' onClick={regRedirectHandler}>SIGN UP</button>
            </form>
        </div>
    )
}

export default RegisterRedirect
