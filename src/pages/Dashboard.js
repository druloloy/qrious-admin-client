import React, {useContext, useEffect} from 'react'
import {UserContext} from '../App'
import SideNav from '../components/SideNav'
import {MdArrowUpward} from 'react-icons/md';
import {Route, Routes} from 'react-router-dom'
import Home from './dashboard-contents/Home'
import ManageDocuments from './dashboard-contents/ManageDocuments'
import ManageAdmins from './dashboard-contents/ManageAdmins'
import Settings from './dashboard-contents/Settings'
import Header from '../components/Header'

function Dashboard() {
  const [scrollY, setscrollY] = React.useState(0);
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setscrollY(window.scrollY);
    });
  },[])


  return (
    <div className='w-full h-full flex flex-col justify-start items-start'>
      <Header />
      <div className="w-full h-auto bg-slate-100 flex flex-col justify-start items-start p-4 lg:flex-row">
        {/* nav */}
        <div className='w-full h-fit p-4 border border-x-0 border-t-0 border-b-2 border-slate-700 lg:w-1/5 lg:h-full lg:border-r-2 lg:border-l-0 lg:border-y-0'>
          <SideNav />
        </div>
        {/* content */}
        <div className='w-full h-auto p-4'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/documents" element={<ManageDocuments />} />
            <Route path="/admins" element={<ManageAdmins />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
        {/* back to top */}
        {
          scrollY > 250 &&
          <button className='w-fit h-fit flex flex-row justify-center items-center text-md font-bold px-4 py-2 bg-green-700 text-slate-100 rounded-3xl fixed bottom-4 left-4 z-50 '><MdArrowUpward className='text-3xl font-bold'/> Back to top </button>
        }
      </div>
    </div>
  )
}

export default Dashboard