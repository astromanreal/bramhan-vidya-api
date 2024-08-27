const PancharamaKshetra = require("../../models/places/pancharamaKshetraModel");
const mongoose = require("mongoose");

exports.addPancharamaKshetra = async (req, res) => {
  try {
    const kshetraData = req.body;
    const newKshetra = new PancharamaKshetra(kshetraData);
    await newKshetra.save();
    res.send({
      success: true,
      message: "Pancharama Kshetra created successfully",
      data: newKshetra,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Pancharama Kshetra",
    });
  }
};

exports.getAllPancharamaKshetras = async (req, res) => {
  try {
    const kshetras = await PancharamaKshetra.find();
    res.send({
      success: true,
      count: kshetras.length,
      data: kshetras,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Pancharama Kshetras",
    });
  }
};

exports.getPancharamaKshetraById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const kshetra = await PancharamaKshetra.findById(id);
    if (!kshetra) {
      return res.status(404).send({
        success: false,
        message: "No Pancharama Kshetra found with this id",
      });
    }
    kshetra.views += 1;
    await kshetra.updateOne(
      { $set: { views: kshetra.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: kshetra,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Pancharama Kshetra profile",
    });
  }
};

exports.updatePancharamaKshetra = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const updatedKshetra = await PancharamaKshetra.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedKshetra) {
      return res.status(404).send({
        success: false,
        message: "No Pancharama Kshetra found with this id",
      });
    }
    res.send({
      success: true,
      message: "Pancharama Kshetra updated successfully",
      data: updatedKshetra,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Pancharama Kshetra",
    });
  }
};

exports.deletePancharamaKshetra = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const deletedKshetra = await PancharamaKshetra.findByIdAndDelete(id);
    if (!deletedKshetra) {
      return res.status(404).send({
        success: false,
        message: "No Pancharama Kshetra found with this id",
      });
    }
    res.send({
      success: true,
      message: "Pancharama Kshetra deleted successfully",
      data: deletedKshetra,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Pancharama Kshetra",
    });
  }
};
