const router = require("express").Router();
const { authorize } = require("../middleware/auth.mw");
const { createNewProduct, deleteProduct, editProduct, getAllProducts, getProductById, updateProductParams } = require("../controllers/products.controller");

// create new Product business only
router.post("/", authorize, createNewProduct);

// GET all Product - non provide token
router.get("/", authorize, getAllProducts);

// GET Product by ID
router.get("/:id", authorize, getProductById);

// Update (PUT) Product by user who create the card or admin
router.put("/:id", authorize, editProduct);

// DELETE Product by user who create the card or admin
router.delete("/:id", authorize, deleteProduct);

// PATCH Product params 
router.patch("/:id", authorize, updateProductParams);

module.exports = router;
