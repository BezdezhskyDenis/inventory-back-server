const router = require("express").Router();
const { authorize } = require("../middleware/auth.mw");
const { createNewDepartment, getAllDepartment, deleteDepartment, editDepartment, getDepartmentById } = require("../controllers/departments.controller");

// create new Department business only
router.post("/", authorize, createNewDepartment);

// GET all Department 
router.get("/", authorize, getAllDepartment);

// GET Department by ID
router.get("/:id", authorize, getDepartmentById);

// Update (PUT) Department by user who create the card or admin
router.put("/:id", authorize, editDepartment);

// DELETE Department by user who create the card or admin
router.delete("/:id", authorize, deleteDepartment);

module.exports = router;
