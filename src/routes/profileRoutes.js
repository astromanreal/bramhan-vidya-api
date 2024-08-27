const express = require("express");
const {
  getAllRishis,
  addRishiProfile,
  getRishiById,
  updateRishiProfile,
  deleteRishiProfile,
} = require("../controllers/profiles/rishis");
const {
  getAllDemons,
  addDemonProfile,
  getDemonById,
  updateDemonProfile,
  deleteDemonProfile,
} = require("../controllers/profiles/demons");
const {
  getAllNagas,
  addNagaProfile,
  getNagaById,
  updateNagaProfile,
  deleteNagaProfile,
} = require("../controllers/profiles/nagas");
const {
  getAllGods,
  addGodProfile,
  getGodById,
  updateGodProfile,
  deleteGodProfile,
} = require("../controllers/profiles/gods");
const {
  getAllGoddesses,
  addGoddessProfile,
  getGoddessById,
  updateGoddessProfile,
  deleteGoddessProfile,
} = require("../controllers/profiles/goddesses");
const {
  getAllCelestials,
  addCelestialProfile,
  getCelestialById,
  updateCelestialProfile,
  deleteCelestialProfile,
} = require("../controllers/profiles/celestials");
const {
  getAllCreatures,
  addCreatureProfile,
  getCreatureById,
  updateCreatureProfile,
  deleteCreatureProfile,
} = require("../controllers/profiles/creatures");
const {
  getAllModernHinduCharacters,
  addModernHinduCharacter,
  getModernHinduCharacterById,
  updateModernHinduCharacter,
  deleteModernHinduCharacter,
} = require("../controllers/profiles/moderns");

const {
  getAllVanaras,
  addVanaraProfile,
  getVanaraById,
  updateVanaraProfile,
  deleteVanaraProfile,
} = require("../controllers/profiles/vanara");
const {
  getAllVishnuAvatars,
  addVishnuAvatar,
  getVishnuAvatarById,
  updateVishnuAvatar,
  deleteVishnuAvatar,
} = require("../controllers/profiles/vishnuAvatar");
const {
  getAllShivaAvatars,
  addShivaAvatar,
  getShivaAvatarById,
  updateShivaAvatar,
  deleteShivaAvatar,
} = require("../controllers/profiles/shivAvatar");
const {
  getAllMahavidyas,
  addMahavidyaProfile,
  getMahavidyaById,
  updateMahavidyaProfile,
  deleteMahavidyaProfile,
} = require("../controllers/profiles/mahavidya");
const {
  getAllNavDurga,
  addNavDurgaProfile,
  getNavDurgaById,
  updateNavDurgaProfile,
  deleteNavDurgaProfile,
} = require("../controllers/profiles/navDurga");
const {
  getAllNavagraha,
  addNavagrahaProfile,
  getNavagrahaById,
  updateNavagrahaProfile,
  deleteNavagrahaProfile,
} = require("../controllers/profiles/navagraha");
const {
  getAllShakti,
  addShaktiProfile,
  getShaktiById,
  updateShaktiProfile,
  deleteShaktiProfile,
} = require("../controllers/profiles/shakti");
const {
  getAllGaneshaAvatars,
  addGaneshaAvatar,
  getGaneshaAvatarById,
  updateGaneshaAvatar,
  deleteGaneshaAvatar,
} = require("../controllers/profiles/ganesha");
const {
  getAllRamayanaCharacters,
  addRamayanaCharacter,
  getRamayanaCharacterById,
  updateRamayanaCharacter,
  deleteRamayanaCharacter,
} = require("../controllers/profiles/ramayana");
const {
  getAllMahabharataCharacters,
  addMahabharataCharacter,
  getMahabharataCharacterById,
  updateMahabharataCharacter,
  deleteMahabharataCharacter,
} = require("../controllers/profiles/mahabharat");
const {
  getAllChiranjivis,
  addChiranjiviProfile,
  getChiranjiviById,
  updateChiranjiviProfile,
  deleteChiranjiviProfile,
} = require("../controllers/profiles/chiranjivi");

const router = express.Router();

// rishis
router.get("/allrishi", getAllRishis);
router.post("/addrishi", addRishiProfile);
router.get("/rishi/:id", getRishiById);
router.put("/rishi/:id", updateRishiProfile);
router.delete("/rishi/:id", deleteRishiProfile);

// demons
router.get("/alldemons", getAllDemons);
router.post("/adddemon", addDemonProfile);
router.get("/demon/:id", getDemonById);
router.put("/demon/:id", updateDemonProfile);
router.delete("/demon/:id", deleteDemonProfile);

// nagas
router.get("/allnaga", getAllNagas);
router.post("/addnaga", addNagaProfile);
router.get("/naga/:id", getNagaById);
router.put("/naga/:id", updateNagaProfile);
router.delete("/naga/:id", deleteNagaProfile);

