const BookModel = require('../models/bookScheme');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const { StatusCodes } = require('http-status-codes');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const updateBookImage = async (req, res) => {
  const { id: bookID } = req.params; // Book ID
  const new_imageFileLocation = req.file.path; // New image uploaded by the user
  const fileContent = fs.readFileSync(new_imageFileLocation); // Read the uploaded file

  // Configure the file upload parameters for the new image
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME, // S3 bucket name
    Key: `books/${Date.now()}_${req.file.originalname}`, // S3 key for the new image
    Body: fileContent,
    ContentType: req.file.mimetype, // Ensure the content type is correct
    ACL: 'public-read', // Optional: Make the file publicly readable
  };

  const getBookDetails = await BookModel.findById(bookID);

  if (!getBookDetails) {
    return res.status(400).json({
      status: 'fail',
      message: `Book with id ${bookID} doesn't exist`,
    });
  }

  // Old image URL from the book details
  const old_imageFileLocation = getBookDetails.image;
  console.log(old_imageFileLocation.split('.com/books/')[1])

  try {
    // Upload new image to S3
    const uploadResult = await s3.upload(params).promise();
    const newImageUrl = uploadResult.Location; // Get the new image URL from S3

    // Update the book with the new image URL
    await BookModel.findByIdAndUpdate(
      { _id: bookID },
      { image: newImageUrl },
      { new: true, runValidators: true }
    );
    
    // Delete the old image from S3
    const oldImageKey = old_imageFileLocation.split('.com/books/')[1]; // Extract the key from the old image URL
    const decodedOldImageKey = decodeURIComponent(oldImageKey);
  
    await s3.deleteObject({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: decodedOldImageKey,
    }).promise();

    // Cleanup: Delete the local file
    fs.unlink(new_imageFileLocation, (err) => {
      if (err) {
        console.error(`Error deleting local file: ${err}`);
      }
    });

    res.status(StatusCodes.OK).json({ success: true, data: { id: bookID, newImageUrl } });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to update image',
      error: error.message,
    });
  }
};

module.exports = updateBookImage;
