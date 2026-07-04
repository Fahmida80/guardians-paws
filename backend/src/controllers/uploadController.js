const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Upload single image to Cloudinary
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    // Upload to Cloudinary using stream
    const uploadStream = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'guardians-paws',
            transformation: [{ width: 800, height: 800, crop: 'limit' }],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await uploadStream();
    
    res.json({
      success: true,
      url: result.secure_url,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
};

module.exports = { uploadImage };