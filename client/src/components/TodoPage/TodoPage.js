import React,{useContext,useState,useCallback,useEffect}  from 'react';
import {TodoAdd} from './TodoAdd';
import {TodoList} from './TodoList';
import {Loader} from '../Loader/Loader';
import {useHttp} from '../../hooks/http.hook';
import {SignContext} from '../../context/SignContext';
import {useHistory} from 'react-router-dom';
import style from './todo.module.css';


export const TodoPage = () =>{

  const [todos, setTodos] = useState([]);
  const {loading, req} = useHttp();
  const {token} = useContext(SignContext);
  const history = useHistory();

  const fetchTodos = useCallback(async () => {
    try {
      let url = window.location.href;
      const {todos} = await req(`/api/todo/${url.split('').splice(url.lastIndexOf('/')+1).join('')}`, 'GET', null, {Authorization: `Bearer ${token}`});
      setTodos(todos);
    } catch (e) {}
  }, [token, req]);

  const reloadTodo =() => {
    fetchTodos();
  }
  const addTodo = async todo =>{
    try{
      let url = window.location.href;
      await req('/api/todo/todoAdd', 'POST', {title: todo.trim(), owner: url.split('').splice(url.lastIndexOf('/')+1).join('')}, {Authorization: `Bearer ${token}`});
      reloadTodo();
    }catch(e){}
  }
  const removeHandler = async id =>{
    try{
      await req('/api/todo/removeTodo', 'POST', {id: id}, {Authorization: `Bearer ${token}`});
      reloadTodo();
    }catch(e){}
  }
  const completeHandler = async id =>{
    try{
      await req('/api/todo/complete', 'POST', {id: id}, {Authorization: `Bearer ${token}`});
      reloadTodo();
    }
    catch(e){}
  }

  useEffect(() => {
    fetchTodos();
    return history.listen((location) => { 
      fetchTodos();
   }) 
  }, [fetchTodos,history]);

  if (loading) {}

  return (
    <div className={style.addlist}>
      <TodoAdd addTodo={addTodo}/>
      {loading ? <Loader/> : <TodoList todos={todos} removeHandler={removeHandler} completeHandler={completeHandler}/>}
    </div>)
}


