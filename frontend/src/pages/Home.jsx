import React, { useEffect, useState } from "react";
import axios from "axios"
import server from "../main"

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
            const {data} = await axios.get(`localhost:3000`,{
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



    return (
        <div className="bg-gray-500 h-screen w-full">
            <div className="bg-emrald-500 ">
                {/* <button onClick={() => setIsOpen(!isOpen)}>Add Todo</button> */}
                {isOpen ? (
                    <div>
                        <label>Titel</label>
                        <input type="text" onChange={(e) => setTitle(e.target.value)} />
                        <label>Description</label>
                        <input type="text" onChange={(e) => setTask(e.target.value)} />
                        <input type="submit" onClick={() => addTodoApi()} />
                    </div>
                ):(
                    <div>
                        <button onClick={() => setIsOpen(true)}>Add Todo</button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Home