/** External libs */
import React, {createContext, useState, useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify'
/** Custom libs */
import ApiService from './services/ApiService'
/** Pages */
import Login from './pages/Login'
import AuthService from './services/AuthService'


const UserContext = createContext()

function App() {

  const [user, setUser] = useState({});

  useEffect(() => {

    AuthService.verifySession()
    .then(
      (data)=>{
        console.log(data)
        setUser({
          ...data.admin,
          _a: data.token
        });
      },
      (error)=>{
        console.log(error);
      }
    );
    
  },[]);
  // check session token
  

  return (
    <div className="w-full h-screen">
        <UserContext.Provider value={[user, setUser]}>
          <Routes>
            <Route path="/*" element={ !user?._a ? <Login /> : <Dashboard />} />
            {/* <Route path="/dashboard" element={} /> */}
          </Routes>
        </UserContext.Provider>
        <ToastContainer />
    </div>
  )
}
export {UserContext}
export default App