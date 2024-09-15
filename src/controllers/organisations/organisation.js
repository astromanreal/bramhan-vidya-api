const HinduOrganisation = require("../../models/organisations/organisationModel");

exports.getAllOrganisations = async (req, res) => {
  try {
    const organisations = await HinduOrganisation.find();
    res.send({
      success: true,
      count: organisations.length,
      data: organisations,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching organisations" });
  }
};

exports.createOrganisation = async (req, res) => {
  try {
    const { organisationName } = req.body;
    const existingOrganisation = await HinduOrganisation.findOne({
      organisationName,
    });
    if (existingOrganisation) {
      return res.status(400).json({
        success: false,
        message: `Organisation with name '${organisationName}' already exists.`,
      });
    }

    const organisation = new HinduOrganisation(req.body);
    await organisation.save();
    res.status(200).send({
      success: true,
      data: organisation,
      message: "Organisation created successfully.",
    });
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error.",
        errors: err.errors,
      });
    } else {
      res.status(500).json({ message: "Error creating organisation" });
    }
  }
};

exports.getOrganisationById = async (req, res) => {
  try {
    const organisation = await HinduOrganisation.findById(req.params.id);
    if (!organisation) {
      return res.status(404).json({ message: "Organisation not found" });
    }
    organisation.views += 1;
    await organisation.updateOne(
      { $set: { views: organisation.views } },
      { timestamps: false }
    );
    res.json(organisation);
  } catch (err) {
    res.status(500).json({ message: "Error fetching organisation" });
  }
};

exports.updateOrganisation = async (req, res) => {
  try {
    const organisation = await HinduOrganisation.findById(req.params.id);
    if (!organisation) {
      return res.status(404).json({ message: "Organisation not found" });
    }
    if (req.body.userId !== organisation.userId) {
      return res.status(403).json({ message: "Unauthorized to update" });
    }

    const updatedOrganisation = await HinduOrganisation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedOrganisation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating organisation" });
  }
};

exports.deleteOrganisation = async (req, res) => {
  try {
    await HinduOrganisation.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Organisation deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting organisation" });
  }
};
