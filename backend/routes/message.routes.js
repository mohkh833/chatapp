import express from "express"
import {sendMessage, getMessages,uploadImage, readMessage } from "../controllers/message.controller.js"
import protectRoute from "../middleware/protectRoute.js";
import {upload} from "../config/multer.config.js"

const router = express.Router();


router.get("/:id", protectRoute, getMessages)

router.post("/send/:id", protectRoute, sendMessage);

router.post("/send-image/:id", protectRoute, upload.single("image"), uploadImage );


router.post("/read-message/:id" , protectRoute, readMessage)


export default router;