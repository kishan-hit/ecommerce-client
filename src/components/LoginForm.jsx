import React, { useState, useEffect } from 'react';
import { Link } from "react-router";
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log('codeResponse', codeResponse);
            setUser(codeResponse);
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (user) {
            console.log('User state set:', user);
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
                .then((res) => {
                    console.log('res', res);
                    navigate('/');
                })
                .catch((err) => console.log(err));
        }
    }, [user, navigate]);
    return (
        <form onSubmit='' className='bg-white rounded-lg shadow-md w-full max-w-sm mx-auto'>
            <p className='text-center text-slate-700 text-lg font-light pt-6'>
                {isRegister ? "Welcome!" : "We are glad to see you again!"}
            </p>
            <div className='p-6'>
                <div className='mb-4'>
                    <label className='text-gray-600 text-sm'>Username</label>
                    <input
                        label='Username'
                        type='text'
                        value=''
                        onChange=''
                        className='w-full p-2 rounded mt-2'
                        placeholder='Enter your username'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='text-gray-600 text-sm'>Password</label>
                    <input
                        label='Password'
                        type='password'
                        value=''
                        onChange=''
                        className='w-full p-2 rounded mt-2'
                        placeholder='Enter your password'
                        required
                    />
                </div>
                {
                    isRegister ? (
                        <div className='mb-4'>
                            <label className='text-gray-600 text-sm'>Confirm Password</label>
                            <input
                                label='Confirm Password'
                                type='password'
                                value=''
                                onChange=''
                                className='w-full p-2 rounded mt-2'
                                placeholder='Confirm your password'
                                required
                            />
                        </div>
                    ) : ("")
                }
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
                    {isRegister ? "Sign up" : "Login"}
                </button>
                <div className="text-center text-gray-500 pt-3">
                    <p>
                        {isRegister ? (
                            <>
                                Already have an account? <Link to="/login" onClick={() => setIsRegister(false)} className="text-blue-500">Login</Link>
                            </>
                        ) : (
                            <>
                                Don't have an account? <Link to="/register" onClick={() => setIsRegister(true)} className="text-blue-500">Create account</Link>
                            </>
                        )}
                    </p>
                </div>
                {
                    !isRegister ? (
                        <>
                            <div className="flex items-center w-full max-w-sm my-4">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="mx-4 text-[#000000] text-[14px] leading-[20px] font-400 ">Or</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>
                            <div className='flex items-center justify-center'>
                                <button
                                    onClick={() => login()}
                                    className="w-[260px] bg-gray-400 max-w-sm flex items-center justify-center py-[8px] mb-4 border border-[#72777F] text-gray-700 rounded-full hover:bg-gray-200"
                                >
                                    <i className="bi bi-google mr-2"></i>
                                    Continue with Google
                                </button>
                            </div>
                        </>
                    ) : ("")
                }
            </div>
        </form>
    )
}

export default LoginForm;