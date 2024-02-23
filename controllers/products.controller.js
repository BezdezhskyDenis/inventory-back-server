const {
  Product,
  validateProduct,
  checkValidId,
} = require("../models/products.model");
const {
  createNew,
  getAll,
  getById,
  edit,
  deleteData,
  updateParams,
} = require("./common/basic.controllers");
const { errorLog } = require("../utils/chalk.log");

async function createNewProduct(req, res) {
  const product = await createNew(req, res, validateProduct, Product);
  if (product.err != null ) return product.err();
  res.json(product);
}

async function getAllProducts(req, res) {
  await getAll(req, res, Product);
}

async function getProductById(req, res) {
  await getById(req, res, Product);
}

async function editProduct(req, res) {
  await edit(req, res, validateProduct, Product);
}

async function deleteProduct(req, res) {
  await deleteData(req, res, Product, "Product");
}

async function updateProductParams(req, res) {
  await updateParams(req, res, Product);
}

module.exports = {
  createNewProduct,
  getAllProducts,
  getProductById,
  editProduct,
  deleteProduct,
  updateProductParams,
};
