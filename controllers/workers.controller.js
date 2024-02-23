const { Worker, validateWorker, checkValidId } = require("../models/workers.model");
const { createNew, getAll, getById, edit, deleteData, updateParams } = require("./common/basic.controllers");
const { errorLog } = require("../utils/chalk.log");

async function createNewWorker(req, res) {
  const worker = await createNew(req, res, validateWorker, Worker);
  if (worker.err != null ) return worker.err();
  res.json(worker);
}

async function getAllWorkers(req, res) {
  await getAll(req, res, Worker)
}

async function getWorkerById(req, res) {
  await getById(req, res, Worker)
}

async function editWorker(req, res) {
  await edit(req, res, validateWorker, Worker)
}

async function deleteWorker(req, res) {
  await deleteData(req, res, Worker, "Worker")
}

async function updateWorkerParams(req, res) {
  await updateParams(req, res, Worker)
}

async function toggleEquipmentsForWorker(req, res) {
  try {
    
    let worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.status(400).send("The User with the given ID was not found");
    }
    if(req.user.company_id !==  worker.company_id){
        return res.status(401).send('You are not authorized to perform this action');
    }

    if (!checkValidId(req.body.equipment_id)) {
      res.status(400).send(`${req.body.equipment_id} is not a valid ID`);
      return;
    }

    worker = await worker.toggleEquipments(req.body.equipment_id);
    res.json(worker);
  } catch (error) {
    errorLog(error);
    res.status(500).send("An error occurred, Error: " + error.message);
  }
}

module.exports = {
  createNewWorker,
  getAllWorkers,
  getWorkerById,
  editWorker,
  deleteWorker,
  updateWorkerParams,
  toggleEquipmentsForWorker
};
