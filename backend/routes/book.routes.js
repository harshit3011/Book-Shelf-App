import express from "express";
import { createBook, getBooks, deleteBook } from "../controllers/book.controller.js";
import authenticate from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Create a book
router.post('/create', authenticate, upload.fields([
    {
        name: "image",
        maxCount: 1
    }
]), createBook);

// Get all books for the logged-in user
router.get('/getbooks', authenticate, getBooks);

// Delete a book
router.delete('/:bookId', authenticate, deleteBook);

export default router;
