const { Category, validateCategory } = require("../models/categories.model");
const { createNew } = require("./common/basic.controllers");

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
          if (category.err != null) throw new Error(category.err());
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
    if (category.err != null) return category.err();
    res.json({
      message: `Category: ${name} has been created.`,
    });
  }
}

// async function getAllCards(req, res) {
//   try {
//     const cards = await Card.find();
//     res.json(cards);
//   } catch (error) {
//     errorLog(err);
//     res.status(500).send("An error occurred, Error: " + error.message);
//   }
// }

// async function getCardsByUserId(req, res) {
//   try {
//     const cards = await Card.find({
//       user_id: req.user._id,
//     });

//     if (!cards || cards.length == 0) {
//       return res.status(400).send(`No card's found for user: ${req.user._id}`);
//     }
//     res.json(cards);
//   } catch (error) {
//     errorLog(error);
//     res.status(500).send("An error occurred, Error: " + error.message);
//   }
// }

// async function getCardById(req, res) {
//   try {
//     if (!checkValidId(req.params.id)) {
//       return res.status(400).send(`${req.params.id} is not a valid ID`);
//     }
//     const card = await Card.findOne({
//       _id: req.params.id,
//     });
//     if (!card) {
//       return res.status(400).send("The card with the ID number was not found");
//     }
//     res.json(card);
//   } catch (error) {
//     errorLog(error);
//     res.status(500).send("An error occurred, Error: " + error.message);
//   }
// }

// async function editCard(req, res) {
//   try {
//     const { error } = validateCard(req.body);
//     if (error) {
//       return res.status(400).send(error.details[0].message);
//     }
//     const card = await Card.findOneAndUpdate(
//       {
//         _id: req.params.id,
//       },
//       req.body,
//       { new: true }
//     );
//     if (!card) {
//       return res.status(400).send("The card with the given ID was not found");
//     }
//     res.json(card);
//   } catch (error) {
//     errorLog(error);
//     res.status(500).send("An error occurred, Error: " + error.message);
//   }
// }

// async function deleteCard(req, res) {
//   try {
//     const card = await Card.findOneAndDelete({
//       _id: req.params.id,
//     });
//     if (!card) {
//       return res.status(400).send("The card with the given ID was not found");
//     }
//     res.json({
//       message: `Card number:${card.bizNumber} has been deleted.`,
//     });
//   } catch (error) {
//     errorLog(error);
//     res.status(500).send("An error occurred, Error: " + error.message);
//   }
// }

// async function toggleLike(req, res) {
//   try {
//     if (!req.user.isBusiness) {
//       return res.status(401).send("Only Business user's can like cards");
//     }
//     let card = await Card.findById(req.params.id);
//     if (!card) {
//       return res.status(400).send("The User with the given ID was not found");
//     }

//     card = await card.toggleLikeCard(req.user._id);
//     res.json(card);
//   } catch (error) {
//     errorLog(error);
//     res.status(500).send("An error occurred, Error: " + error.message);
//   }
// }

// async function changeBusinessNumber(req, res) {
//   try {
//     const newBusinessNumber = req.body.bizNumber.toString();
//     if (!req.user.isAdmin) {
//       return res
//         .status(403)
//         .send("Access denied. Only admins can perform this action.");
//     }
//     if (newBusinessNumber.length < 3 && newBusinessNumber.length > 12) {
//       return res.status(400).send("The business number must be between 3 and 12 digits.");
//     }
//     const existingCard = await Card.findOne({ bizNumber: newBusinessNumber });
//     if (existingCard) {
//       return res.status(400).send("The business number is already taken.");
//     }

//     const updatedCard = await Card.findByIdAndUpdate(
//       req.params.id,
//       { bizNumber: newBusinessNumber },
//       { new: true }
//     );
//     if (!updatedCard) {
//       return res.status(404).send("Card not found.");
//     }

//     res.send(updatedCard);
//   } catch (error) {
//     errorLog(error);
//     res.status(500).send("An error occurred, Error: " + error.message);
//   }
// }

module.exports = {
  createNewCategory,
  // getAllCards,
  // getCardsByUserId,
  // getCardById,
  // editCard,
  // deleteCard,
  // toggleLike,
  // changeBusinessNumber,
};
