const express = require("express");

const {
  getAllAshtaVeerattaStalams,
  addAshtaVeerattaStalam,
  getAshtaVeerattaStalamById,
  updateAshtaVeerattaStalam,
  deleteAshtaVeerattaStalam,
} = require("../controllers/places/ashtaVeerattaStalam");

const {
  getAllAshtavinayakas,
  addAshtavinayaka,
  getAshtavinayakaById,
  updateAshtavinayaka,
  deleteAshtavinayaka,
} = require("../controllers/places/ashtavinayaka");
const {
  getAllChakraVaishnavas,
  addChakraVaishnava,
  getChakraVaishnavaById,
  updateChakraVaishnava,
  deleteChakraVaishnava,
} = require("../controllers/places/chakraVaishnava");
const {
  getAllCharDhams,
  addCharDham,
  getCharDhamById,
  updateCharDham,
  deleteCharDham,
} = require("../controllers/places/charDham");
const {
  getAllChotaCharDhams,
  addChotaCharDham,
  getChotaCharDhamById,
  updateChotaCharDham,
  deleteChotaCharDham,
} = require("../controllers/places/chotaCharDham");
const {
  getAllDivyaDesams,
  addDivyaDesam,
  getDivyaDesamById,
  updateDivyaDesam,
  deleteDivyaDesam,
} = require("../controllers/places/divyaDesam");
const {
  getAllJyotirlingas,
  addJyotirlinga,
  getJyotirlingaById,
  updateJyotirlinga,
  deleteJyotirlinga,
} = require("../controllers/places/jyotrilinga");
const {
  getAllMahaShaktiPithas,
  addMahaShaktiPitha,
  getMahaShaktiPithaById,
  updateMahaShaktiPitha,
  deleteMahaShaktiPitha,
} = require("../controllers/places/mahaShaktiPitha");
const {
  getAllNatchatharaTemples,
  addNatchatharaTemple,
  getNatchatharaTempleById,
  updateNatchatharaTemple,
  deleteNatchatharaTemple,
} = require("../controllers/places/natchathara");
const {
  getAllNavagrahaTemples,
  addNavagrahaTemple,
  getNavagrahaTempleById,
  updateNavagrahaTemple,
  deleteNavagrahaTemple,
} = require("../controllers/places/navagrahaTemple");
const {
  getAllPancharamaKshetras,
  addPancharamaKshetra,
  getPancharamaKshetraById,
  updatePancharamaKshetra,
  deletePancharamaKshetra,
} = require("../controllers/places/pancharamaKshetra");
const {
  getAllPanchaSabhai,
  addPanchaSabhai,
  getPanchaSabhaiById,
  updatePanchaSabhai,
  deletePanchaSabhai,
} = require("../controllers/places/panchaSabhi");
const {
  getAllPanchaBhutaSthalams,
  addPanchaBhutaSthalam,
  getPanchaBhutaSthalamById,
  updatePanchaBhutaSthalam,
  deletePanchaBhutaSthalam,
} = require("../controllers/places/panchBhutaSthalam");
const {
  getAllPanchKedars,
  addPanchKedar,
  getPanchKedarById,
  updatePanchKedar,
  deletePanchKedar,
} = require("../controllers/places/panchKedar");
const {
  deletePanchPrayag,
  getAllPanchPrayags,
  addPanchPrayag,
  getPanchPrayagById,
  updatePanchPrayag,
} = require("../controllers/places/panchPrayag");
const {
  getAllParasuramaShivas,
  addParasuramaShiva,
  getParasuramaShivaById,
  updateParasuramaShiva,
  deleteParasuramaShiva,
} = require("../controllers/places/parasuramaShiva");
const {
  deleteSaptpuri,
  updateSaptpuri,
  getSaptpuriById,
  addSaptpuri,
  getAllSaptpuris,
} = require("../controllers/places/saptpuri");
const {
  getAllShaktiPeeths,
  addShaktiPeeth,
  getShaktiPeethById,
  updateShaktiPeeth,
  deleteShaktiPeeth,
} = require("../controllers/places/shaktiPeeth");
const {
  getAllSwayambhuVishnus,
  addSwayambhuVishnu,
  getSwayambhuVishnuById,
  updateSwayambhuVishnu,
  deleteSwayambhuVishnu,
} = require("../controllers/places/swayambhuVishnu");

