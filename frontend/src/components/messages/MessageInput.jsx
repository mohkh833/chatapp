import { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import { MdEmojiEmotions } from "react-icons/md";

import useSendMessage from '../../hooks/useSendMessage';
import FileUploader from './FileUploader';

import EmojiPicker from 'emoji-picker-react';


const MessageInput = () => {
	const [ message, setMessage ] = useState('');
	const { loading, sendMessage } = useSendMessage();
	const [showPicker, setShowPicker] = useState(false);
	const [inputStr, setInputStr] = useState("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		setMessage(message)
		await sendMessage(message);
		setMessage('');
	};

	const onEmojiClick = (event, emojiObject) => {
        setMessage((prevInput) => prevInput + event.emoji)
        setShowPicker(false)
    }

	return (
		<form className="px-4 my-3" onSubmit={handleSubmit}>
			<div className="w-full relative">
				<input
					type="text"
					className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
					placeholder="Send a message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<div className="absolute inset-y-0 end-0 flex items-center pe-3 gap-3">
					{/* <EmojiPicker /> */}
					<MdEmojiEmotions  className="cursor-pointer ml-5" onClick={() => setShowPicker(!showPicker)}/>
					
					
					<FileUploader />
					<button type="submit">{loading ? <div className="loading loading-spinner" /> : <BsSend />}</button>
				</div>
			</div>
			{showPicker && (
						<div className="flex justify-center items-center p-5">
						{showPicker && (
							<div>
								<EmojiPicker onEmojiClick={onEmojiClick} searchDisabled theme="dark" skinTonesDisabled />
							</div>
						)}
						<div />
					</div>
			)}	
			
		</form>

		
	);
};
export default MessageInput;
