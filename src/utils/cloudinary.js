import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });     
const uploadOnCloudinary = async (base64String) => {
    try {
        if (!base64String) return null;
        // Upload the base64 string to Cloudinary
        const response = await cloudinary.uploader.upload(base64String, {
            resource_type: "auto",
        });
        return response;
    } catch (error) {
        console.error("Cloudinary upload failed:", error);
        return null;
    }
}



export  {uploadOnCloudinary}

