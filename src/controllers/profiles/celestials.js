const { default: mongoose } = require("mongoose");
const Celestial = require("../../models/profiles/celestialModel"); // Adjust the path as needed

// Add a new Celestial profile
exports.addCelestialProfile = async (req, res) => {
  try {
    const celestialData = req.body;

    if (!celestialData.name) {
      return res.status(400).send({
        success: false,
        message: "Name is required!",
      });
    }

    const newCelestial = new Celestial(celestialData);
    await newCelestial.save();

    res.send({
      success: true,
      message: "Celestial profile created successfully!",
      data: newCelestial,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      Error: error,
      message: "Error while creating Celestial profile!",
    });
  }
};

// Get all Celestial profiles
exports.getAllCelestials = async (req, res) => {
  try {
    const celestials = await Celestial.find();
    res.send({
      success: true,
      count: celestials.length,
      data: celestials,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Celestials",
    });
  }
};

// Get Celestial profile by ID
exports.getCelestialById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const celestial = await Celestial.findById(id);
    if (!celestial) {
      return res.status(404).send({
        success: false,
        message: "No Celestial found with this id!",
      });
    }

    celestial.views += 1;
    await celestial.updateOne(
      { $set: { views: celestial.views } },
      { timestamps: false }
    );

    res.send({
      success: true,
      data: celestial,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Celestial profile!",
    });
  }
};

// Update a Celestial profile
exports.updateCelestialProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userId;
    const updateData = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const celestial = await Celestial.findById(id);
    if (celestial.userId.toString() !== userId) {
      return res.status(403).send({
        success: false,
        message: "You are not authorized to edit this data",
      });
    }
    const updatedCelestial = await Celestial.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCelestial) {
      return res.status(404).send({
        success: false,
        message: "No Celestial found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Celestial profile updated successfully!",
      data: updatedCelestial,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Celestial profile!",
    });
  }
};

// Delete a Celestial profile
exports.deleteCelestialProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const deletedCelestial = await Celestial.findByIdAndDelete(id);

    if (!deletedCelestial) {
      return res.status(404).send({
        success: false,
        message: "No Celestial found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Celestial profile deleted successfully!",
      data: deletedCelestial,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Celestial profile!",
    });
  }
};
