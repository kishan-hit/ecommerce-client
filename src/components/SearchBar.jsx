import React, { useState, useEffect } from 'react'

const SearchBar = () => {
    const [filter, setFilter] = useState('');

    // useEffect(() => {
    //     onFilterChange(filter);
    // }, [filter]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };
    return (
        <div className="bg-[#E6E8EE] rounded-[20px] h-10 w-96 text-[16px] relative flex">
            <input
                type="text"
                value={filter}
                onChange={handleFilterChange}
                placeholder="Search for products..."
                className="w-full bg-transparent pl-5 pr-10 py-2 text-gray-700 placeholder-gray-500 outline-none"
            />
            <div className="h-full absolute right-4 top-0 flex items-center text-gray-500">
                <i className="bi bi-search"></i>
            </div>
        </div>

    )
}

export default SearchBar;