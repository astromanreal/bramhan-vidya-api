const express = require("express");
const {
  getAllFestivals,
  createFestival,
  getFestivalById,
  updateFestival,
  deleteFestival,
} = require("../controllers/festivals/festivals");

const router = express.Router();

router.get("/allfestivals", getAllFestivals);
router.post("/addfestival", createFestival);
router.get("/festival/:id", getFestivalById);
router.put("/festival/:id", updateFestival);
router.delete("/festival/:id", deleteFestival);

module.exports = router;
