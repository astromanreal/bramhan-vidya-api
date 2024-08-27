const express = require("express");
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/books/books");
const {
  getAllBookNotes,
  createBookNote,
  getBookNoteById,
  updateBookNote,
  deleteBookNote,
  likeBookNote,
  unlikeBookNote,
  addComment,
  deleteComment,
} = require("../controllers/books/bookNotes");

const router = express.Router();

// books
router.get("/allbooks", getAllBooks);
router.post("/addbook", createBook);
router.get("/book/:id", getBookById);
router.put("/book/:id", updateBook);
router.delete("/book/:id", deleteBook);

// notes and books
router.get("/:bookId/allnotes", getAllBookNotes);
router.post("/:bookId/addnotes", createBookNote);

// note
router.get("/note/:noteId", getBookNoteById);
router.put("/note/:noteId", updateBookNote);
router.delete("/note/:noteId", deleteBookNote);

// like and comments
router.put("/note/:noteId/like", likeBookNote);
router.put("/note/:noteId/unlike", unlikeBookNote);
router.post("/note/:noteId/comment", addComment);
router.delete("/note/:noteId/comment/:commentId", deleteComment);

module.exports = router;
