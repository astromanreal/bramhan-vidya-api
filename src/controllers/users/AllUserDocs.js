const Topic = require("../../models/topics/topicModel");
const Blog = require("../../models/blogs/blogModel");
const Event = require("../../models/events/eventModel");
const Tech = require("../../models/tech/techModel");
const Book = require("../../models/books/bookModel");

exports.getTopicDocuments = async (req, res) => {
  try {
    const userId = req.params.id;
    const topics = await Topic.find({ userId });
    res.status(200).send({
      message: "Topic documents retrieved successfully",
      data: topics,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getBlogDocuments = async (req, res) => {
  try {
    const userId = req.params.id;
    const blogs = await Blog.find({ userId });
    res.status(200).send({
      message: "Blog documents retrieved successfully",
      data: blogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getEventDocuments = async (req, res) => {
  try {
    const userId = req.params.id;
    const events = await Event.find({ userId });
    res.status(200).send({
      message: "Event documents retrieved successfully",
      data: events,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getTechDocuments = async (req, res) => {
  try {
    const userId = req.params.id;
    const techs = await Tech.find({ userId });
    res.status(200).send({
      message: "Tech documents retrieved successfully",
      data: techs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getBookDocuments = async (req, res) => {
  try {
    const userId = req.params.id;
    const books = await Book.find({ userId });
    if (!books || books.length === 0) {
      return res.status(404).send({ message: "Books not found" });
    }
    res.status(200).send({
      message: "Book documents retrieved successfully",
      data: books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
