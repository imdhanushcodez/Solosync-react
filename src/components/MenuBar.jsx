import React, { useState,useRef,useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, User, X } from 'lucide-react';
import {assets} from '../assets/assets'
import Sidebar from './Sidebar';

function MenuBar({activeMenu}) {
    const [openSideMenu,setOpenSideMenu] = useState(false);
    const [showDropDown,setDropDown] = useState(false);
    const dropDownRef = useRef(null);
    const {user,clearuser} = useContext(AppContext);
    const navigate = useNavigate();

    
    const handleLogout = () => {
        localStorage.clear();
        clearuser();
        setDropDown(false);
        navigate("/login");

    }

  return (
    <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">

        {/* Left side - Menu button amd title*/}
        <div className="flex items-center gap-5">
            <button 
            onClick={() => setOpenSideMenu(!openSideMenu)}
            className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors">
                {openSideMenu ? (
                    <X className="text-2xl"></X>
                )
                :(
                    <Menu className="text-2xl"></Menu>
                )}
            </button>

            <div className="flex items-center gap-2">
                <img src={assets.logo} alt="" className="h-12 w-15" />
                <span className="text-lg font-medium text-black truncate"></span>
            </div>
        </div>


        {/* Right side - Avatar photo*/}
        <div className="relative" ref={dropDownRef}>
            <button 
            onClick={() => setDropDown(!showDropDown)}
            className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2">
                <User className="text-purple-600"></User>
            </button>
            {/* Dropdown Menu*/}
            {showDropDown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    {/* User Info*/}
                    <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                                <User className="w-4 h-4 text-purple-600">
                                </User>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">{user.fullname}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    {/*Drop options */}
                    <div className="py-1">
                        <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                            <LogOut className="w-4 h-4 text-gray-500"></LogOut>
                            <span>Logout </span>
                        </button>
                    </div>
                    
                </div>
            )}
        </div>



        {/* Mobile side menu*/}
        {openSideMenu && (
            <div className="fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20 top-[73px]">
                <Sidebar activeMenu={activeMenu}></Sidebar>
            </div>
        )}



    </div>
  )
}

export default MenuBar