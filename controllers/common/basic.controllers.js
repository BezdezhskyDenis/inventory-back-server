const { errorLog } = require("../../utils/chalk.log");

async function createNew(req, res, validateSchema, mongoModel){
    try{
        if (req.user.isManager === false) {
            return res
              .status(401)
              .send("User must be a Manager account to create company");
          }
          const { error } = validateSchema(req.body);
          if (error) {
            return {err :() =>{res.status(400).send(error.details[0].message)}};
          }
      
          const data = new mongoModel({
            ...req.body,
            company_id: req.user.company_id,
          });
          await data.save();
          return data
        } catch (error) {
          errorLog(error);
          res.status(500).send("An error occurred, Error: " + error.message);
        }
}

module.exports = {
    createNew,
    // getAllCards,
    // getCardsByUserId,
    // getCardById,
    // editCard,
    // deleteCard,
    // toggleLike,
    // changeBusinessNumber,
  };