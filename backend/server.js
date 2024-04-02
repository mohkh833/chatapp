import express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import messageRoutes from "./routes/message.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js"
import {app, server} from "./socket/socket.js"


const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(express.json());
app.use(cookieParser())
app.use(cors())

// app.post("/" , (req, res) => {
//     res.send("hello world!");
// })

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`)
})