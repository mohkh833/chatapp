import cloudinary from "cloudinary"
import dotenv from "dotenv"
dotenv.config();
cloudinary.config({
	cloud_name: process.env.cloud_name,
	api_key: process.env.api_key,
	api_secret: process.env.api_secret
});

export const uploads = (file) => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload(
			file,
			(result) => {
				resolve({ url: result.url, id: result.public_id });
			},
			{ resource_type: 'auto' }
		);
	});
};


