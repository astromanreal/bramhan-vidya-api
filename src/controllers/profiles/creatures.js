const { default: mongoose } = require("mongoose");
const Creature = require("../../models/profiles/creatureModel");

exports.addCreatureProfile = async (req, res) => {
  try {
    const creatureData = req.body;

    if (!creatureData.name) {
      return res.status(400).send({
        success: false,
        message: "Name is required!",
      });
    }

    const newCreature = new Creature(creatureData);
    await newCreature.save();

    res.send({
      success: true,
      message: "Creature profile created successfully!",
      data: newCreature,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      Error: error,
      message: "Error while creating Creature profile!",
    });
  }
};

exports.getAllCreatures = async (req, res) => {
  try {
    const creatures = await Creature.find();
    res.send({
      success: true,
      count: creatures.length,
      data: creatures,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Creatures",
    });
  }
};

exports.getCreatureById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const creature = await Creature.findById(id);
    if (!creature) {
      return res.status(404).send({
        success: false,
        message: "No Creature found with this id!",
      });
    }
    creature.views += 1;
    await creature.updateOne(
      { $set: { views: creature.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: creature,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Creature profile!",
    });
  }
};

exports.updateCreatureProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const updatedCreature = await Creature.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCreature) {
      return res.status(404).send({
        success: false,
        message: "No Creature found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Creature profile updated successfully!",
      data: updatedCreature,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Creature profile!",
    });
  }
};

exports.deleteCreatureProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const deletedCreature = await Creature.findByIdAndDelete(id);

    if (!deletedCreature) {
      return res.status(404).send({
        success: false,
        message: "No Creature found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Creature profile deleted successfully!",
      data: deletedCreature,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Creature profile!",
    });
  }
};
