import React from 'react'
import LoginRedirect from './LoginRedirect.js'

const RegisterForm = () => {
  return (
    <div className='w-full max-w-xl flex flex-col justify-center mx-auto my-10'>
        <div className='border-2 border-black rounded-lg'>
            <form id="registerForm" className='p-10 flex flex-col items-center justify-items-stretch pb-6' action="">
                <h2 className='w-full mx-auto text-center text-5xl font-bold mb-10'>Binotify Premium</h2>
                <div className='w-full'>
                    <label htmlFor="registerName" className='w-full text-left block'>Name</label>
                    <input id="registerName" name='registerName' className='border-2 rounded-lg border-black p-1 w-full mb-8' type="text" placeholder='Enter your name'/>
                </div>
                <div className='w-full'>
                    <label htmlFor="registerUsername" className='w-full text-left block'>Username</label>
                    <input id="registerUsername" name='registerUsername' className='border-2 rounded-lg border-black p-1 w-full mb-8' type="text" placeholder='Enter your username'/>
                </div>
                <div className='w-full'>
                    <label htmlFor="registerEmail" className='w-full text-left block'>Email</label>
                    <input id="registerEmail" name='registerEmail' className='border-2 rounded-lg border-black p-1 w-full mb-8' type="email" placeholder='Enter your email'/>
                </div>
                <div className='w-full'>
                    <label htmlFor="registerPass" className='w-full text-left block'>Password</label>
                    <input id="registerPass" name='registerPass' className='border-2 rounded-lg border-black p-1 w-full mb-8' type="password" placeholder='Enter your password'/>
                </div>
                <div className='w-full'>
                    <label htmlFor="registerPass2" className='w-full text-left block'>Confirm Password</label>
                    <input id="registerPass2" name='registerPass2' className='border-2 rounded-lg border-black p-1 w-full mb-8' type="text" placeholder='Confirm your password'/>
                </div>

                <button className='border-2 rounded-lg border-black p-1 w-full max-w-[100px]' type='submit'>Login</button>
            </form>
            <hr />
            <LoginRedirect/>
        </div>
    </div>
  )
}

export default RegisterForm