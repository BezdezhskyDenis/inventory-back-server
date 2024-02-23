const { Company, validateCompany } = require("../models/companies.model");
const { User } = require("../models/users.model");

const { createNew, deleteData, edit, getById } = require("./common/basic.controllers");
const { assignCompany } = require("./users.controller");

const { errorLog } = require("../utils/chalk.log");

async function createNewCompany(req, res) {
  const company = await createNew(req, res, validateCompany, Company);
  if (company.err != null || undefined) return company.err();
  req.body.company_id = company._id.toString();
  await assignCompany(req, res);
  const user = await User.findOne({ _id: req.user._id });
  const token = user.generateAuthToken();
  res.json(token);
}

async function getAllCompanies(req, res) {
  if (!req.user.isAdmin){
    res.status(401).send('Unauthorized');
    return
  }
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    errorLog(err);
    res.status(500).send("An error occurred, Error: " + error.message);
  }
}

async function getCompanyById(req, res) {
  await getById(req, res, Company)
}

async function editCompany(req, res) {
  await getById(req, res, validateCompany, Company)
}

async function deleteCompany(req, res) {
  if (!req.user.isAdmin){
    res.status(401).send('Unauthorized');
    return
  }
  await deleteData(req, res, Company, "Company")
}



module.exports = {
  createNewCompany,
  getAllCompanies,
  editCompany,
  getCompanyById,
  deleteCompany
};
