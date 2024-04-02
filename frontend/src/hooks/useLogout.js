import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
    const { setAuthUser } = useAuthContext();
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        try{
            const res= await fetch("/api/auth/logout", {
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                }
            })
            const data =await res.json()
            if(data.error) {
                throw new Error(data.error)
            }
            localStorage.removeItem("chat-user")
            setAuthUser(null)
        } catch(err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }
    return {loading, logout}
}

export default useLogout