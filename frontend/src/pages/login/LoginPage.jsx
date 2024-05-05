// Login.js

import React, { useContext, useState } from 'react';
import styles from './loginPage.module.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { DnsContext } from '../../context-api/DnsContext';
import { myAxios } from '../../api/httpApi';
import { setToken } from '../../services/auth';
const passClient = import.meta.env.VITE_API_URI_PASS || '';
const userClient = import.meta.env.VITE_API_URI_USER || '';
function Login() {
  const [username, setUsername] = useState('ermaanish@gmail.com');
  const [password, setPassword] = useState('123');
  const location = useNavigate();
  const { setIsLoggedLogin } = useContext(DnsContext);
  const handleSubmit = async (event) =>
  {
    event.preventDefault();
    
      try
      {
        const res = await myAxios.post('users/signin', { email: username, password: password })
        console.log(res);
      
        // if (username === userClient && password === passClient) {
        if (res?.data?.success)
        {
          setToken(res.data.token)
          setIsLoggedLogin(true);
          toast.success('Welcome! Admin');
          location('/dashboard');
        } else
        {
          toast.error('Wrong Credentials');
        }
      } catch (error)
      {
        console.log(error)
        toast.error('something went wrong')
      }
  }
   const handleTryOther = (event) => {
    event.preventDefault();
    location('/newUser');
      toast.success("Please Enter your Credentials")
  };

  return (
    <>
      <div className={styles['login-container']}>
        <form className={styles['login-form']} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className={styles['form-group']}>
            <label className={styles['lablel']} htmlFor="username">
              Username
            </label>
            <input
              className={styles['input']}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label className={styles['lablel']} htmlFor="password">
              Password
            </label>
            <input
              className={styles['input']}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button className={styles['btn']} type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
