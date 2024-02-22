const router = require("express").Router();
const { authorize } = require("../middleware/auth.mw");
const { createNewLocation, getAllLocation, deleteLocation, editLocation, getLocationById } = require("../controllers/locations.controller");

// create new Location business only
router.post("/", authorize, createNewLocation);

// GET all Location - non provide token
router.get("/", authorize, getAllLocation);

// GET Location by ID
router.get("/:id", authorize, getLocationById);

// Update (PUT) Location by user who create the card or admin
router.put("/:id", authorize, editLocation);

// DELETE Location by user who create the card or admin
router.delete("/:id", authorize, deleteLocation);

module.exports = router;
