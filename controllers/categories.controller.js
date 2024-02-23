const { Category, validateCategory } = require("../models/categories.model");
const { createNew, getAll, getById, edit, deleteData } = require("./common/basic.controllers");

const { errorLog } = require("../utils/chalk.log");
const { array } = require("joi");

async function createNewCategory(req, res) {
  const name = req.body?.name;
  if (name.length > 1 && typeof name !== "string") {
    try {
      const newCategories = await Promise.all(
        name.map(async (name) => {
          req.body.name = name;
          const category = await createNew(
            req,
            res,
            validateCategory,
            Category
          );
          if (category.err != null || undefined) throw new Error(category.err());
        })
      );
      res.json({
        message: `Categories: ${name.join(", ")} has been created.`,
      });
    } catch (error) {
      error;
    }
  } else {
    const category = await createNew(req, res, validateCategory, Category);
    if (category.err != null || undefined) return category.err();
    res.json({
      message: `Category: ${name} has been created.`,
    });
  }
}

async function getAllCategories(req, res) {
  await getAll(req, res, Category)
}

async function getCategoryById(req, res) {
  await getById(req, res, Category)
}

async function editCategory(req, res) {
  await edit(req, res, validateCategory, Category)
}

async function deleteCategory(req, res) {
  await deleteData(req, res, Category, "Category")
}



module.exports = {
  createNewCategory,
  getAllCategories,
  getCategoryById,
  editCategory,
  deleteCategory,
};