const router = express.Router();

// AshtaVeerattaStalam
router.get("/allAshtaVeerattaSthalam", getAllAshtaVeerattaStalams);
router.post("/addAshtaVeerattaSthalam", addAshtaVeerattaStalam);
router.get("/AshtaVeerattaSthalam/:id", getAshtaVeerattaStalamById);
router.put("/AshtaVeerattaSthalam/:id", updateAshtaVeerattaStalam);
router.delete("/AshtaVeerattaSthalam/:id", deleteAshtaVeerattaStalam);

// Ashtavinayaka
router.get("/allAshtavinayaka", getAllAshtavinayakas);
router.post("/addAshtavinayaka", addAshtavinayaka);
router.get("/Ashtavinayaka/:id", getAshtavinayakaById);
router.put("/Ashtavinayaka/:id", updateAshtavinayaka);
router.delete("/Ashtavinayaka/:id", deleteAshtavinayaka);

// ChakraVaishnava
router.get("/allChakraVaishnava", getAllChakraVaishnavas);
router.post("/addChakraVaishnava", addChakraVaishnava);
router.get("/ChakraVaishnava/:id", getChakraVaishnavaById);
router.put("/ChakraVaishnava/:id", updateChakraVaishnava);
router.delete("/ChakraVaishnava/:id", deleteChakraVaishnava);

// CharDham
router.get("/allCharDham", getAllCharDhams);
router.post("/addCharDham", addCharDham);
router.get("/CharDham/:id", getCharDhamById);
router.put("/CharDham/:id", updateCharDham);
router.delete("/CharDham/:id", deleteCharDham);

// ChotaCharDham
router.get("/allChotaCharDham", getAllChotaCharDhams);
router.post("/addChotaCharDham", addChotaCharDham);
router.get("/ChotaCharDham/:id", getChotaCharDhamById);
router.put("/ChotaCharDham/:id", updateChotaCharDham);
router.delete("/ChotaCharDham/:id", deleteChotaCharDham);

// DivyaDesam
router.get("/allDivyaDesam", getAllDivyaDesams);
router.post("/addDivyaDesam", addDivyaDesam);
router.get("/DivyaDesam/:id", getDivyaDesamById);
router.put("/DivyaDesam/:id", updateDivyaDesam);
router.delete("/DivyaDesam/:id", deleteDivyaDesam);

// Jyotirlinga
router.get("/allJyotirlinga", getAllJyotirlingas);
router.post("/addJyotirlinga", addJyotirlinga);
router.get("/Jyotirlinga/:id", getJyotirlingaById);
router.put("/Jyotirlinga/:id", updateJyotirlinga);
router.delete("/Jyotirlinga/:id", deleteJyotirlinga);

// MahaShaktiPitha
router.get("/allMahaShaktiPitha", getAllMahaShaktiPithas);
router.post("/addMahaShaktiPitha", addMahaShaktiPitha);
router.get("/MahaShaktiPitha/:id", getMahaShaktiPithaById);
router.put("/MahaShaktiPitha/:id", updateMahaShaktiPitha);
router.delete("/MahaShaktiPitha/:id", deleteMahaShaktiPitha);

// NatchatharaTemple
router.get("/allNatchatharaTemple", getAllNatchatharaTemples);
router.post("/addNatchatharaTemple", addNatchatharaTemple);
router.get("/NatchatharaTemple/:id", getNatchatharaTempleById);
router.put("/NatchatharaTemple/:id", updateNatchatharaTemple);
router.delete("/NatchatharaTemple/:id", deleteNatchatharaTemple);

