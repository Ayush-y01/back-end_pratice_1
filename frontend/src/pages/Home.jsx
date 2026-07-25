import React, { useEffect, useState } from "react";
import axios from "axios"
import {server} from "../main"

const Home = () => {
    const isAuth  = false
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState("")
    const [task, setTask] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [addTodo, setAddTodo] = useState(null)

    useEffect(() => {
        const getTodos = async () => {
        try {
            const data = await axios.get(`localhost:3000`,{
            Headers:{
                authorizations: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setData(data)            
        } catch (error) {
            setError(error)
            console.log(error?.message);
            
        }finally{
            setLoading(false)
        }
    }
    getTodos()
    },[])

    const addTodoApi = async () => {
        try {

            const {todo} = await axios.post(`${server}/todo/add`,{
                title,
                task
            },{
                Headers:{
                    authorizations:`Bearer ${localStorage.getItem("token")}`
                }
            })
            setData(todo)
            isOpen(false)
        } catch (error) {
            console.log(error?.message);
            setError(error)
            
        }finally{
            setLoading(false)
        }
    }

    const handleSubmit = (e) => {
        setTitle(e.target.value)
        setTask(e.target.value)
    }



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
                    <div className="bg-blue-100">
                        <label>Titel</label>
                        <input type="text" value={title} onChange={handleSubmit} />
                        <label>Description</label>
                        <input type="text" value={task} onChange={handleSubmit} />
                        <input type="submit" onClick={() => addTodoApi()} />
                    </div>
                ):(
                    <div>
                        <button className="bg-blue-200 rounded-lg p-1 mb-2 shadow" onClick={() => setIsOpen(true)}>Add Todo</button>
                    </div>
                )}

            </div>
                    <h2 className="font-bold bg-white shadow mb-4 text-4xl px-10 py-6 rounded-lg">Todo's</h2>

                <div className="px-10 font-semibold mt-1 bg-white shadow py-4 rounded-lg">
                    <h4>Title</h4>
                    <p>Task</p>
                    
                </div>
                <div className="px-10 font-semibold mt-1 bg-white shadow py-4 rounded-lg">
                    <h4>Title</h4>
                    <p>Task</p>
                    
                </div>
                </div>
            </div>


            </div>
        </div>
    )
}

export default Home