import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import {IoMdArrowDropdown} from "react-icons/io";
import logo from '../assets/image/logo.png';

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    const toggleDestinationDropdown = () => {
        setShowDestinationDropdown(!showDestinationDropdown);
    };

    return (
        <div className='bg-white text-black   justify-between items-center w-full mx-auto h-24  text-l'>


            <div className='flex px-5 border-b justify-between items-center  mx-auto h-16 py-10 md:px-20 text-l'>
                 <img src={logo} height={40} width={150} alt="Logo" />
                 <div onClick={handleNav} className='z-50 block md:hidden'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>
            <ul className='hidden md:flex z-50'>
                
            </ul>
            </div>
           
            <div className='flex items-center justify-center max-w-[1240px]   text-l'>
            
                 <ul className='hidden md:flex z-50'>
                <li className='p-3'><a href='#'>Home</a></li>
                <li className='p-3'><a href='#'>About Us</a></li>
                <li className='p-3'><a href='#'>Tour List</a></li>
                <li className='p-3'>
                    <a href='#' onMouseEnter={toggleDestinationDropdown} className='flex items-center'>
                        Destination
                        <IoMdArrowDropdown />
                    </a>
                    {showDestinationDropdown && (
                        <div className='absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                            <div className='py-1'>
                                <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                    Option 1
                                </a>
                                <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                    Option 2
                                </a>
                                <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                    Option 3
                                </a>
                            </div>
                        </div>
                    )}
                </li>
                <li className='p-3'>
                    <a href='#' className='px-4 py-2 rounded-xl bg-primary-color'>
                        Blog
                    </a>
                </li>
            </ul>
            
            </div>
           

            

            <div className={nav ? 'z-50 text-gray-300 fixed h-full left-0 top-0 w-[60%] border-r border-r-gray-900 bg-[#202121] ease-in-out duration-500' : 'fixed left-[-100%]'}>
                <ul className='p-8 text-2xl'>
                <li className='p-3'><a href='#'>Home</a></li>
                <li className='p-3'><a href='#'>About Us</a></li>
                <li className='p-3'><a href='#'>Tour List</a></li>
                <li className='p-3'>
                    <a href='#' onClick={toggleDestinationDropdown} className='flex items-center'>
                        Destination
                        <IoMdArrowDropdown />
                    </a>
                    {showDestinationDropdown && (
                        <div className='absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                            <div className='py-1'>
                                <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                    Option 1
                                </a>
                                <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                    Option 2
                                </a>
                                <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                    Option 3
                                </a>
                            </div>
                        </div>
                    )}
                </li>
                <li className='p-3'>
                    <a href='#' className='px-4 py-2 rounded-xl bg-primary-color'>
                        Blog
                    </a>
                </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
