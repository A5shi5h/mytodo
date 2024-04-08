"use client"
import React , { useState } from "react";

const page = () => {

  const[title , setTitle] = useState("");
  const[desc , setDesc] = useState("");
  const[mainTask , setMainTask] = useState([]);

  const submitHandler = (e) => {
   e.preventDefault();
   setMainTask([...mainTask,{title , desc}]);
   setTitle("");
   setDesc("");
   console.log(mainTask);
  }

  const deleteHandler = (index) => {
     let copyTask = [...mainTask];
     copyTask.splice(index,1);
     setMainTask(copyTask);
  }

  let renderTask = <h2>No task Available</h2>

  if(mainTask.length > 0){
      renderTask = mainTask.map((task , index) => {
        return (
          <li key={index}>
          <div className="flex justify-between items-center mb-4">
            <h1>{index+1}</h1>
            <h3 className="text-1xl font-thin">{task.title}</h3>
            <h4 className="text-1xl font-thin">{task.desc}</h4>
            <button className="bg-red-500 p-4 rounded-lg text-white"
            onClick={() => {
              deleteHandler(index)
            }}
            >Delete</button>
            <button className="bg-blue-500 p-4 rounded-lg text-white"
             onClick={() => {
              taskDoneHandler(index)
             }}
            >Mark As Done</button>
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
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                />
                <input type='text' placeholder='Enter task description' className='p-4 m-4 border-none bg-slate-200 rounded-lg'
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                />
                <button className='bg-green-500 p-3 text-white rounded-md hover:bg-green-400'>Add Task</button>
            </form>
        </div>
     <hr/>
     <div className="p-8 bg-slate-400 ">
         <ul>
           {renderTask}
         </ul>
     </div>
    </>
  )
}

export default page
