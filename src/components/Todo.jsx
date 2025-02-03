import { useEffect, useRef } from 'react';
import todo_icon from '../assests/todo_icon.png';
import Todoitems from './Todoitems';
import { useState } from 'react';
const Todo = () => {


    const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")):[]);

    const inputRef = useRef()

    const add = () =>{
        const inputText = inputRef.current.value.trim();
        if(inputText === ""){
            return null;
        }
        const newTodo = {
            id : Date.now(),
            text : inputText,
            isComplete : false
        }
        setTodoList((prev)=> [...prev, newTodo]);
        inputRef.current.value = "";  
    }
    const deleteToDo = (id) =>{
        setTodoList((prvToDo)=>{
            return prvToDo.filter((todo)=> todo.id !== id);
        })
    
    }

    const toggle = (id)=>{
        setTodoList((prevToDo)=>{
            return prevToDo.map((todo)=>{
                if(todo.id === id){
                    return {...todo, isComplete : !todo.isComplete}
                }
                return todo;
            })
        })
    }
useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todoList));
},[todoList])


  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
        
{/* -------- title -------- */}
    <div className='flex items-center mt-7 gap-2'>
        <img className='w-8' src={ todo_icon } alt="" />
        <h1 className='text-3xl font-semibold'>Todo-list</h1>

    </div>
    {/* -------Input text----- */}
    <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input ref = { inputRef }className='bg-transparent border-0 outline-none flex-1 h-11 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add Your Task'/>
        <button onClick= {add}className='border-none rounded-full bg-orange-600 w-32 h-11 text-white test-lg font-medium cursor-pointer'>ADD +</button>
    </div>

    {/* ----- To DO list --- */}
    <div>
        {todoList.map((item, index)=>{
            return <Todoitems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteToDo={deleteToDo} toggle={toggle}/>
        })}
    </div>
    </div>
  )
}

export default Todo