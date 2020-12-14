import React,{useState, useEffect,useContext} from 'react';
import {NavLink} from 'react-router-dom';
import style from './sign.module.css';
import {useHttp} from '../../hooks/http.hook';
import {useMessage} from '../../hooks/message.hook';
import { ToastContainer, toast } from 'react-toastify';
import { SignContext } from '../../context/SignContext';
import 'react-toastify/dist/ReactToastify.css';

export const SignUpPage = () => {
  const sign = useContext(SignContext);
  const message = useMessage();
  const {loading,error,req, clearError} = useHttp();
  const [form, setForm] = useState({
    email:'', login:'', password:'', confrimPassword:''
  })

  useEffect(() => {
    toast.error(message(error));
    clearError();
  }, [error, message, clearError])

  const changeHandler = event =>{
    setForm({...form, [event.target.name]: event.target.value})
  }

  const regHandler = async () => {
    try{
      const data = await req('api/sign/signup', 'POST', {...form});
      sign.login(data.token, data.userId)
      toast.success(data.message);
    }catch (e){}
  }


  return (
    <div>
      <div className={style.container}>
        <h1>Sign up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />

        <label htmlFor="email"><b>Email</b></label>
        <input type="text"
          placeholder="Enter Email"
          name="email" 
          id="email"
          value={form.email}
          onChange={changeHandler} 
          className={style.input}/>

        <label htmlFor="login"><b>Login</b></label>
        <input type="text"
          placeholder="Enter login"
          name="login"
          id="login"
          value={form.login}
          onChange={changeHandler} 
          className={style.input}/>

        <label htmlFor="password"><b>Password</b></label>
        <input type="password"
          placeholder="Enter Password"
          name="password" 
          id="password"
          value={form.password}
          onChange={changeHandler} 
          className={style.input}/>

        <label htmlFor="confrimPassword"><b>Confrim Password</b></label>
        <input type="password"
          placeholder="Repeat Password"
          name="confrimPassword"
          id="confrimPassword"
          value={form.confrimPassword}
          onChange={changeHandler} 
          className={style.input}/>
        <hr />

        <button className={style.btn}
          onClick={regHandler}
          disabled={loading}>Sign up</button>

        <div>
          <p>Already have an account? <NavLink to='/signin'> Sign in</NavLink>.</p>
        </div>
      </div>
      <ToastContainer/>
    </div>
    )
}