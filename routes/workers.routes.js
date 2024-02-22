const router = require("express").Router();
const { authorize } = require("../middleware/auth.mw");
const { createNewWorker, getAllWorkers, deleteWorker, editWorker, getWorkerById, updateWorkerParams } = require("../controllers/workers.controller");

// create new Worker business only
router.post("/", authorize, createNewWorker);

// GET all Worker - non provide token
router.get("/", authorize, getAllWorkers);

// GET Worker by ID
router.get("/:id", authorize, getWorkerById);

// Update (PUT) Worker by user who create the card or admin
router.put("/:id", authorize, editWorker);

// DELETE Worker by user who create the card or admin
router.delete("/:id", authorize, deleteWorker);

// PATCH Worker params 
router.patch("/:id", authorize, updateWorkerParams);

module.exports = router;
