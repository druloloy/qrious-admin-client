import React, { useState } from 'react'
import SideNavButton from './SideNavButton'
import {MdHome, MdDescription, MdAdminPanelSettings, MdSettings} from 'react-icons/md';
function SideNav() {
  return (
    <div 
        className='w-full h-fit p-2 border-2 border-slate-700 flex flex-col justify-start items-start z-50 rounded-md'>
            <SideNavButton icon={<MdHome className='text-2xl flex-shrink-0'/>} text="Home" to='/'/>
            <SideNavButton icon={<MdDescription className='text-2xl flex-shrink-0'/>} text="Manage Documents" to='/documents'/>
            <SideNavButton icon={<MdAdminPanelSettings className='text-2xl flex-shrink-0'/>} text="Manage Admins" to='/admins'/>
            <SideNavButton icon={<MdSettings className='text-2xl flex-shrink-0'/>} text="Settings" to='/settings'/>
    </div>
  )
}

export default SideNav