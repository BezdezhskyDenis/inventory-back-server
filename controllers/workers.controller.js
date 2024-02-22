const { Worker, validateWorker } = require("../models/workers.model");
const { createNew, getAll, getById, edit, deleteData, updateParams } = require("./common/basic.controllers");
const { errorLog } = require("../utils/chalk.log");

async function createNewWorker(req, res) {
  const worker = await createNew(req, res, validateWorker, Worker);
  if (worker.err != null) return worker.err();
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

module.exports = {
  createNewWorker,
  getAllWorkers,
  getWorkerById,
  editWorker,
  deleteWorker,
  updateWorkerParams
};
