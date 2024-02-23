const {
  Department,
  validateDepartment,
} = require("../models/departments.model");
const { createNew, getAll, getById, edit, deleteData } = require("./common/basic.controllers");

const { errorLog } = require("../utils/chalk.log");

async function createNewDepartment(req, res) {
  const department = await createNew(req, res, validateDepartment, Department);
  if (department.err != null || undefined) return department.err();
  res.json(department);
}

async function getAllDepartment(req, res) {
  await getAll(req, res, Department)
}

async function getDepartmentById(req, res) {
  await getById(req, res, Department)
}

async function editDepartment(req, res) {
  await edit(req, res, validateDepartment, Department)
}

async function deleteDepartment(req, res) {
  await deleteData(req, res, Department, "Department")
}

module.exports = {
  createNewDepartment,
  getAllDepartment,
  getDepartmentById,
  editDepartment,
  deleteDepartment,
};
