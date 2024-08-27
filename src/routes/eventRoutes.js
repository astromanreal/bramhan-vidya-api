const express = require("express");
const {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/events/events");
const {
  getAllEventNotes,
  createEventNote,
  getEventNoteById,
  updateEventNote,
  deleteEventNote,
  likeEventNote,
  unlikeEventNote,
  addCommentToEventNote,
  deleteCommentFromEventNote,
} = require("../controllers/events/eventNotes");
const router = express.Router();

router.get("/allevents", getAllEvents);
router.post("/addevent", createEvent);
router.get("/event/:id", getEventById);
router.put("/event/:id", updateEvent);
router.delete("/event/:id", deleteEvent);

// notes and event
router.get("/:eventId/allnotes", getAllEventNotes);
router.post("/:eventId/addnote", createEventNote);

// note only
router.get("/note/:noteId", getEventNoteById);
router.put("/note/:noteId", updateEventNote);
router.delete("/note/:noteId", deleteEventNote);

// note like nad comments
router.put("/note/:noteId/like", likeEventNote);
router.put("/note/:noteId/unlike", unlikeEventNote);
router.post("/note/:noteId/comment", addCommentToEventNote);
router.delete("/note/:noteId/comment/:commentId", deleteCommentFromEventNote);

module.exports = router;
