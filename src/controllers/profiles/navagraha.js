const { default: mongoose } = require("mongoose");
const Navagraha = require("../../models/profiles/navagrahaModel"); // Adjust the path as necessary

exports.addNavagrahaProfile = async (req, res) => {
  try {
    const navagrahaData = req.body;

    if (!navagrahaData.name) {
      return res.status(400).send({
        success: false,
        message: "Name is required!",
      });
    }

    const newNavagraha = new Navagraha(navagrahaData);
    await newNavagraha.save();

    res.send({
      success: true,
      message: "Navagraha profile created successfully!",
      data: newNavagraha,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      Error: error,
      message: "Error while creating Navagraha profile!",
    });
  }
};

exports.getAllNavagraha = async (req, res) => {
  try {
    const navagrahas = await Navagraha.find();
    res.send({
      success: true,
      count: navagrahas.length,
      data: navagrahas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Navagraha profiles",
    });
  }
};

exports.getNavagrahaById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const navagraha = await Navagraha.findById(id);
    if (!navagraha) {
      return res.status(404).send({
        success: false,
        message: "No Navagraha found with this id!",
      });
    }
    navagraha.views += 1;
    await navagraha.updateOne(
      { $set: { views: navagraha.views } },
      { timestamps: false }
    );

    res.send({
      success: true,
      data: navagraha,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Navagraha profile!",
    });
  }
};

exports.updateNavagrahaProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const updatedNavagraha = await Navagraha.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedNavagraha) {
      return res.status(404).send({
        success: false,
        message: "No Navagraha found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Navagraha profile updated successfully!",
      data: updatedNavagraha,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Navagraha profile!",
    });
  }
};

exports.deleteNavagrahaProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const deletedNavagraha = await Navagraha.findByIdAndDelete(id);

    if (!deletedNavagraha) {
      return res.status(404).send({
        success: false,
        message: "No Navagraha found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Navagraha profile deleted successfully!",
      data: deletedNavagraha,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Navagraha profile!",
    });
  }
};
