const { default: mongoose } = require("mongoose");
const BookNotes = require("../../models/books/bookNotesModel");

// Get all book notes for a specific book ID
exports.getAllBookNotes = async (req, res) => {
  try {
    const { bookId } = req.params;
    const bookNotes = await BookNotes.find({ bookId: bookId });
    if (!bookNotes) {
      return res.status(404).json({ message: "No book notes found" });
    }
    res.json(bookNotes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching book notes" });
  }
};

// Create a new book note
exports.createBookNote = async (req, res) => {
  try {
    const bookId = new mongoose.Types.ObjectId(req.params.bookId);
    const bookNote = new BookNotes({
      ...req.body,
      bookId,
      notes: { ...req.body.notes, likes: { count: 1 } },
    });
    await bookNote.save();
    res.json(bookNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating book note" });
  }
};

// Get a specific book note by ID
exports.getBookNoteById = async (req, res) => {
  try {
    const { noteId } = req.params;
    const bookNote = await BookNotes.findById(noteId);
    if (!bookNote) {
      return res.status(404).json({ message: "Book note not found" });
    }
    res.json(bookNote);
  } catch (err) {
    res.status(500).json({ message: "Error fetching book note" });
  }
};

// Update an existing book note
exports.updateBookNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const bookNote = await BookNotes.findByIdAndUpdate(noteId, req.body, {
      new: true,
    });
    if (!bookNote) {
      return res.status(404).json({ message: "Book note not found" });
    }
    res.json(bookNote);
  } catch (err) {
    res.status(500).json({ message: "Error updating book note" });
  }
};

// Delete a book note
exports.deleteBookNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    await BookNotes.findByIdAndDelete(noteId);
    res.json({ message: "Book note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting book note" });
  }
};

// Like a book note
exports.likeBookNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const bookNote = await BookNotes.findById(noteId);
    if (!bookNote) {
      return res.status(404).json({ message: "Book note not found" });
    }
    bookNote.notes.likes.count++;
    bookNote.notes.likes.users.push(req.body.userId);
    await bookNote.save({ timestamps: false });
    res.json(bookNote);
  } catch (err) {
    res.status(500).json({ message: "Error liking book note" });
  }
};

// Unlike a book note
exports.unlikeBookNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const bookNote = await BookNotes.findById(noteId);
    if (!bookNote) {
      return res.status(404).json({ message: "Book note not found" });
    }
    bookNote.notes.likes.count--;
    bookNote.notes.likes.users.pull(req.body.userId);
    await bookNote.save({ timestamps: false });
    res.json(bookNote);
  } catch (err) {
    res.status(500).json({ message: "Error unliking book note" });
  }
};

exports.addComment = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const bookNote = await BookNotes.findById(noteId);
    if (!bookNote) {
      return res.status(404).json({ message: "Book note not found" });
    }
    if (!bookNote.notes.comments) {
      bookNote.notes.comments = []; // Initialize comments array if it's undefined
    }
    bookNote.notes.comments.push({
      comment: req.body.comment,
      userId: req.body.userId,
    });
    await bookNote.save({ timestamps: false });
    res.json(bookNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding comment" });
  }
};

// Delete a comment from a book note
exports.deleteComment = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const commentId = req.params.commentId;
    const bookNote = await BookNotes.findById(noteId);
    if (!bookNote)
      return res.status(404).json({ message: "Book note not found" });
    if (!bookNote.notes.comments)
      return res.status(404).json({ message: "No comments found" });
    bookNote.notes.comments = bookNote.notes.comments.filter(
      (comment) => comment._id.toString() !== commentId.toString()
    );
    await bookNote.save();
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting comment" });
  }
};
