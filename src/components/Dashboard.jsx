import React, { useContext } from 'react'
import MenuBar from './MenuBar'
import { AppContext } from '../context/AppContext'
import Sidebar from './Sidebar';


function Dashboard({children, activeMenu}) {

  
  const {user} = useContext(AppContext);
  return (
    <div>
        <MenuBar activeMenu={activeMenu}></MenuBar>

        {user && (
          <div className="flex">
            <div className="max-[1080px]:hidden">
              {/* SIde bar content */}
              <Sidebar activeMenu={activeMenu}></Sidebar>
            </div>

            <div className="grow mx-5"> {children}</div>
          </div>
        )}

    </div>
  )
}

export default Dashboard