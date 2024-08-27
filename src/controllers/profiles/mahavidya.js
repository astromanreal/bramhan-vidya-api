const { default: mongoose } = require("mongoose");
const Mahavidya = require("../../models/profiles/mahavidyaModel"); // Adjust the path as necessary

exports.addMahavidyaProfile = async (req, res) => {
  try {
    const mahavidyaData = req.body;

    if (!mahavidyaData.name) {
      return res.status(400).send({
        success: false,
        message: "Name is required!",
      });
    }

    const newMahavidya = new Mahavidya(mahavidyaData);
    await newMahavidya.save();

    res.send({
      success: true,
      message: "Mahavidya profile created successfully!",
      data: newMahavidya,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      Error: error,
      message: "Error while creating Mahavidya profile!",
    });
  }
};

exports.getAllMahavidyas = async (req, res) => {
  try {
    const mahavidyas = await Mahavidya.find();
    res.send({
      success: true,
      count: mahavidyas.length,
      data: mahavidyas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Mahavidyas",
    });
  }
};

exports.getMahavidyaById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const mahavidya = await Mahavidya.findById(id);
    if (!mahavidya) {
      return res.status(404).send({
        success: false,
        message: "No Mahavidya found with this id!",
      });
    }
    mahavidya.views += 1;
    await mahavidya.updateOne(
      { $set: { views: mahavidya.views } },
      { timestamps: false }
    );

    res.send({
      success: true,
      data: mahavidya,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Mahavidya profile!",
    });
  }
};

exports.updateMahavidyaProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const updatedMahavidya = await Mahavidya.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedMahavidya) {
      return res.status(404).send({
        success: false,
        message: "No Mahavidya found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Mahavidya profile updated successfully!",
      data: updatedMahavidya,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Mahavidya profile!",
    });
  }
};

exports.deleteMahavidyaProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const deletedMahavidya = await Mahavidya.findByIdAndDelete(id);

    if (!deletedMahavidya) {
      return res.status(404).send({
        success: false,
        message: "No Mahavidya found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Mahavidya profile deleted successfully!",
      data: deletedMahavidya,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Mahavidya profile!",
    });
  }
};
