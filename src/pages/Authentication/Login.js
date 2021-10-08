import React from 'react';
//import logo, image for login page
import logo from '../../assets/images/logo.svg';
import awsm from '../../assets/images/AWSM.png';
import './Login.scss';
import { signIn } from '../../AuthService'
import { Redirect } from "react-router-dom"

const Login = () => {
  if (sessionStorage.getItem("authUser")) {
    return (
      <Redirect
        to={{ pathname: "/", exact: true }}
      />
    )
  }
  return (
    <div className="login-page">
      <div className="login-item">
        <img src={logo} alt="" height="70" className="mb-3" />
        <img src={awsm} alt="" height="70" className="mb-3"/>
        <button onClick={signIn} className="btn-primary btn">Login with PETRONAS ID</button>
      </div>
    </div>
  )
}
export default Login;