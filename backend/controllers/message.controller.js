import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocket, io } from "../socket/socket.js";
export const sendMessage = async(req,res) => {
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        })

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })


        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }


        await Promise.all([conversation.save(), newMessage.save()])

        const receiverSocketId = getReceiverSocket(receiverId)

        if(receiverSocketId) {
            // io.to(<socketid>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)
    } catch (err) {
        res.status(500).json({err: "Internal Server Error"})
    }
}

export const getMessages = async (req, res) => {
    try{
        const {id:userToChatId} = req.params;
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]}
        }).populate("messages")

        if(!conversation) return res.status(200).json([])

        const messages = conversation.messages

        res.status(200).json(messages)
    } catch(err){
        console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
}