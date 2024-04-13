import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext"
import useConversation from '../zustand/useConversation'


const useListenToReadMessage = () => {
    const {socket} = useSocketContext();
    const {messages,setMessages, selectedConversation, setIsRead, isRead} = useConversation();  
    useEffect(() => {

        socket?.on("read", ({newMessages}) => {

                setMessages(newMessages)

        })

        return () => {
            socket?.off("read")
        }
    }, [socket, setIsRead, isRead]);
   


    return {setIsRead, isRead }
}

 export default useListenToReadMessage

