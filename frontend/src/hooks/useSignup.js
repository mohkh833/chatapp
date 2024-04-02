import React, {useState} from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext';
const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const signup = async({fullname, username, password, confirmPassword, gender}) => {
        const success = handleInputsErrors({fullname, username, password, confirmPassword, gender})
        if(!success) return;

        setLoading(true)
        try{
            const res= await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({fullname, username, password, confirmPassword, gender})
            })

            const data = await res.json();
            
            if(res.status === 201) {
                toast.success("Account created successfully")
            } else {
                toast.error(data.error)
            }

            localStorage.setItem("chat-user", JSON.stringify(data))

            setAuthUser(data)
            
        }
        catch(err){
            
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return {loading, signup}
}

const handleInputsErrors = ({fullname, username, password, confirmPassword, gender}) => {
    if(!fullname || !username || !password || !confirmPassword || !gender) {
        toast.error('Please fill in all field')
        return false;
    }

    if(password !== confirmPassword) {
        toast.error('Passwords do not match')
        return false;
    }

    if(password.length < 6) {
        toast.error('Password must be at least 6 characters')
        return false;
    }

    return true
}

export default useSignup