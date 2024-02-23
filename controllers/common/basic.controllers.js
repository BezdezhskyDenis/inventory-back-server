const { errorLog } = require("../../utils/chalk.log");
const mongoose = require("mongoose");
const _ = require("lodash");

async function checkValidId(id) {
  return mongoose.isValidObjectId(id);
}

async function createNew(req, res, validateSchema, mongoModel) {
  try {
    if (req.user.isManager === false) {
      return res
        .status(401)
        .send(`User must be a Manager account to create ${mongoModel}`);
    }
    const { error } = validateSchema(req.body);
    if (error) {
      return {
        err: () => {
          res.status(400).send(error.details[0].message);
        },
      };
    }

    const data = new mongoModel({
      ...req.body,
      company_id: req.user.company_id,
    });
    await data.save();
    return data;
  } catch (error) {
    errorLog(error);
    return {
      err: () => {
        res.status(500).send("An error occurred, Error: " + error.message);
      },
    };
  }
}

async function getAll(req, res, mongoModel) {
  try {
    const data = await mongoModel.find({ company_id: req.user.company_id });
    res.json(data);
  } catch (error) {
    errorLog(error);
    res.status(500).send("An error occurred, Error: " + error.message);
  }
}

async function getById(req, res, mongoModel) {
  try {
    if (!checkValidId(req.params.id)) {
      return res.status(400).send(`${req.params.id} is not a valid ID`);
    }

    const data = await mongoModel.findOne({
      _id: req.params.id,
      company_id: req.user.company_id,
    });

    if (!data) {
      return res.status(400).send("The card with the ID number was not found");
    }

    if (data.company_id.toString() !== req.user.company_id) {
      return res.status(401).send("Unauthorized");
    }

    res.json(data);
  } catch (error) {
    errorLog(error);
    res.status(500).send("An error occurred, Error: " + error.message);
  }
}

async function edit(req, res, validateSchema, mongoModel) {
  try {
    const { error } = validateSchema(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const data = await mongoModel.findOneAndUpdate(
      {
        _id: req.params.id,
        company_id: req.user.company_id,
      },
      req.body,
      { new: true }
    );
    if (!data) {
      return res.status(400).send("The card with the given ID was not found");
    }
    res.json(data);
  } catch (error) {
    errorLog(error);
    res.status(500).send("An error occurred, Error: " + error.message);
  }
}

async function deleteData(req, res, mongoModel, name) {
  try {
    const data = await mongoModel.findOneAndDelete({
      _id: req.params.id,
      company_id: req.user.company_id,
    });
    if (!data) {
      return res.status(400).send("The card with the given ID was not found");
    }
    res.json({
      message: `${name} id: ${data._id} has been deleted.`,
    });
  } catch (error) {
    errorLog(error);
    res.status(500).send("An error occurred, Error: " + error.message);
  }
}

async function updateParams(req, res, mongoModel) {
  try {
    let updateObj = {};
    let objKeys = [];
    for (const key in req.body) {
      if (req.body[key] !== undefined) updateObj[key] = req.body[key];
      objKeys.push(key);
    }
    const data = await mongoModel.findOneAndUpdate(
      {
        _id: req.params.id,
        company_id: req.user.company_id,
      },
      updateObj,
      {
        new: true,
      }
    );
    if (!data) {
      return res.status(400).send(`Worker with the given ID was not found`);
    }
    res.json(_.pick(data, ["_id", ...objKeys]));
  } catch (error) {
    errorLog(error);
    res.status(500).send("An error occurred, Error: " + error.message);
  }
}

module.exports = {
  createNew,
  getAll,
  getById,
  edit,
  deleteData,
  updateParams,
  // changeBusinessNumber,
};
