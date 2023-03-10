import React,{useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import CircularProgress from "@mui/material/CircularProgress";
import { useSnackbar } from "notistack";
import Cookies from 'js-cookie'

import axios from 'axios';
const LoginUser = () => {
  const initialState ={
    email:"",
    password:""
  }
  const { enqueueSnackbar } = useSnackbar();
  const [loading , setLoading] = useState(false)
  const [loginUserData , setLoginUserData] = useState(initialState)
  const [cookiesChecker , setCookiesChecker] = useState(false)

  useEffect(()=>{
    console.log(Cookies.get('userData'))
  },[cookiesChecker])

  const handleChange = (e) => {
    e.preventDefault();
    setLoginUserData({...loginUserData,[e.target.name]:e.target.value})
  }
  const loginHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios({
      url:`${process.env.REACT_APP_BASEURL}/user/loginUser`,
      method:'POST',
      data:{
        ...loginUserData
      }
    }).then(res => {
      setLoading(false);
      console.log(res.data);
      Cookies.set('userData', res.data.token, { expires: 7});
      setCookiesChecker(true)
      enqueueSnackbar(res.data.message , {variant:"success"});
    }).catch(err => {
      console.log(err)
      setLoading(false);
      enqueueSnackbar(err.response.data.message , {variant:"error"})
    })
  }


  return (
    <div className="auth-main">
        <div className="auth-title">
          <h3>Welcome</h3>
          <p>Sign In To Continue !</p>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="auth-form">
              <div className="auth-input">
                <label htmlFor="">Email :</label>
                <br />
                <input
                  type="text"
                  placeholder="Email Here"
                  name="email"
                  value={loginUserData.email}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="auth-input">
                <label htmlFor="">Password :</label>
                <br />
                <input
                  type="password"
                  placeholder="Password Here"
                  name="password"
                  value={loginUserData.password}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="main-btn">
                {loading ? (
                  <button>
                    <CircularProgress
                      style={{
                        width: "20px",
                        height: "20px",
                        marginTop: "2px",
                        color: "white",
                      }}
                    />
                  </button>
                ) : (
                  <button onClick={(e) => loginHandler(e)}>Sign In</button>
                )}
              </div>
              <div className="mt-4">
                <h4>
                  Don't Have an Account ?{" "}
                  <NavLink to="/register-user" className="auth-link">
                    Sign Up
                  </NavLink>{" "}
                </h4>
                <h4>
                  <NavLink className="auth-link" to="/forgot-password">
                    Forgot Password !
                  </NavLink>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
  )
}

export default LoginUser