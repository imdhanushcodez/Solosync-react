import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { User } from 'lucide-react';
import { SIDE_BAR_DATA } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

function Sidebar({activeMenu}) {
    const {user} = useContext(AppContext);
    const navigate = useNavigate();

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 p-5 sticky top-[61px] z-20">
        <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
            {
               <User className="w-20 h-20 text-lg"></User>
            }
            <h5 className="text-gray-950 font-medium leading-6">{user?.fullname || ""}</h5>
        </div>

        {
            SIDE_BAR_DATA.map((items,index) => (
                <button 
                key ={`menu_${index}`}
                onClick={() => navigate(items.path)}

                className={`cursor-pointer w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 ${activeMenu === items.label ? "text-white bg-purple-600":""}`}>
                    <items.icons className="text-xl"/>
                    {items.label}
                </button>
            ))
        }

    </div>
  )
}

export default Sidebar