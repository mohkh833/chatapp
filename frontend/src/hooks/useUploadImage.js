import { useState } from 'react';
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';
const useUploadImage = () => {
	const [ loading, setLoading ] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
	const uploadImage = async (file) => {
        
		if (!file) return;
		setLoading(true);
        const formData = new FormData();
		formData.append('image', file);
		try {
        
			const res = await fetch(`/api/messages/send-image/${selectedConversation._id}`, {
				method: 'POST',
				body: formData
			});

			const data = await res.json();
            console.log(data)
			if (data.error) throw new Error(data.error);

			setMessages([ ...messages, data ]);
            toast.success('Image uploaded successfully');
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};
	return { uploadImage, loading };
};

export default useUploadImage;
