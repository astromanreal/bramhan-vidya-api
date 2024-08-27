const mongoose = require("mongoose");
const ChakraVaishnava = require("../../models/places/chakraVaishnavaModel");

exports.addChakraVaishnava = async (req, res) => {
  try {
    const chakraData = req.body;
    const newChakra = new ChakraVaishnava(chakraData);
    await newChakra.save();
    res.send({
      success: true,
      message: "Chakra Vaishnava created successfully",
      data: newChakra,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Chakra Vaishnava",
    });
  }
};

exports.getAllChakraVaishnavas = async (req, res) => {
  try {
    const chakras = await ChakraVaishnava.find();
    res.send({
      success: true,
      count: chakras.length,
      data: chakras,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Chakra Vaishnavas",
    });
  }
};

exports.getChakraVaishnavaById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const chakra = await ChakraVaishnava.findById(id);
    if (!chakra) {
      return res.status(404).send({
        success: false,
        message: "No Chakra Vaishnava found with this id",
      });
    }
    chakra.views += 1;
    await chakra.updateOne(
      { $set: { views: chakra.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: chakra,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Chakra Vaishnava profile",
    });
  }
};

exports.updateChakraVaishnava = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const updatedChakra = await ChakraVaishnava.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedChakra) {
      return res.status(404).send({
        success: false,
        message: "No Chakra Vaishnava found with this id",
      });
    }
    res.send({
      success: true,
      message: "Chakra Vaishnava updated successfully",
      data: updatedChakra,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Chakra Vaishnava",
    });
  }
};

exports.deleteChakraVaishnava = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const deletedChakra = await ChakraVaishnava.findByIdAndDelete(id);
    if (!deletedChakra) {
      return res.status(404).send({
        success: false,
        message: "No Chakra Vaishnava found with this id",
      });
    }
    res.send({
      success: true,
      message: "Chakra Vaishnava deleted successfully",
      data: deletedChakra,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Chakra Vaishnava",
    });
  }
};
