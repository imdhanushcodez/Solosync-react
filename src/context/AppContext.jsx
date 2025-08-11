import {createContext, useState } from 'react';


export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

  

  const [user,setUser] = useState(null);

  const clearuser = () =>{
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }



  const contextValue = {
    user,
    setUser,
    clearuser
  }

  return (
    <AppContext.Provider value={contextValue}>
        {children}
    </AppContext.Provider>
  )
}



