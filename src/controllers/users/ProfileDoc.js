const models = [
  require("../../models/profiles/celestialModel"),
  require("../../models/profiles/chiranjiviModel"),
  require("../../models/profiles/creatureModel"),
  require("../../models/profiles/demonModel"),
  require("../../models/profiles/ganeshaModel"),
  require("../../models/profiles/godModel"),
  require("../../models/profiles/goddessModel"),
  require("../../models/profiles/mahabharatModel"),
  require("../../models/profiles/mahavidyaModel"),
  require("../../models/profiles/modernModel"),
  require("../../models/profiles/nagaModel"),
  require("../../models/profiles/navDurgaModel"),
  require("../../models/profiles/navagrahaModel"),
  require("../../models/profiles/ramayanaModel"),
  require("../../models/profiles/rishiModel"),
  require("../../models/profiles/shaktiModel"),
  require("../../models/profiles/shivAvatarModel"),
  require("../../models/profiles/vanarModel"),
  require("../../models/profiles/vishnuAvatarModel"),
];

exports.getProfileDocumentsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const documents = [];

    for (const model of models) {
      const docs = await model.find({ userId });
      documents.push(...docs);
    }
    res.send({
      success: true,
      count: documents.length,
      data: documents,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving documents" });
  }
};

exports.getProfileFeed = async (req, res) => {
  try {
    const { page = 1, limit = 2 } = req.query;
    const profiles = [];

    // Fetch profiles from each model
    for (const model of models) {
      const docs = await model
        .find()
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .lean();
      profiles.push(...docs);
    }

    profiles.sort(() => Math.random() - 0.5);

    res.json({ success: true, data: profiles });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch profiles" });
  }
};
