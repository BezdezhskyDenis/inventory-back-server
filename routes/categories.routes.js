const router = require("express").Router();
const { authorize } = require("../middleware/auth.mw");
const { createNewCategory, getAllCategories, getCategoryById, editCategory, deleteCategory } = require("../controllers/categories.controller");

// create new category business only
router.post("/", authorize, createNewCategory);

// GET all category - non provide token
router.get("/", authorize, getAllCategories);

// GET category by ID
router.get("/:id", authorize, getCategoryById);

// Update (PUT) category by user who create the card or admin
router.put("/:id", authorize, editCategory);

// DELETE category by user who create the card or admin
router.delete("/:id", authorize, deleteCategory);


module.exports = router;
