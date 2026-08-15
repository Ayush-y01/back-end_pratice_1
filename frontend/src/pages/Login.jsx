import axios from 'axios'
import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(true)

    const handleLogin = async () => {
        try {
            const {data} = await axios.post("http://localhost:3000/user/login", {
            email:email,
            password:password
        })

        localStorage.setItem("token",data.token)
        } catch (error) {
            console.log(error?.message);
            
        }finally{
            setLoading(false)
        }
    }

  return (
    <div>
        <div className='bg-white'>
            <p>email</p>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <p>password</p>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" onClick={() => handleLogin(email, password)} />
        </div>
    </div>
  )
}

export default Login