import React, {useContext} from 'react'
import Logo from '../res/logo/qrious-light.svg'
import {MdExitToApp} from 'react-icons/md';
import AuthService from '../services/AuthService';
import {UserContext} from '../App'
function Header() {

  const [_, setUser] = useContext(UserContext)
  const logout = async (e) => {
    e.preventDefault();
    
    AuthService.logout()
    .then(
      (_)=>{
        setUser({});
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  return (
    <div className='w-full h-14 bg-slate-900 flex flex-row justify-between items-center px-4 py-2'>
        <img src={Logo} alt="Qrious Logo" width={100} height={100} />
        {/* logout */}
        <button 
        className='flex flex-row justify-center items-center gap-2 text-slate-100 hover:text-slate-400 hover:cursor-pointer'
        onClick={logout}>
            <MdExitToApp className='text-2xl'/>
            <span className='font-bold'>Logout</span>
        </button>
    </div>
  )
}

export default Header