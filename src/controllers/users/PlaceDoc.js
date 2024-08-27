const models = [
  require("../../models/places/ashtaVeerattaStalamModel"),
  require("../../models/places/ashtavinayakaModel"),
  require("../../models/places/chakraVaishnavaModel"),
  require("../../models/places/charDhamModel"),
  require("../../models/places/chotaCharDhamModel"),
  require("../../models/places/divyaDesamModel"),
  require("../../models/places/jyotrilingaModel"),
  require("../../models/places/mahaShaktiPithaModel"),
  require("../../models/places/natchatharaModel"),
  require("../../models/places/navagrahaTempleModel"),
  require("../../models/places/panchBhutaSthalamModel"),
  require("../../models/places/panchKedarModel"),
  require("../../models/places/panchPrayagModel"),
  require("../../models/places/panchaSabhiModel"),
  require("../../models/places/pancharamaKshetraModel"),
  require("../../models/places/parasuramaShivaModel"),
  require("../../models/places/saptpuriModel"),
  require("../../models/places/shaktiPeethModel"),
  require("../../models/places/swayambhuVishnuModel"),
];

exports.getPlaceDocumentsByUserId = async (req, res) => {
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
exports.getPlaceFeed = async (req, res) => {
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
