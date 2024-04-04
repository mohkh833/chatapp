import { MdOutlineCloudUpload } from 'react-icons/md';
import { useState, useRef } from 'react';
import useUploadImage from '../../hooks/useUploadImage';
const FileUploader = () => {
	const [file, setFile] = useState([]);
	const {loading, uploadImage} = useUploadImage();
	const [imgUrl, setImgUrl] = useState("")
	const ref = useRef()
	
	const cleanFileInput = () => {
		setFile([]);
		setImgUrl("");
		ref.current.value = "";
	}
	const handleUploadImage = async (e) => {
		e.preventDefault();
		if(!file) return;
		await uploadImage(file);	
		cleanFileInput();
	}

	const handleFileChange = (uploadedFile) => {
		if (uploadedFile) {
			setFile(uploadedFile);
			const imageUrl = window.URL.createObjectURL(uploadedFile);	
			setImgUrl(imageUrl)
		}
	}

	const closeDialog = () => {
		cleanFileInput();
	}
	return (
		<div>
			<label htmlFor="my_modal_6" className="cursor-pointer">
				<MdOutlineCloudUpload />
			</label>

			{/* Put this part before </body> tag */}
			<input type="checkbox" id="my_modal_6" className="modal-toggle" />
			<div className="modal" role="dialog">
				<div className="modal-box flex flex-col gap-5">
					<h3 className="font-bold text-lg">Upload Images</h3>
					<div className="flex items-center justify-center">
						<input type="file" className="file-input file-input-bordered file-input-info max-w-xs" onChange={(e) => handleFileChange(e.target.files[0])} ref={ref} />
					</div>
					<div className='flex items-center justify-center'>
						{file && <img className="max-w-xs h-15" src={imgUrl}/>}
					</div>
					<div className="flex flex-row justify-between">
						<div className="modal-action">
								<label className="btn" onClick={handleUploadImage} htmlFor="my_modal_6">
								{loading ? <div className="loading loading-spinner" /> : "upload!"}
									
								</label>
							</div>
						<div className="modal-action">
							<label htmlFor="my_modal_6" className="btn" onClick={()=>closeDialog()}>
								Close!
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FileUploader;
