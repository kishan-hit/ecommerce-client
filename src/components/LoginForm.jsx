import React from 'react'

const LoginForm = () => {
    return (
        <form className='bg-white rounded-lg shadow-md w-full max-w-sm mx-auto'>
            <div className='pt-6'>
                <h2 className='text-3xl text-center font-extralight'>Login</h2>
            </div>
            <hr className='text-gray-200 mt-6 mb-6' />
            <p className='text-center text-gray-600 text-lg font-light'>
                We are glad to see you again!
            </p>
            <div className='p-6'>
                <div className='mb-4'>
                    <label className='text-gray-600 text-sm'>Username</label>
                    <input
                        label='Username'
                        value=''
                        onChange=''
                        className='w-full p-2 rounded mt-2'
                        placeholder='Enter your username'
                        required
                    />
                </div>
            </div>
        </form>
    )
}

export default LoginForm