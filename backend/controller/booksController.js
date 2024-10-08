const BookList = require('../models/bookScheme')
const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk');
const { StatusCodes } = require('http-status-codes');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
// fetch all books
const getAllBooks = async (req, res) => {
  const result = await BookList.find({})

  res
    .status(StatusCodes.OK)
    .json({ success: true, totalHits: result.length, data: result })
}

// add new book
const postBook = async (req, res) => {
  const fileContent = fs.readFileSync(req.file.path); // Read the uploaded file

  // Configure the file upload parameters
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME, // S3 bucket name
    Key: `books/${Date.now()}_${req.file.originalname}`, // S3 key for the file
    Body: fileContent,
    ContentType: req.file.mimetype, // Ensure the content type is correct
    ACL: 'public-read', // Optional: Make the file publicly readable
  };

  // Upload the image to S3
  try {

    const uploadResult = await s3.upload(params).promise();

    // The image URL will be part of the upload result
    const imageUrl = uploadResult.Location;
    const { title, description, language, author, category } = req.body;

    let featured = req.body.featured === 'true';
    let available = req.body.available === 'true';

    const result = await BookList.create({
      title,
      description,
      language,
      author,
      category,
      featured,
      available,
      image: imageUrl, // Save the S3 image URL in the database
    });

    // Cleanup the local file after upload
    fs.unlinkSync(req.file.path);

    res.status(StatusCodes.CREATED).json({ success: true, data: result });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to upload image',
      error: error.message,
    });
  }
};


// fetch single book by ID
const getSingleBook = async (req, res) => {
  const { id: bookID } = req.params
  const result = await BookList.findById({ _id: bookID })

  if (!result) {
    return res.status(400).json({
      status: 'fail',
      message: `book with id ${bookID} doesn't exists`,
    })
  }

  res.status(StatusCodes.OK).json({ success: true, data: result })
}

// update single book detail
const patchBook = async (req, res) => {
  const { id: bookID } = req.params

  const result = await BookList.findByIdAndUpdate({ _id: bookID }, req.body, {
    // Instant Update or else 1step delay output hunxa + rechecking the validation for updated Values
    new: true,
    runValidators: true,
  })

  if (!result) {
    return res.status(400).json({
      status: 'fail',
      message: `book with id ${bookID} doesn't exists`,
    })
  }

  res.status(StatusCodes.OK).json({ success: true, data: result })
}

// delete single book by id
const deleteBook = async (req, res) => {
  const { id: bookID } = req.params;

  const book = await BookList.findById(bookID);
  if (!book) {
    return res.status(400).json({
      success: false,
      message: `Book with id ${bookID} doesn't exist`,
    });
  }

  const imageUrl = book.image;

  // Parse the image key from the S3 URL
  const imageKey = imageUrl.split('.com/')[1];

  // Delete the book from the database
  const result = await BookList.findByIdAndDelete({ _id: bookID });
  if (!result) {
    return res.status(400).json({
      status: 'fail',
      message: `book with id ${bookID} doesn't exists`,
    });
  }

  // Delete the image from S3
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: imageKey, // S3 key for the file to delete
  };

  try {
    await s3.deleteObject(params).promise();
    res.status(StatusCodes.OK).json({ status: 'success', data: null });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to delete image from S3',
      error: error.message,
    });
  }
};


module.exports = {
  getAllBooks,
  postBook,
  getSingleBook,
  patchBook,
  deleteBook,
}