// gods
router.get("/allgods", getAllGods);
router.post("/addgod", addGodProfile);
router.get("/god/:id", getGodById);
router.put("/god/:id", updateGodProfile);
router.delete("/god/:id", deleteGodProfile);

// goddess
router.get("/allgoddess", getAllGoddesses);
router.post("/addgoddess", addGoddessProfile);
router.get("/goddess/:id", getGoddessById);
router.put("/goddess/:id", updateGoddessProfile);
router.delete("/goddess/:id", deleteGoddessProfile);

// celestial being
router.get("/allcelestial", getAllCelestials);
router.post("/addcelestial", addCelestialProfile);
router.get("/celestial/:id", getCelestialById);
router.put("/celestial/:id", updateCelestialProfile);
router.delete("/celestial/:id", deleteCelestialProfile);

// creatures
router.get("/allcreatures", getAllCreatures);
router.post("/addcreature", addCreatureProfile);
router.get("/creature/:id", getCreatureById);
router.put("/creature/:id", updateCreatureProfile);
router.delete("/creature/:id", deleteCreatureProfile);

// Modern hindu
router.get("/allmodern", getAllModernHinduCharacters);
router.post("/addmodern", addModernHinduCharacter);
router.get("/modern/:id", getModernHinduCharacterById);
router.put("/modern/:id", updateModernHinduCharacter);
router.delete("/modern/:id", deleteModernHinduCharacter);

// vanara
router.get("/allvanara", getAllVanaras);
router.post("/addvanara", addVanaraProfile);
router.get("/vanara/:id", getVanaraById);
router.put("/vanara/:id", updateVanaraProfile);
router.delete("/vanara/:id", deleteVanaraProfile);

// vishnu avatar
router.get("/allvishnu", getAllVishnuAvatars);
router.post("/addvishnu", addVishnuAvatar);
router.get("/vishnu/:id", getVishnuAvatarById);
router.put("/vishnu/:id", updateVishnuAvatar);
router.delete("/vishnu/:id", deleteVishnuAvatar);

// shiv avatar
router.get("/allshiva", getAllShivaAvatars);
router.post("/addshiva", addShivaAvatar);
router.get("/shiva/:id", getShivaAvatarById);
router.put("/shiva/:id", updateShivaAvatar);
router.delete("/shiva/:id", deleteShivaAvatar);

// mahavidya
router.get("/allmahavidya", getAllMahavidyas);
router.post("/addmahavidya", addMahavidyaProfile);
router.get("/mahavidya/:id", getMahavidyaById);
router.put("/mahavidya/:id", updateMahavidyaProfile);
router.delete("/mahavidya/:id", deleteMahavidyaProfile);

// nav durga
router.get("/allnavdurga", getAllNavDurga);
router.post("/addnavdurga", addNavDurgaProfile);
router.get("/navdurga/:id", getNavDurgaById);
router.put("/navdurga/:id", updateNavDurgaProfile);
router.delete("/navdurga/:id", deleteNavDurgaProfile);

// navagraha
router.get("/allnavagraha", getAllNavagraha);
router.post("/addnavagraha", addNavagrahaProfile);
router.get("/navagraha/:id", getNavagrahaById);
router.put("/navagraha/:id", updateNavagrahaProfile);
router.delete("/navagraha/:id", deleteNavagrahaProfile);

// adipara shakti
router.get("/allshakti", getAllShakti);
router.post("/addshakti", addShaktiProfile);
router.get("/shakti/:id", getShaktiById);
router.put("/shakti/:id", updateShaktiProfile);
router.delete("/shakti/:id", deleteShaktiProfile);

// ganesha
router.get("/allganesha", getAllGaneshaAvatars);
router.post("/addganesha", addGaneshaAvatar);
router.get("/ganesha/:id", getGaneshaAvatarById);
router.put("/ganesha/:id", updateGaneshaAvatar);
router.delete("/ganesha/:id", deleteGaneshaAvatar);

// ramayana
router.get("/allramayana", getAllRamayanaCharacters);
router.post("/addramayana", addRamayanaCharacter);
router.get("/ramayana/:id", getRamayanaCharacterById);
router.put("/ramayana/:id", updateRamayanaCharacter);
router.delete("/ramayana/:id", deleteRamayanaCharacter);

// mahabharat
router.get("/allmahabharat", getAllMahabharataCharacters);
router.post("/addmahabharat", addMahabharataCharacter);
router.get("/mahabharat/:id", getMahabharataCharacterById);
router.put("/mahabharat/:id", updateMahabharataCharacter);
router.delete("/mahabharat/:id", deleteMahabharataCharacter);

// chiranjivi
router.get("/allchiranjivi", getAllChiranjivis);
router.post("/addchiranjivi", addChiranjiviProfile);
router.get("/chiranjivi/:id", getChiranjiviById);
router.put("/chiranjivi/:id", updateChiranjiviProfile);
router.delete("/chiranjivi/:id", deleteChiranjiviProfile);

module.exports = router;
