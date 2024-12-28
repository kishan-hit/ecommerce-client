import React from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';

const HomePage = () => {
    return (
        <div className='bg-[#f0f5ff] flex flex-col'>
            <Header />
            <div className='section px-3 md:px-16 lg:px-40 py-4 md:py-8 lg:py-10 overflow-hidden'>
                <Carousel />
            </div>
        </div>
    )
}

export default HomePage;