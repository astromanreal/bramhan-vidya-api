const express = require("express");
const {
  getAllTemples,
  createTemple,
  getTempleById,
  updateTemple,
  deleteTemple,
} = require("../controllers/temples/temples");

const router = express.Router();

router.get("/alltemples", getAllTemples);
router.post("/addtemple", createTemple);
router.get("/temple/:id", getTempleById);
router.put("/temple/:id", updateTemple);
router.delete("/temple/:id", deleteTemple);

module.exports = router;
