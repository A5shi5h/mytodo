"use client"
import React , { useEffect, useState } from "react";


//function to retrieve data from local storage
const getLocalItems = () => {
  
  let tasks = localStorage.getItem("mytodos");

  if(tasks){
    return JSON.parse(tasks);
  }else{
    return [];
  }
}

const page = () => {

  const[todo , setTodo] = useState("");
  const[todos , setTodos] = useState(getLocalItems());

  //storing data in local storage  
  useEffect(() => {
    localStorage.setItem("mytodos" , JSON.stringify(todos));
  } , [todos])

  
  const submitHandler = (e) => {
   e.preventDefault();

   const newTodo = {
      id : new Date().getTime(),
      text: todo, 
      completed : false,
   }
   setTodos([...todos].concat(newTodo));
   setTodo("");
}

  const deleteHandler = (id) => {
     let copyTask = [...todos].filter((todo) => todo.id !== id)

     setTodos(copyTask);
  }

  const toggleComplete = (id) => {
      const updatedTodos = [...todos].map((todo) => {
        if(todo.id === id){
          todo.completed = !todo.completed
        }
        return todo
      })

      setTodos(updatedTodos)
  }

  let renderTask = <h2>No task Available</h2>

  if(todos.length > 0){
      renderTask = todos.map((todo) => {
        return (
          <li key={todo.id}>
          <div className="flex justify-between items-center mb-4">
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <div className="buttons">
                <button className="bg-red-500 p-4 rounded-lg text-white"
                onClick={() => {
                  deleteHandler(todo.id)
                }}
                >Delete</button>
                <label>
                    <input type="checkbox" onChange={() => {toggleComplete(todo.id)}} checked={todo.completed}
                    id="check" className="hidden"
                    />
                    <button onClick={() => {
                      toggleComplete(todo.id)
                    }} className="bg-blue-500 p-4 rounded-lg text-white ml-2">Mark As Done</button>
                </label>
            </div>
          </div> 
        </li>
        )
    })
  }

  return (
    <>
     <h1 className='text-center text-3xl p-4 font-serif bg-black text-white'>My Todo List</h1>
        <div className="flex flex-col justify-center items-center">
            <form onSubmit={submitHandler}>
                <input type='text' placeholder='Enter yout task' className='p-4 m-4 border-none bg-slate-200 rounded-lg'
                value={todo}
                onChange={(e) => {
                  setTodo(e.target.value);
                }}
                />
                <button className='bg-green-500 p-3 text-white rounded-md hover:bg-green-400'>Add Task</button>
            </form>
        </div>
     <hr/>
     <div className="p-8 bg-slate-400 ">
         <ul className="render-task">
           {renderTask}
         </ul>
     </div>
    </>
  )
}

export default page
