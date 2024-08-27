const mongoose = require("mongoose");
const Naga = require("../../models/profiles/nagaModel"); // Assuming this is the path to your Naga model

exports.addNagaProfile = async (req, res) => {
  try {
    const nagaData = req.body;

    if (!nagaData.name) {
      return res.status(400).send({
        success: false,
        message: "Name is required!",
      });
    }

    const newNaga = new Naga(nagaData);
    await newNaga.save();

    res.send({
      success: true,
      message: "Naga profile created successfully!",
      data: newNaga,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      Error: error,
      message: "Error while creating Naga profile!",
    });
  }
};

exports.getAllNagas = async (req, res) => {
  try {
    const nagas = await Naga.find();
    res.send({
      success: true,
      count: nagas.length,
      data: nagas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Nagas",
    });
  }
};

exports.getNagaById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const naga = await Naga.findById(id);
    if (!naga) {
      return res.status(404).send({
        success: false,
        message: "No Naga found with this id!",
      });
    }
    naga.views += 1;
    await naga.updateOne(
      { $set: { views: naga.views } },
      { timestamps: false }
    );

    res.send({
      success: true,
      data: naga,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Naga profile!",
    });
  }
};

exports.updateNagaProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const updatedNaga = await Naga.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedNaga) {
      return res.status(404).send({
        success: false,
        message: "No Naga found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Naga profile updated successfully!",
      data: updatedNaga,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Naga profile!",
    });
  }
};

exports.deleteNagaProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const deletedNaga = await Naga.findByIdAndDelete(id);

    if (!deletedNaga) {
      return res.status(404).send({
        success: false,
        message: "No Naga found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Naga profile deleted successfully!",
      data: deletedNaga,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Naga profile!",
    });
  }
};
