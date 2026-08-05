import React, { useEffect, useState } from "react";
import axios from "axios"
import {server} from "../main"
import { FaPen, FaTrash } from "react-icons/fa";
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const Home = () => {
    const {isAuth} = useAuth()
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState("")
    const [task, setTask] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [addTodo, setAddTodo] = useState(null)
    const [isCheck, setIsCheck ] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const { id } = useParams()

    const handletoggle = () => setIsCheck(!isCheck);    

    useEffect(() => {
        const getTodos = async () => {
        try {
            const {data} = await axios.get(`${server}/todo/get`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setData(data.todos)            
        } catch (error) {
            setError(error)
            console.log(error?.message); 
            
        }finally{
            setLoading(false)
        }
    }
    getTodos()
    },[])

    const addTodoApi = async (title, task) => {
        try {

            const {data} = await axios.post(`http://localhost:3000/todo/add`,{
                title:title,
                task:task
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            setData(data.todos)
            isOpen(false)
            
        } catch (error) {
            console.log(error?.message);
            setError(error)
            
        }finally{
            setLoading(false)
        }
    }


    const updateTodo = async () => {
        
        try {
            const {data} = await axios.put(`${server}/todo/edit/:${id}`,{
                title: title,
                task:task
            }, {
                headers: {
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            setData(data)
            isEditing(false)
        } catch (error) {
           console.log(error?.message);
            setError(error)
            
        }finally{
            setLoading(false)
        }
    }
    
    const deletTodo = async () => {
        
        try {
            const {data} = await axios.delete(`${server}/todo/edit/:${id}`, {
                 headers: {
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            setData(data)
            isEditing(false)
        } catch (error) {
           console.log(error?.message);
            setError(error)
            
        }finally{
            setLoading(false)
        }
    }



    // const handleSubmit = (e) => {
    //     setTitle(e.target.value)
    //     setTask(e.target.value)
    // }



    return (
        <div className="bg-gray-500 h-screen w-full">
            {/* <div className="bg-green-100 "> */}
                {/* <button onClick={() => setIsOpen(!isOpen)}>Add Todo</button> */}
                {/* {isOpen ? (
                    <div>
                        <label>Titel</label>
                        <input type="text" value={title} onChange={handleSubmit} />
                        <label>Description</label>
                        <input type="text" value={task} onChange={handleSubmit} />
                        <input type="submit" onClick={() => addTodoApi()} />
                    </div>
                ):(
                    <div>
                        <button onClick={() => setIsOpen(true)}>Add Todo</button>
                    </div>
                )} */}

            {/* </div> */}

            <div className="min-h-screen w-full flex items-center justify-center bg-gray-400">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-md">
                <div className=" rounded">
                    <div className="justify-end flex ">
                {isOpen ? (
                    <div className="bg-gray-200 rounded mb-4 ">
                        <div className="flex justify-end">
                            <button className=" font-semibold px-3 text-red-500" onClick={() => setIsOpen(false)}>x</button>
                        </div>
                        <div className="p-8">
                            <label className="px-9">Titel</label>
                        <input type="text" className="bg-white rounded mb-2" value={title} onChange={((e) => setTitle(e.target.value) )} />
                        <label className="px-2">Description</label>
                        <textarea className="bg-white rounded px-4" type="text" value={task} onChange={((e) => setTask(e.target.value))} ></textarea>
                        <input type="submit" className="ml-66 mt-2 justify-end px-2 bg-blue-500 text-white p-1 rounded" onClick={ () => addTodoApi(title, task)} />
                        </div>
                    </div>
                 ):( 
                   <div> 
                         <button className="bg-blue-500 text-white rounded-lg px-2 py-1 mb-2 shadow" onClick={() => setIsOpen(true)}>Add Todo</button> 
                     </div> 
                 )} 

            </div>
                    <h2 className="font-bold bg-white shadow mb-4 text-4xl px-10 py-6 rounded-lg">Todo's</h2>

                 {isEditing ? (
                    <div className="px-10 font-semibold mt-1 bg-white shadow py-4 rounded-lg">
                    <div className="flex justify-between py-2">
                        <p>title</p>
                        <input type="text" className="bg-gray-100" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <p>task</p>
                    <input type="text" className="bg-gray-100" value={task} onChange={(e) => setTask(e.target.value)} />
                </div>
                 ) : (
                   

<div className="px-10 font-semibold mt-1 bg-white shadow py-4 rounded-lg">
                    <div className="flex justify-between py-2">
                        <h4>{title}</h4>
                        {isEditing ? (
                                <button className="bg-gray-100" onClick={updateTodo}>Save</button>
                        ) : (
                            <div className="flex gap-4 items-center">
                            <FaPen onClick={() => setIsEditing(true)} className="" />
                            <FaTrash />
                           {isCheck ? (
        <MdCheckBox color="#007bff" />
      ) : (
        <MdCheckBoxOutlineBlank color="#6c757d" />
      )}
                        </div>
                        )}
                    </div>
                    <p>Task</p>
                </div>
                 ) }


                
                </div>
            </div>


            </div>
        </div>
    )
}

export default Home






{/* <div className="px-10 font-semibold mt-1 bg-white shadow py-4 rounded-lg">
                    <div className="flex justify-between py-2">
                        <h4>Title</h4>
                        <div className="flex gap-4 items-center">
                            <FaPen className="" />
                            <FaTrash />
                           {isCheck ? (
        <MdCheckBox color="#007bff" />
      ) : (
        <MdCheckBoxOutlineBlank color="#6c757d" />
      )}
                        </div>
                    </div>
                    <p>Task</p>
                </div> */}