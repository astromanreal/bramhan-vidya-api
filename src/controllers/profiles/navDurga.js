const { default: mongoose } = require("mongoose");
const NavDurga = require("../../models/profiles/navDurgaModel"); // Adjust the path as necessary

exports.addNavDurgaProfile = async (req, res) => {
  try {
    const navDurgaData = req.body;

    if (!navDurgaData.name) {
      return res.status(400).send({
        success: false,
        message: "Name is required!",
      });
    }

    const newNavDurga = new NavDurga(navDurgaData);
    await newNavDurga.save();

    res.send({
      success: true,
      message: "Nav Durga Maa profile created successfully!",
      data: newNavDurga,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      Error: error,
      message: "Error while creating Nav Durga Maa profile!",
    });
  }
};

exports.getAllNavDurga = async (req, res) => {
  try {
    const navDurgas = await NavDurga.find();
    res.send({
      success: true,
      count: navDurgas.length,
      data: navDurgas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Nav Durga Maa profiles",
    });
  }
};

exports.getNavDurgaById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const navDurga = await NavDurga.findById(id);
    if (!navDurga) {
      return res.status(404).send({
        success: false,
        message: "No Nav Durga Maa found with this id!",
      });
    }

    navDurga.views += 1;
    await navDurga.updateOne(
      { $set: { views: navDurga.views } },
      { timestamps: false }
    );

    res.send({
      success: true,
      data: navDurga,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Nav Durga Maa profile!",
    });
  }
};

exports.updateNavDurgaProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const updatedNavDurga = await NavDurga.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedNavDurga) {
      return res.status(404).send({
        success: false,
        message: "No Nav Durga Maa found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Nav Durga Maa profile updated successfully!",
      data: updatedNavDurga,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Nav Durga Maa profile!",
    });
  }
};

exports.deleteNavDurgaProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const deletedNavDurga = await NavDurga.findByIdAndDelete(id);

    if (!deletedNavDurga) {
      return res.status(404).send({
        success: false,
        message: "No Nav Durga Maa found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Nav Durga Maa profile deleted successfully!",
      data: deletedNavDurga,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Nav Durga Maa profile!",
    });
  }
};