// NavagrahaTemple
router.get("/allNavagrahaTemple", getAllNavagrahaTemples);
router.post("/addNavagrahaTemple", addNavagrahaTemple);
router.get("/NavagrahaTemple/:id", getNavagrahaTempleById);
router.put("/NavagrahaTemple/:id", updateNavagrahaTemple);
router.delete("/NavagrahaTemple/:id", deleteNavagrahaTemple);

// PancharamaKshetra
router.get("/allPancharamaKshetra", getAllPancharamaKshetras);
router.post("/addPancharamaKshetra", addPancharamaKshetra);
router.get("/PancharamaKshetra/:id", getPancharamaKshetraById);
router.put("/PancharamaKshetra/:id", updatePancharamaKshetra);
router.delete("/PancharamaKshetra/:id", deletePancharamaKshetra);

// PanchaSabhai
router.get("/allPanchaSabhai", getAllPanchaSabhai);
router.post("/addPanchaSabhai", addPanchaSabhai);
router.get("/PanchaSabhai/:id", getPanchaSabhaiById);
router.put("/PanchaSabhai/:id", updatePanchaSabhai);
router.delete("/PanchaSabhai/:id", deletePanchaSabhai);

// PanchaBhutaSthalam
router.get("/allPanchaBhutaSthalam", getAllPanchaBhutaSthalams);
router.post("/addPanchaBhutaSthalam", addPanchaBhutaSthalam);
router.get("/PanchaBhutaSthalam/:id", getPanchaBhutaSthalamById);
router.put("/PanchaBhutaSthalam/:id", updatePanchaBhutaSthalam);
router.delete("/PanchaBhutaSthalam/:id", deletePanchaBhutaSthalam);

// PanchKedar
router.get("/allPanchKedar", getAllPanchKedars);
router.post("/addPanchKedar", addPanchKedar);
router.get("/PanchKedar/:id", getPanchKedarById);
router.put("/PanchKedar/:id", updatePanchKedar);
router.delete("/PanchKedar/:id", deletePanchKedar);

// PanchPrayag
router.get("/allPanchPrayag", getAllPanchPrayags);
router.post("/addPanchPrayag", addPanchPrayag);
router.get("/PanchPrayag/:id", getPanchPrayagById);
router.put("/PanchPrayag/:id", updatePanchPrayag);
router.delete("/PanchPrayag/:id", deletePanchPrayag);

// ParasuramaShiva
router.get("/allParasuramaShiva", getAllParasuramaShivas);
router.post("/addParasuramaShiva", addParasuramaShiva);
router.get("/ParasuramaShiva/:id", getParasuramaShivaById);
router.put("/ParasuramaShiva/:id", updateParasuramaShiva);
router.delete("/ParasuramaShiva/:id", deleteParasuramaShiva);

// Saptpuri
router.get("/allSaptpuri", getAllSaptpuris);
router.post("/addSaptpuri", addSaptpuri);
router.get("/Saptpuri/:id", getSaptpuriById);
router.put("/Saptpuri/:id", updateSaptpuri);
router.delete("/Saptpuri/:id", deleteSaptpuri);

// ShaktiPeeth
router.get("/allShaktiPeeth", getAllShaktiPeeths);
router.post("/addShaktiPeeth", addShaktiPeeth);
router.get("/ShaktiPeeth/:id", getShaktiPeethById);
router.put("/ShaktiPeeth/:id", updateShaktiPeeth);
router.delete("/ShaktiPeeth/:id", deleteShaktiPeeth);

// swayambhu vishnu
router.get("/allSwayambhuVishnu", getAllSwayambhuVishnus);
router.post("/addSwayambhuVishnu", addSwayambhuVishnu);
router.get("/SwayambhuVishnu/:id", getSwayambhuVishnuById);
router.put("/SwayambhuVishnu/:id", updateSwayambhuVishnu);
router.delete("/SwayambhuVishnu/:id", deleteSwayambhuVishnu);

module.exports = router;
