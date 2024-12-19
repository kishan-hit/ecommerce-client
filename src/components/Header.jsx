import React from 'react';
import SearchBar from './SearchBar';
import { Badge } from 'react-bootstrap';

const Header = () => {
    return (
        <div className='flex fixed top-0 left-0 right-0 z-10 w-full justify-between px-10 items-center h-20 bg-gray-900 text-white'>
            <div className='flex ml-16'>
                <div className="px-5 flex items-center justify-center text-4xl font-bold text-blue-600 font-pacifico">
                    <span className="text-yellow-500">ELITE</span>MART
                </div>
                <SearchBar />
            </div>
            <div className='flex px-10'>
                <div className='px-4'>
                    Login
                </div>
                <div className="px-4 flex items-center space-x-2">
                    {/* <Badge pill bg="danger" className="text-white"> */}
                    {/* {itemsCount === 0 ? "" : itemsCount} */}
                    {/* </Badge> */}
                    <i className="bi bi-cart-dash text-xl text-gray-700"></i>
                    <span className="font-medium text-lg text-gray-800">Cart</span>
                </div>
            </div>
        </div>
    )
}

export default Header;