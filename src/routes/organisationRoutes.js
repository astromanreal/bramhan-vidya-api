const express = require("express");
const {
  getAllOrganisations,
  createOrganisation,
  getOrganisationById,
  updateOrganisation,
  deleteOrganisation,
} = require("../controllers/organisations/organisation");

const router = express.Router();

router.get("/allorganisations", getAllOrganisations);
router.post("/addorganisation", createOrganisation);
router.get("/organisation/:id", getOrganisationById);
router.put("/organisation/:id", updateOrganisation);
router.delete("/organisation/:id", deleteOrganisation);

module.exports = router;
