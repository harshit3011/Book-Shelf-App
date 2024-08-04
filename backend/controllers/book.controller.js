import { Book } from "../models/book.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary, uploadDefaultImage } from "../utils/cloudinary.js";

// Create a new book
const createBook = asyncHandler(async (req, res) => {
    const { title, author } = req.body;
        const userId = req.user.userId; // Ensure user is authenticated

        // Validate required fields
        if (!title?.trim() || !author?.trim()) {
            return res.status(400).json({ message: "Title and author are required" });
        }

        // Handle image
        let imageUrl;
        const imageLocalPath = req.files?.image?.[0]?.path;

        if (imageLocalPath) {
            // Upload user-provided image
            const imageUploadResult = await uploadOnCloudinary(imageLocalPath);
            if (!imageUploadResult) {
                return res.status(500).json({ message: "Failed to upload book image" });
            }
            imageUrl = imageUploadResult.url;
        } else {
            // Upload default image
            imageUrl = await uploadDefaultImage();
        }

        // Create book object
        const book = new Book({
            title,
            author,
            image: imageUrl,
            bookOf: userId,
        });

        // Save book to database
        await book.save();
        await User.findByIdAndUpdate(userId, { $push: { books: book._id } });

        // Fetch created book without sensitive data
        const createdBook = await Book.findById(book._id).populate("bookOf", "username");

        if (!createdBook) {
            return res.status(500).json({ message: "Something went wrong while creating the book" });
        }

        // Return response
        return res.status(201).json({
            message: "Book created successfully",
            book: createdBook
        });
});

// Fetch books for a specific user
const getBooks = asyncHandler(async (req, res) => {
    const userId = req.user.userId; // Ensure user is authenticated

    // Fetch all books associated with the user
    const books = await Book.find({ bookOf: userId });

    // Check if books exist
    if (!books || books.length === 0) {
        return res.status(200).json(new ApiResponse(200, [], "No books found for this user"));
    }

    // Return response with books
    return res.status(200).json(
        new ApiResponse(200, books, "Books fetched successfully")
    );
});

// Delete a book
const deleteBook = asyncHandler(async (req, res) => {
    const bookId = req.params.bookId.toString();
    const userId = req.user.userId.toString(); // Ensure user is authenticated

    // Find book by ID and check if it belongs to the user
    const book = await Book.findOne({ _id: bookId, bookOf: userId });

    if (!book) {
        throw new ApiError(404, "Book not found or does not belong to the user");
    }


    // Delete book from the database
    await Book.deleteOne({ _id: bookId });

    // Remove book reference from the user's books array
    await User.findByIdAndUpdate(userId, { $pull: { books: bookId } });

    // Return response
    return res.status(200).json(
        new ApiResponse(200, null, "Book deleted successfully")
    );
});

export { createBook, getBooks, deleteBook };
