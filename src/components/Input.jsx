import { Eye, EyeOff } from 'lucide-react';
import React from 'react'
import { useState } from 'react';

function Input({label,value,onChange,placeHolder,type,isSelect,options}) {

  const[showpassword,setShowpassword] = useState(false);

  const toggleShowPassword = () => {
    setShowpassword(!showpassword);
  }


  return (
    <div className="mb-4">
        <label className="text-[13px] text-slate-800 block mb-1">
            {label}
        </label>

        <div className="relative">
          {isSelect ? (
               <select
               value={value}
               onChange={(e) => onChange(e)}
               className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading focus:outline-none focus:border-blue-500"
               >
                  {options.map((opt,index) => (
                    <option key={index}
                    value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
               </select>
          ):
          (
            <input 
            className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            type={type === 'password' ? (showpassword ? "text":"password") : type} 
            placeholder={placeHolder} 
            value={value} 
            onChange={(e) => onChange(e)}>
            </input>
          )
          }

            {type === "password" && (
              <span className="absolute right-3 top-1/2 -translate-y-1/3 cursor-pointer">
                 {showpassword ? 
                 (<Eye size={20} className="text-purple-800" onClick={toggleShowPassword}></Eye>)
                 :
                 (<EyeOff size={20} className="text-slate-400" onClick={toggleShowPassword}></EyeOff>)}
              </span>
            )}
        </div>
    </div>
  )
}

export default Input