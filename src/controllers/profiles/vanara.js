const { default: mongoose } = require("mongoose");
const Vanara = require("../../models/profiles/vanarModel"); // Adjust the path as necessary

exports.addVanaraProfile = async (req, res) => {
  try {
    const vanaraData = req.body;

    if (!vanaraData.name) {
      return res.status(400).send({
        success: false,
        message: "Name is required!",
      });
    }

    const newVanara = new Vanara(vanaraData);
    await newVanara.save();

    res.send({
      success: true,
      message: "Vanara profile created successfully!",
      data: newVanara,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      Error: error,
      message: "Error while creating Vanara profile!",
    });
  }
};

exports.getAllVanaras = async (req, res) => {
  try {
    const vanaras = await Vanara.find();
    res.send({
      success: true,
      count: vanaras.length,
      data: vanaras,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Vanaras",
    });
  }
};

exports.getVanaraById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const vanara = await Vanara.findById(id);
    if (!vanara) {
      return res.status(404).send({
        success: false,
        message: "No Vanara found with this id!",
      });
    }
    vanara.views += 1;
    await vanara.updateOne(
      { $set: { views: vanara.views } },
      { timestamps: false }
    );

    res.send({
      success: true,
      data: vanara,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Vanara profile!",
    });
  }
};

exports.updateVanaraProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const updatedVanara = await Vanara.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedVanara) {
      return res.status(404).send({
        success: false,
        message: "No Vanara found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Vanara profile updated successfully!",
      data: updatedVanara,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Vanara profile!",
    });
  }
};

exports.deleteVanaraProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const deletedVanara = await Vanara.findByIdAndDelete(id);

    if (!deletedVanara) {
      return res.status(404).send({
        success: false,
        message: "No Vanara found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Vanara profile deleted successfully!",
      data: deletedVanara,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Vanara profile!",
    });
  }
};
