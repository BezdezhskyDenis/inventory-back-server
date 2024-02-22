const router = require("express").Router();
const { authorize } = require("../middleware/auth.mw");
const { createNewCompany, getAllCompanies, deleteCompany, editCompany, getCompanyById } = require("../controllers/companies.controller");

// create new card business only
router.post("/", authorize, createNewCompany);

// GET all companies - only admin
router.get("/", authorize, getAllCompanies);

// GET company by ID
router.get("/:id", authorize, getCompanyById);

// Update (PUT) company by user who create the card or admin
router.put("/:id", authorize, editCompany);

// DELETE company by user who create the card or admin
router.delete("/:id", authorize, deleteCompany);

module.exports = router;
