const mongoose = require("mongoose");
const EventNotes = require("../../models/events/eventNoteModel");

// Get all event notes for a specific event ID
exports.getAllEventNotes = async (req, res) => {
  try {
    const { eventId } = req.params;
    const eventNotes = await EventNotes.find({ eventId: eventId });
    if (!eventNotes) {
      return res.status(404).json({ message: "No event notes found" });
    }
    res.json(eventNotes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching event notes" });
  }
};

// Create a new event note
exports.createEventNote = async (req, res) => {
  try {
    const eventId = new mongoose.Types.ObjectId(req.params.eventId);
    const eventNote = new EventNotes({
      ...req.body,
      eventId,
      notes: { ...req.body.notes, likes: { count: 1 } },
    });
    await eventNote.save();
    res.json(eventNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating event note" });
  }
};

// Get a specific event note by ID
exports.getEventNoteById = async (req, res) => {
  try {
    const { noteId } = req.params;
    const eventNote = await EventNotes.findById(noteId);
    if (!eventNote) {
      return res.status(404).json({ message: "Event note not found" });
    }
    res.json(eventNote);
  } catch (err) {
    res.status(500).json({ message: "Error fetching event note" });
  }
};

// Update an existing event note
exports.updateEventNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const eventNote = await EventNotes.findByIdAndUpdate(noteId, req.body, {
      new: true,
    });
    if (!eventNote) {
      return res.status(404).json({ message: "Event note not found" });
    }
    res.json(eventNote);
  } catch (err) {
    res.status(500).json({ message: "Error updating event note" });
  }
};

// Delete an event note
exports.deleteEventNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    await EventNotes.findByIdAndDelete(noteId);
    res.json({ message: "Event note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting event note" });
  }
};

// Like an event note
exports.likeEventNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const eventNote = await EventNotes.findById(noteId);
    if (!eventNote) {
      return res.status(404).json({ message: "Event note not found" });
    }
    eventNote.notes.likes.count++;
    eventNote.notes.likes.users.push(req.body.userId);
    await eventNote.save({ timestamps: false });
    res.json(eventNote);
  } catch (err) {
    res.status(500).json({ message: "Error liking event note" });
  }
};

// Unlike an event note
exports.unlikeEventNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const eventNote = await EventNotes.findById(noteId);
    if (!eventNote) {
      return res.status(404).json({ message: "Event note not found" });
    }
    eventNote.notes.likes.count--;
    eventNote.notes.likes.users.pull(req.body.userId);
    await eventNote.save({ timestamps: false });
    res.json(eventNote);
  } catch (err) {
    res.status(500).json({ message: "Error unliking event note" });
  }
};

// Add a comment to an event note
exports.addCommentToEventNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const eventNote = await EventNotes.findById(noteId);
    if (!eventNote) {
      return res.status(404).json({ message: "Event note not found" });
    }
    if (!eventNote.notes.comments) {
      eventNote.notes.comments = []; // Initialize comments array if it's undefined
    }
    eventNote.notes.comments.push({
      comment: req.body.comment,
      userId: req.body.userId,
    });
    await eventNote.save({ timestamps: false });
    res.json(eventNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding comment" });
  }
};

// Delete a comment from an event note
exports.deleteCommentFromEventNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const commentId = req.params.commentId;
    const eventNote = await EventNotes.findById(noteId);
    if (!eventNote)
      return res.status(404).json({ message: "Event note not found" });
    if (!eventNote.notes.comments)
      return res.status(404).json({ message: "No comments found" });
    eventNote.notes.comments = eventNote.notes.comments.filter(
      (comment) => comment._id.toString() !== commentId.toString()
    );
    await eventNote.save();
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting comment" });
  }
};
