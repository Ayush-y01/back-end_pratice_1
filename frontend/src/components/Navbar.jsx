import react from "react"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
    const isAuth = true
    // const isAuth = useAuth()

    return (
        <div className="bg-gray-500 ">
            <div className="flex justify-between px-6 py-4"> 
                <h1 className="text-2xl font-bold">My Todo</h1>


                {isAuth ? (
                    <div className="flex gap-3">
                        <input className="bg-white rounded pl-2 mr-26" type="search" placeholder="Search Todo...." />
                        <h4 className="text-lg">#name</h4>
                        <img className="h-8 w-8" src="./user-icon.png" alt="##" />
                        <h3 className="border border-black rounded px-4 py-1 bg-red-200">Logout</h3>

                    </div>
                ): (
                    <div className="flex gap-3">
                        <h3 className="border border-black rounded px-4 py-1 bg-white">Login</h3>
                        <img className="h-8 w-8" src="./user-icon.png" alt="##" />

                    </div>
                )}
            </div>

        </div>
    )
}

export default Navbar