const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Upload image/video to Cloudinary
const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    console.log('File size:', req.file.size);
    console.log('File type:', req.file.mimetype);

    // Determine resource type based on file mimetype
    let resourceType = 'image'; // default
    if (req.file.mimetype.startsWith('video/')) {
      resourceType = 'video';
    }

    // Upload to Cloudinary
    const uploadStream = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'guardians-paws',
            resource_type: resourceType,
            transformation: [
              { width: 800, height: 800, crop: 'limit' },
              { quality: 'auto' }
            ],
            timeout: 120000 // 120 seconds
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary error:', error);
              reject(error);
            } else {
              resolve(result);
            }
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
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Upload failed' 
    });
  }
};

module.exports = { uploadMedia };