import React, { useState, useEffect } from 'react';
import { Link } from "react-router";
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser, googleLogin } from '../service/authApi';
import { Toaster, toast } from 'react-hot-toast';
import { Validate } from './Validations';
import { useSession } from '../context/SessionContext';

const LoginForm = ({ onLoginSuccess }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [user, setUser] = useState(null);
    const [forgetPassword, setForgetPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passVisible, setPassVisible] = useState(false);
    const [confPassVisible, setConfPassVisible] = useState(false);
    const navigate = useNavigate();
    const { login } = useSession();

    const googleOAuthLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log('codeResponse', codeResponse);
            setUser(codeResponse);
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const resetForm = () => {
        setEmail("");
        setPassword("");
        if (isRegister)
            setConfirmPassword("");
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            Validate({ email, password, confirmPassword, isRegister });
            const registerPromise = registerUser(email, password);

            toast.promise(
                registerPromise,
                {
                    loading: "Registering user...",
                    success: "User registered successfully!",
                    error: "Registration failed. Please try again.",
                },
                {
                    duration: 3000,
                    position: "top-center",
                }
            );

            await registerPromise;
            setIsRegister(false);
            resetForm();
        } catch (error) {
            if (error.details) {
                error.details.forEach((msg) => {
                    toast.error(msg)
                });
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
            resetForm();
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            Validate({ email, password });
            const loginPromise = loginUser(email, password);
            toast.promise(
                loginPromise,
                {
                    loading: "Logging in ...",
                    success: "User logged in successfully!",
                    error: "Login failed. Please try again.",
                },
                {
                    duration: 3000,
                    position: "top-center",
                }
            );
            const { data } = await loginPromise;
            resetForm();
            onLoginSuccess(data);
        } catch (error) {
            if (error.details) {
                error.details.forEach((msg) => {
                    toast.error(msg)
                });
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
            resetForm();
        }
    }

    useEffect(() => {
        if (user) {
            console.log('User state set:', user);
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
                .then(async (res) => {
                    console.log("result", res.data);

                    window.location.href = "http://localhost:8010/api/auth/google-login";
                })
                .catch((err) => console.log(err));
        }
    }, [user, navigate]);
    return (
        <>
            <Toaster position='top-center' reverseOrder={true}></Toaster>
            <form onSubmit={isRegister ? handleRegister : handleLogin} className='bg-white rounded-lg shadow-md w-full max-w-sm mx-auto'>
                <div className='p-6'>
                    <div className='mb-4'>
                        <label className='text-gray-600 text-sm'>Email</label>
                        <input
                            label='Email'
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-2 rounded mt-2'
                            placeholder='Enter your email'
                            required
                        />
                    </div>
                    {
                        !forgetPassword ? (
                            <>
                                <div className='mb-4'>
                                    <label className='text-gray-600 text-sm'>Password</label>
                                    <div className='relative'>
                                        <input
                                            label='Password'
                                            type={passVisible ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className='w-full p-2 rounded mt-2'
                                            placeholder='Enter your password'
                                            required
                                        />
                                        <div className='absolute inset-y-0 right-0 p-2 cursor-pointer text-gray-600 mt-2'
                                            onClick={() => setPassVisible(!passVisible)}
                                        >
                                            {
                                                passVisible ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>
                                            }
                                        </div>
                                    </div>
                                </div>
                                {
                                    isRegister ? (
                                        <div className='mb-4'>
                                            <label className='text-gray-600 text-sm'>Confirm Password</label>
                                            <div className='relative'>
                                                <input
                                                    label='Confirm Password'
                                                    type={confPassVisible ? "text" : "password"}
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className='w-full p-2 rounded mt-2'
                                                    placeholder='Confirm your password'
                                                    required
                                                />
                                                <div className='absolute inset-y-0 right-0 p-2 cursor-pointer text-gray-600 mt-2'
                                                    onClick={() => setConfPassVisible(!confPassVisible)}
                                                >
                                                    {
                                                        confPassVisible ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ) : ("")
                                }
                                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
                                    {isRegister ? "Sign up" : "Login"}
                                </button>
                                {
                                    !isRegister ? (
                                        <div className='flex items-center justify-center'>
                                            <Link className='text-blue-500 m-2 text-sm' onClick={() => setForgetPassword(true)}>
                                                Forget password?
                                            </Link>
                                        </div>
                                    ) : ("")
                                }
                                <div className="text-center text-gray-500 pt-3">
                                    <p>
                                        {isRegister ? (
                                            <>
                                                Already have an account?{" "}
                                                <Link to="/login"
                                                    onClick={() => {
                                                        setIsRegister(false);
                                                        resetForm();
                                                        setPassVisible(true);
                                                        setTimeout(() => { setPassVisible(false) }, 0);
                                                    }}
                                                    className="text-blue-500">Login</Link>
                                            </>
                                        ) : (
                                            <>
                                                Don't have an account?{" "}
                                                <Link to="/register"
                                                    onClick={() => {
                                                        setIsRegister(true);
                                                        resetForm();
                                                        setPassVisible(true);
                                                        setTimeout(() => { setPassVisible(false) }, 0);
                                                    }}
                                                    className="text-blue-500">Create account</Link>
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
                                                    onClick={() => googleOAuthLogin()}
                                                    className="w-[260px] bg-lime-600 max-w-sm flex items-center justify-center py-[8px] mb-4 border border-[#72777F] text-gray-700 rounded-full hover:bg-gray-200"
                                                >
                                                    <i className="bi bi-google mr-2"></i>
                                                    Continue with Google
                                                </button>
                                            </div>
                                        </>
                                    ) : ("")
                                }
                            </>
                        ) : (
                            <>
                                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
                                    Send OTP
                                </button>
                                <div className='flex items-center justify-center m-2'>
                                    <div onClick={() => setForgetPassword(false)} className="text-blue-500 hover: cursor-pointer">Return to login</div>
                                </div>
                            </>
                        )
                    }
                </div>
            </form>
        </>
    )
}

export default LoginForm;