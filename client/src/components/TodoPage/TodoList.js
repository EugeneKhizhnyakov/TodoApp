import React from 'react';
import style from './todo.module.css';

export const TodoList = ({todos, removeHandler, completeHandler}) =>{
    if ( !todos || !todos.length) {
        return <p className={style.list}>no todos yet</p>
    }
    else{
    let mapTodo = todos.map(todo => <div className={style.list} key={todo._id}>
        <p className={todo.completed?style.itemLined:style.item}>{todo.title}</p>
        <button className={style.delete} onClick={()=>removeHandler(todo._id)}>x</button>
        <button className={style.comp} onClick={()=>completeHandler(todo._id)}>complete</button>

        <div className={style.line} ><span></span></div>
      </div>)
    
    return <div>{mapTodo}</div> }


}