const mongoose = require("mongoose");
const AshtaVeerattaStalam = require("../../models/places/ashtaVeerattaStalamModel");

exports.addAshtaVeerattaStalam = async (req, res) => {
  try {
    const stalamData = req.body;
    const newStalam = new AshtaVeerattaStalam(stalamData);
    await newStalam.save();
    res.send({
      success: true,
      message: "Ashta Veeratta Stalam created successfully",
      data: newStalam,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: error.message || "Error while creating Ashta Veeratta Stalam",
    });
  }
};

exports.getAllAshtaVeerattaStalams = async (req, res) => {
  try {
    const stalams = await AshtaVeerattaStalam.find();
    res.send({
      success: true,
      count: stalams.length,
      data: stalams,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Ashta Veeratta Stalams",
    });
  }
};

exports.getAshtaVeerattaStalamById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const stalam = await AshtaVeerattaStalam.findById(id);
    if (!stalam) {
      return res.status(404).send({
        success: false,
        message: "No Ashta Veeratta Stalam found with this id",
      });
    }

    stalam.views += 1;
    await stalam.updateOne(
      { $set: { views: stalam.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: stalam,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Ashta Veeratta Stalam profile",
    });
  }
};

exports.updateAshtaVeerattaStalam = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const updatedStalam = await AshtaVeerattaStalam.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedStalam) {
      return res.status(404).send({
        success: false,
        message: "No Ashta Veeratta Stalam found with this id",
      });
    }
    res.send({
      success: true,
      message: "Ashta Veeratta Stalam updated successfully",
      data: updatedStalam,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Ashta Veeratta Stalam",
    });
  }
};

exports.deleteAshtaVeerattaStalam = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const deletedStalam = await AshtaVeerattaStalam.findByIdAndDelete(id);
    if (!deletedStalam) {
      return res.status(404).send({
        success: false,
        message: "No Ashta Veeratta Stalam found with this id",
      });
    }
    res.send({
      success: true,
      message: "Ashta Veeratta Stalam deleted successfully",
      data: deletedStalam,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Ashta Veeratta Stalam",
    });
  }
};
