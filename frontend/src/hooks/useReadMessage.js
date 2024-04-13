import { useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useReadMessage = () => {

    const {messages, setMessages, selectedConversation} = useConversation();

    const readMessage = async () => {
      
        try {
            const res = await fetch(`/api/messages/read-message/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            })
           

            const data = await res.json()
            if(data.error) throw new Error(data.error)
            
            // setMessages([...messages, data])
        } catch(err) {
            toast.error(err.message)
        } 
    }
  return {readMessage}
}

export default useReadMessage