import React, {useContext, useState} from 'react';
import {useHttp} from '../../hooks/http.hook';
import {SignContext} from '../../context/SignContext';
import style from './todo.module.css';

export const TodoAdd = ({addTodo}) => {
    const [todo,setTodo] = useState('');
  
    const changeHandler = event => setTodo(event.target.value);
  
    const pressHandler = async event =>{
        if (event.key === 'Enter') {
                event.preventDefault();
                addTodo(todo);
                setTodo("");
        }
    }
  
    return (
        <div className={style.add}>
            <label style={style.label}>Enter your today's assignments</label>
            <br/>
            <input type="text" 
            placeholder="your doing" 
            name="todoAdd" 
            id="todoAdd"  
            className={style.input}
            value={todo}
            onChange={changeHandler}
            onKeyPress={pressHandler}/>
        </div>
    )
  }
