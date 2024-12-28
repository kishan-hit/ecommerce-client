import React, { useEffect, useState } from 'react';
// import guardImg1 from '../assets/images/guard1.png'
// import guardImg2 from '../assets/images/guard2.png'
// import guardImg3 from '../assets/images/guard3.png'

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        {
            title: 'Discover Quality Products',
            subtitle: 'Explore a wide range of top-rated items for all your needs.',
            image: ''
        },
        {
            title: 'Seamless Shopping Experience',
            subtitle: 'Enjoy fast, secure, and hassle-free online shopping.',
            image: ''
        },
        {
            title: 'Customer Satisfaction Guaranteed',
            subtitle: 'We’re committed to delivering exceptional service and quality.',
            image: ''
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="relative w-full mt-20" data-carousel="static">
            <div className="relative h-[16rem] rounded-lg overflow-hidden md:h-[32rem] bg-red-400">
                {slides.map((slide, index) => (
                    <div className={`absolute block w-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`} key={index}>
                        <div className='absolute top-0 left-0 w-0 h-0 border-t-[500px] md:border-t-[900px] border-t-orange-500 border-r-[200px] border-r-transparent'></div>
                        <div className='flex justify-between items-center'>
                            <div className='p-6 md:px-16 z-10 md:w-[60%] flex justify-center flex-col'>
                                <div className='text-3xl md:text-5xl font-bold'>{slide.title}</div>
                                <div className='text-xl md:text-2xl font-semibold text-gray-600 mt-1'>{slide.subtitle}</div>
                            </div>

                            <div className='md:flex justify-center h-[28rem] hidden px-14 w-[40%] items-start'>
                                <img src={slide.image} alt='' className='h-full' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <div className="absolute z-10 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-gray-400' : 'bg-gray-300'
                            }`}
                        aria-current={index === currentIndex}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            <button
                type="button"
                className="absolute top-0 left-0 z-10 flex items-center justify-center h-full md:px-1 cursor-pointer group focus:outline-none"
                onClick={() =>
                    setCurrentIndex(
                        (prevIndex) =>
                            (prevIndex - 1 + slides.length) % slides.length
                    )
                }
            >
                <span className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300/40 group-hover:bg-gray-300/60 focus:ring-4 focus:ring-white -ml-3 md:ml-0">
                    <i className="bi bi-chevron-left text-white text-xl"></i>
                    <span className="sr-only">Previous</span>
                </span>
            </button>

            <button
                type="button"
                className="absolute top-0 right-0 z-10 flex items-center justify-center h-full md:px-1 cursor-pointer group focus:outline-none"
                onClick={() =>
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
                }
            >
                <span className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 -mr-3 md:mr-0 rounded-full bg-gray-300/70 group-hover:bg-gray-300/100 focus:ring-4 focus:ring-white">
                    <i className="bi bi-chevron-right text-white text-xl"></i>
                    <span className="sr-only">Next</span>
                </span>
            </button>

        </div>
    );
}

export default Carousel;
