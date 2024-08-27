const NatchatharaTemple = require("../../models/places/natchatharaModel");
const mongoose = require("mongoose");

exports.addNatchatharaTemple = async (req, res) => {
  try {
    const templeData = req.body;
    const newTemple = new NatchatharaTemple(templeData);
    await newTemple.save();
    res.send({
      success: true,
      message: "Natchathara Temple created successfully",
      data: newTemple,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Natchathara Temple",
    });
  }
};

exports.getAllNatchatharaTemples = async (req, res) => {
  try {
    const temples = await NatchatharaTemple.find();
    res.send({
      success: true,
      count: temples.length,
      data: temples,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Natchathara Temples",
    });
  }
};

exports.getNatchatharaTempleById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const temple = await NatchatharaTemple.findById(id);
    if (!temple) {
      return res.status(404).send({
        success: false,
        message: "No Natchathara Temple found with this id",
      });
    }
    temple.views += 1;
    await temple.updateOne(
      { $set: { views: temple.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: temple,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Natchathara Temple profile",
    });
  }
};

exports.updateNatchatharaTemple = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const updatedTemple = await NatchatharaTemple.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedTemple) {
      return res.status(404).send({
        success: false,
        message: "No Natchathara Temple found with this id",
      });
    }
    res.send({
      success: true,
      message: "Natchathara Temple updated successfully",
      data: updatedTemple,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Natchathara Temple",
    });
  }
};

exports.deleteNatchatharaTemple = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const deletedTemple = await NatchatharaTemple.findByIdAndDelete(id);
    if (!deletedTemple) {
      return res.status(404).send({
        success: false,
        message: "No Natchathara Temple found with this id",
      });
    }
    res.send({
      success: true,
      message: "Natchathara Temple deleted successfully",
      data: deletedTemple,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Natchathara Temple",
    });
  }
};
