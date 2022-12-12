import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

function SideNavButton({ icon, text, to }) {

    const [ active, setActive ] = useState(false);
    const navigate = useNavigate();
    const location = window.location.pathname
    const ref = React.createRef();

    useEffect(() => {
        if (active) {
            ref.current.classList.replace('text-slate-700', 'text-slate-100');
            ref.current.classList.add('bg-slate-700', 'rounded-md');
        } else {
            ref.current.classList.replace('text-slate-100', 'text-slate-700');
            ref.current.classList.remove('bg-slate-700', 'rounded-md');
        }
    }, [active, ref])

    useEffect(() => {
        if (location === to) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [to, location])

    const handleClick = () => {
        navigate(to);
    }

  return (
    <div 
      ref={ref}
      onClick={handleClick} 
      className="w-full p-2 gap-2 flex flex-row items-center justify-items-start justify-start text-slate-700 transition-all ease-in-out hover:text-slate-400 hover:cursor-pointer">
        {icon}
        <span className="font-bold">{text}</span>
    </div>
  )
}


export default SideNavButton