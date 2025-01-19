import cloudinary from './cloudinaryConfig';

const testCloudinaryConnection = async () => {
    try {
        console.log(
            'Cloudinary Config:',
            process.env.CLOUDINARY_CLOUD_NAME,
            process.env.CLOUDINARY_API_KEY,
            process.env.CLOUDINARY_API_SECRET
        );
        const result = await cloudinary.api.ping();
        console.log('Cloudinary Connection Successful:', result);
    } catch (error) {
        console.error('Cloudinary Connection Failed:', error);
    }
};

testCloudinaryConnection();
