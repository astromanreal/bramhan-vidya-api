const PanchaBhutaSthalam = require("../../models/places/panchBhutaSthalamModel");
const mongoose = require("mongoose");

exports.addPanchaBhutaSthalam = async (req, res) => {
  try {
    const sthalamData = req.body;
    const newSthalam = new PanchaBhutaSthalam(sthalamData);
    await newSthalam.save();
    res.send({
      success: true,
      message: "Pancha Bhuta Sthalam created successfully",
      data: newSthalam,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Pancha Bhuta Sthalam",
    });
  }
};

exports.getAllPanchaBhutaSthalams = async (req, res) => {
  try {
    const sthalams = await PanchaBhutaSthalam.find();
    res.send({
      success: true,
      count: sthalams.length,
      data: sthalams,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Pancha Bhuta Sthalams",
    });
  }
};

exports.getPanchaBhutaSthalamById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const sthalam = await PanchaBhutaSthalam.findById(id);
    if (!sthalam) {
      return res.status(404).send({
        success: false,
        message: "No Pancha Bhuta Sthalam found with this id",
      });
    }
    sthalam.views += 1;
    await sthalam.updateOne(
      { $set: { views: sthalam.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: sthalam,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Pancha Bhuta Sthalam profile",
    });
  }
};

exports.updatePanchaBhutaSthalam = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const updatedSthalam = await PanchaBhutaSthalam.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedSthalam) {
      return res.status(404).send({
        success: false,
        message: "No Pancha Bhuta Sthalam found with this id",
      });
    }
    res.send({
      success: true,
      message: "Pancha Bhuta Sthalam updated successfully",
      data: updatedSthalam,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Pancha Bhuta Sthalam",
    });
  }
};

exports.deletePanchaBhutaSthalam = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const deletedSthalam = await PanchaBhutaSthalam.findByIdAndDelete(id);
    if (!deletedSthalam) {
      return res.status(404).send({
        success: false,
        message: "No Pancha Bhuta Sthalam found with this id",
      });
    }
    res.send({
      success: true,
      message: "Pancha Bhuta Sthalam deleted successfully",
      data: deletedSthalam,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Pancha Bhuta Sthalam",
    });
  }
};
