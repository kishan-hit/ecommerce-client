import React from "react";
// import { MdPhone } from "react-icons/md";
import { FaUser, FaHeart } from "react-icons/fa";

const TopBar = () => {
    return (
        <header className="flex items-center justify-between px-24 py-2 w-full bg-gray-100">
            <div className="flex items-center gap-4">
                <p className="text-gray-600 text-sm font-sans">Welcome to Our store EliteMart</p>
                {/* <a
                    href="tel:+91-(033) 4603 1489"
                    className="flex items-center gap-2 text-gray-600 text-sm transition-colors duration-200 hover:text-blue-500"
                    target='_blank'
                    rel="noreferrer"
                >
                    <MdPhone className="text-blue-500" />
                    <span className="font-sans">Call Us: +91-(033)46031489</span>
                </a> */}
            </div>
            <div className="flex items-center gap-4">
                <a
                    href="#wishlist"
                    className="flex items-center gap-2 text-gray-600 text-sm transition-colors duration-200 hover:text-blue-500 cursor-pointer"
                >
                    <FaHeart size={14} />
                    <span className="font-sans">Wishlist</span>
                </a>
                <a
                    href="#account"
                    className="flex items-center gap-2 text-gray-600 text-sm transition-colors duration-200 hover:text-blue-500 cursor-pointer"
                >
                    <FaUser size={14} />
                    <span className="font-sans">My Account</span>
                </a>
            </div>
        </header>
    );
};

export default TopBar;
