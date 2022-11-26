import React from 'react'
import RegisterRedirect from './RegisterRedirect'

const LoginForm = () => {
  return (
    <div className='h-screen w-full max-w-xl flex flex-col justify-center mx-auto'>
        <div className='border-2 border-black rounded-lg'>
            <form id="loginForm" className='p-10 flex flex-col items-center justify-items-stretch pb-6' action="">
                <h2 className='w-full mx-auto text-center text-5xl font-bold mb-10'>Binotify Premium</h2>
                <div className='w-full'>
                    <label htmlFor="loginCred" className='w-full text-left block'>Email/Username</label>
                    <input id="loginCred" name='loginCred' className='border-2 rounded-lg border-black p-1 w-full mb-8' type="text" placeholder='Enter your email/username'/>
                </div>
                <div className='w-full'>
                    <label htmlFor="loginPass" className='w-full text-left block'>Password</label>
                    <input id="loginPass" name='loginPass' className='border-2 rounded-lg border-black p-1 w-full mb-8' type="password" placeholder='Enter your password'/>
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
