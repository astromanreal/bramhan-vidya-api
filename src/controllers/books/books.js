const Book = require("../../models/books/bookModel");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("userId");
    res.send({
      status: "success",
      count: books.length,
      data: books,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching books" });
  }
};

exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.send({
      success: true,
      data: book,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating book" });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("userId");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    book.views += 1;
    await book.updateOne(
      { $set: { views: book.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: book,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching book" });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId.toString() !== req.body.userId) {
      return res.status(403).send({
        success: false,
        message: "You are not authorized to edit this data",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: "Error updating book" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting book" });
  }
};
