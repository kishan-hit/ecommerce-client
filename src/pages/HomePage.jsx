import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { Toaster, toast } from 'react-hot-toast';
import { logoutUser } from '../service/authApi';

const HomePage = () => {
    const navigate = useNavigate();
    const { user, logout } = useSession();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        if (user && user.email) {
            const name = user.email.split("@")[0];
            setUserName(name);
        }
    }, [user]);

    const handleLogOut = async () => {
        try {
            const { data } = await logoutUser();
            logout(data);
            navigate('/login');
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            <Toaster position='top-center' reverseOrder={true}></Toaster>
            <div className='p-6 bg-white rounded-lg shadow-md max-w-md mx-auto'>
                <h2 className='text-xl font-semibold mb-4'> Welcome, {userName}! </h2>
                <p>Logged in successfully</p>
                <button
                    type='button'
                    className='mt-4 bg-red-500 text-white px-4 py-2 rounded'
                    onClick={handleLogOut}
                >
                    Logout
                </button>
            </div>
        </>
    )
}

export default HomePage;