/** External libs */
import React, {useContext, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
/**Custom libs */
import Logo from '../res/logo/qrious-dark.svg'
import { UserContext } from '../App'
import AuthService from '../services/AuthService'
import TokenService from '../services/TokenService'
/**Pages */

function Login() {

  const [user, setUser] = useContext(UserContext)
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const navigate = useNavigate();

  const onUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }
  
  const login = async (e) => {
    e.preventDefault()
    
    if(!username || !password) return toast.warn('Please fill all the fields')
    try {
      AuthService.login(username, password)
      .then((data)=>{
        setUser(TokenService.getLocalUser());
      },
      (error)=>{
        throw error;
      });
      
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  return (
    <div className="w-full h-full bg-slate-100 flex justify-center items-center">
        <div className="max-w-md h-5/6 flex-col rounded-xl shadow-xl flex justify-center items-center ">
          {/* logo */}
          <div className="w-1/2 flex justify-center items-center">
            <img src={Logo} alt="logo" className="w-full h-full text-slate-700" />
          </div>
          {/* form */}
          <form onSubmit={login} className="w-10/12 p-4">
            {/* username */}

            <div className="w-full mb-4">
              <label className="block text-slate-700 text-sm font-bold mb-1" htmlFor="inst_id">
                Institution Id
              </label>
              <input 
              className="w-full px-4 py-2 rounded-md bg-slate-100 border border-slate-700 border-solid" 
              type="text" 
              name="inst_id"
              id="inst_id"
              placeholder="Enter your institution id" 
              onChange={onUsernameChange} />
            </div>

            {/* password */}
            <div className="w-full mb-4">
              <label className="block text-slate-700 text-sm font-bold mb-1" htmlFor="password">
                Password
              </label>
              <input 
                className="w-full px-4 py-2 rounded-md bg-slate-100 border border-slate-700 border-solid" 
                type="password" 
                name="password"
                id="password"
                placeholder="Enter your password" 
                onChange={onPasswordChange}/>
            </div>

            {/* forgot password */}
            <div className="w-full mb-4">
              <Link path="#" className="text-slate-700 text-sm font-bold">Forgot password?</Link>
            </div>
            {/* login button */}
            <div className="w-full mb-4">
              <button className="w-full bg-slate-700 text-slate-100 py-2 rounded-md font-bold">Login</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Login