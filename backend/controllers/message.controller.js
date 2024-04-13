import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocket, io } from "../socket/socket.js";
import {uploads} from "../config/cloudinary.config.js"

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
            conversationId: conversation._id,
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

        // console.log(conversation)
        res.status(200).json(messages)
    } catch(err){
        console.log("Error in getMessages controller: ", err.message);
		res.status(500).json({ err: "Internal server error" });
    }
}

export const uploadImage = async (req, res) => {
    const {id: receiverId} = req.params;
    const senderId = req.user._id;

    try{
        // const imageName = req.file.originalname
        const imageUrl = req.file.path

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        })

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }
        

        const data= await uploads(imageUrl);
        const newMessage = new Message({
            senderId: req.user._id,
            receiverId: req.params.id,
            message: data.url,
            conversationId: conversation._id,
            isImage: true
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
        return res.status(200).json(newMessage)
    } catch(err){
        console.log("Error in uploadImage controller: ", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const readMessage = async(req,res) => {
    try {
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
        
        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        }).populate("messages")
        
        const value = conversation
        const id = value.messages[value.messages.length-1]._id

        const message = await Message.findByIdAndUpdate(id, {isRead: true},{new:true});

        if(!message) {
            return res.status(404).send({err:"No message to read"})
        }

        const newConversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        }).populate("messages")

        const receiverSocketId = getReceiverSocket(receiverId)

        if(receiverSocketId) {
            // io.to(<socketid>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("read", {
                newMessages: newConversation.messages
            })
        }

        res.status(200).json(message)
    } catch (err) {
        res.status(500).json({err: "Internal Server Error"})
    }
}