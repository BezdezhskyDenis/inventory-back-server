const { Location, validateLocation } = require("../models/locations.model");
const { createNew, getAll, getById, edit, deleteData } = require("./common/basic.controllers");
const { errorLog } = require("../utils/chalk.log");

async function createNewLocation(req, res) {
  const location = await createNew(req, res, validateLocation, Location);
  if (location.err != null) return location.err();
  res.json(location);
}

async function getAllLocation(req, res) {
  await getAll(req, res, Location)
}

async function getLocationById(req, res) {
  await getById(req, res, Location)
}

async function editLocation(req, res) {
  await edit(req, res, validateLocation, Location)
}

async function deleteLocation(req, res) {
  await deleteData(req, res, Location, "Location")
}

module.exports = {
  createNewLocation,
  getAllLocation,
  getLocationById,
  editLocation,
  deleteLocation
};
