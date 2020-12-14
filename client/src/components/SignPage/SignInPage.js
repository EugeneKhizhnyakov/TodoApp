import React,{useState,useEffect, useContext} from 'react';
import {NavLink} from 'react-router-dom';
import style from './sign.module.css';
import {useHttp} from '../../hooks/http.hook';
import {useMessage} from '../../hooks/message.hook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SignContext } from '../../context/SignContext';



export const SignInPage = () =>{
  const sign = useContext(SignContext);
  const message = useMessage();
  const {loading,error,req,clearError} = useHttp();
  const [form, setForm] = useState({
   login:'', password:''
  })

  useEffect(() => {
    toast.error(message(error));
    clearError();
  }, [error, message, clearError])


  const changeHandler = event =>{
    setForm({...form, [event.target.name]: event.target.value})
  }

  const loginHandler = async () => {
    try{
      const data = await req('api/sign/signin', 'POST', {...form});
      toast.success(data.message);
      sign.login(data.token, data.userId)
    }catch (e){}
  }

  return(

    <div className={style.container} >
      <h1>Sign In</h1>
      <p>Please fill in this form to log into an account.</p>
      <hr />
      <label htmlFor="login"><b>Email/Login</b></label>
      <input
        type="text"
        placeholder="Enter Email/login"
        name="login"
        id="login"
        value={form.login}
        onChange={changeHandler} 
        className={style.input}/>

      <label htmlFor="password" ><b>Password</b></label>
      <input type="password"
        placeholder="Enter Password"
        name="password"
        id="password"
        value={form.password}
        onChange={changeHandler} 
        className={style.input}/>
      <hr />

      <button
        className={style.btn}
        onClick={loginHandler}
        disabled={loading}
      >Sign In</button>


      <div>
        <p>Still haven't an account? <NavLink to='/signup'> Sign up</NavLink>.</p>
      </div>

      <ToastContainer/>
    </div>
    );
}

 

