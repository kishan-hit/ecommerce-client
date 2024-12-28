import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { logoutUser } from '../service/authApi';
import { Toaster, toast } from 'react-hot-toast';

const Header = () => {
    const { isLoggedIn, user, logout } = useSession();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const handleMouseEnter = () => {
        if (isLoggedIn) {
            setDropdownVisible(true);
        }
    };

    const handleMouseLeave = () => {
        if (isLoggedIn) {
            setDropdownVisible(false);
        }
    };

    const handleLogout = async () => {
        try {
            const { data } = await logoutUser();
            logout(data);
            navigate('/login');
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className='flex fixed top-0 left-0 right-0 z-10 w-full justify-between px-10 items-center h-20 bg-gray-900 text-white'>
            <div className='flex ml-16'>
                <div className="px-5 flex items-center justify-center text-4xl font-bold text-blue-600 font-pacifico">
                    <span className="text-yellow-500">ELITE</span>MART
                </div>
                <SearchBar />
            </div>
            <div className='flex pl-10 pr-20 space-x-6 relative'>
                <div
                    className='px-2 py-2 flex items-center space-x-3 hover:cursor-pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {
                        isLoggedIn ? (
                            <>
                                <i className="bi bi-person-check text-xl text-gray-400"></i>
                                <div className='flex items-center space-x-2'>
                                    <span className="font-normal text-lg text-gray-400">
                                        {user?.email?.split("@")[0] || "User"}
                                    </span>
                                    <i
                                        className={`bi ${dropdownVisible ? "bi-chevron-compact-up" : "bi-chevron-compact-down"
                                            } text-xl text-gray-400`}
                                    ></i>
                                </div>
                            </>
                        ) : (
                            <>
                                <i className="bi bi-person text-xl text-gray-400"></i>
                                <span
                                    className="font-normal text-lg text-gray-400"
                                    onClick={() => navigate('/login')}>
                                    Login
                                </span>
                            </>
                        )
                    }
                </div>
                {
                    dropdownVisible && isLoggedIn && (
                        <div
                            className="absolute top-full left-0 w-48 py-2 bg-white shadow-lg rounded-md"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className='flex space-x-3 px-3 py-2 hover:bg-gray-100 cursor-pointer'>
                                <i className="bi bi-person-circle text-gray-600"></i>
                                <div
                                    className="text-gray-600"
                                    onClick={() => navigate("/user/profile")}
                                >
                                    My Profile
                                </div>
                            </div>
                            <div className='flex space-x-3 px-3 py-2 hover:bg-gray-100 cursor-pointer'>
                                <i className="bi bi-box-seam text-gray-600"></i>
                                <div
                                    className="text-gray-600"
                                    onClick={() => navigate("/")}
                                >
                                    My Orders
                                </div>
                            </div>
                            <div className='flex space-x-3 px-3 py-2 hover:bg-gray-100 cursor-pointer'>
                                <i className="bi bi-heart text-gray-600"></i>
                                <div
                                    className="text-gray-600"
                                    onClick={() => navigate("/")}
                                >
                                    Wishlist
                                </div>
                            </div>
                            <div className='flex space-x-3 px-3 py-2 hover:bg-gray-100 cursor-pointer'>
                                <i className="bi bi-box-arrow-right text-gray-600"></i>
                                <div
                                    className="text-gray-600"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className="px-2 py-2 flex items-center space-x-3 hover:cursor-pointer">
                    {/* <Badge pill bg="danger" className="text-white"> */}
                    {/* {itemsCount === 0 ? "" : itemsCount} */}
                    {/* </Badge> */}
                    <i className="bi bi-cart-dash text-xl text-gray-400"></i>
                    <span className="font-normal text-lg text-gray-400">Cart</span>
                </div>
            </div>
        </div>
    )
}

export default Header;