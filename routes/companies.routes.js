const router = require("express").Router();
const { authorize } = require("../middleware/auth.mw");
const { createNewCompany, getAllCompanies } = require("../controllers/companies.controller");

// create new card business only
router.post("/", authorize, createNewCompany);

// GET all companies - only admin
router.get("/", authorize, getAllCompanies);

// // GET users card by user id - authorized user
// router.get("/my-cards", authorize, getCardsByUserId);

// // GET card by ID
// router.get("/:id", getCardById);

// // Update (PUT) card by user who create the card or admin
// router.put("/:id", authorize, cardVerify, editCard);

// // DELETE card by user who create the card or admin
// router.delete("/:id", authorize, cardVerify, deleteCard);

// // PATCH toggle likes for cards
// router.patch("/:id", authorize, cardVerify, toggleLike);

// // PATCH change business number by admin
// router.patch("/business/:id", authorize, cardVerify, changeBusinessNumber);

module.exports = router;
