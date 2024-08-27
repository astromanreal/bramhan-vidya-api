const Event = require("../../models/events/eventModel");

exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(400).json({ message: "Event with same name already exists" });
    } else {
      res.status(500).json({ message: "Failed to create event" });
    }
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("userId", "name");
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve events" });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findById(id).populate("userId", "name");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    event.views += 1;
    await event.updateOne(
      { $set: { views: event.views } },
      { timestamps: false }
    );
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve event" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update event" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(204).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete event" });
  }
};
