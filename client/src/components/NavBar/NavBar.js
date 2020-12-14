import React, { useContext, useState, useCallback, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { SignContext } from '../../context/SignContext';
import { useHttp } from '../../hooks/http.hook';
import {NavList} from './NavList';
import style from './navbar.module.css'

export const NavBar = () => {
    const [ hide, setHide] = useState(false);
    const [list, setList] = useState([]);
    const { loading, req } = useHttp();
    const history = useHistory()
    const sign = useContext(SignContext)

    const logoutHandler = event => {
        event.preventDefault();
        sign.logout();
        history.push('/');
    }
    const hideHandler = () => {
        setHide(prevHide => !prevHide)
    }


    const fetchTodos = useCallback(async () => {
        try {
            const { todoList } = await req('/api/todo/list', 'GET', null, { Authorization: `Bearer ${sign.token}` });
            setList(todoList);
        } catch (e) { }
    }, [sign.token, req]);

    const reloadTodo = () =>{
        fetchTodos();
    }

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const addHandler = async todo =>{
        try{
          await req('/api/todo/add', 'POST', {title: todo.trim()}, {Authorization: `Bearer ${sign.token}`});
          reloadTodo();
        }catch(e){}
      }

    const removeHandler = async id =>{
        try{
          await req('/api/todo/remove', 'POST', {id: id}, {Authorization: `Bearer ${sign.token}`});
          reloadTodo();
        }catch(e){}
      }
    if (loading) {}

    return (
        <nav className={style.sidenav}>
            <div className={style.ul}>
                <NavLink to="/" className={style.logo}>TodoList</NavLink>
                {!loading && <NavList addHandler={addHandler} removeHandler={removeHandler} hideHandler={hideHandler} hide={hide} list={list}/>}
                <a href="/" className={style.logout} onClick={logoutHandler}>Logout</a>
            </div>
        </nav>)
}