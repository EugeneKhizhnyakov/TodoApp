import React,{useState} from 'react';
import style from './navbar.module.css';
import { NavLink} from 'react-router-dom';


export const NavList = ({removeHandler,addHandler,list,hideHandler,hide,reloadTodo}) =>{
    const [todo,setTodo] = useState('');
  
    const changeHandler = event => setTodo(event.target.value);
  
    const pressHandler = async event =>{
        if (event.key === 'Enter') {
                event.preventDefault();
                addHandler(todo);
                setTodo("");
        }
    }

    return(<div>
        {hide
        ? <div>
            <p
                className={style.navp}
                onClick={hideHandler}
            >Todo <span className={style.little}>{'\u25B2'}</span></p>
                <div className={style.form}>
                    <label className={style.label}>Create new todo</label>
                    <input
                        placeholder="Enter todo's title"
                        className={style.input}
                        type="text"
                        value={todo}
                        onChange={changeHandler}
                        onKeyPress={pressHandler}
                    />
                </div>
            <div>{(!list || !list.length)
            ?<p className={style.little}>no todos yet</p>
            :list.map(item =><div key={item._id} className={style.navblock}> 
                <NavLink to={`/todo/${item._id}`} className={style.navlink}>{item.title}
                    
                </NavLink> 
                <span className={style.span} onClick={()=>removeHandler(item._id)}>x</span>
                </div>)
            }</div>
        </div>
        : <div>
            <p
                className={style.navp}
                onClick={hideHandler}
            >Todo <span className={style.little}>{'\u25BC'}</span></p>
        </div>
    }</div>)
}
