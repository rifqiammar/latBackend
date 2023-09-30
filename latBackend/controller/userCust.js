import { sequelize } from "../model/init-models.js";
import { errorhandling } from "../helper/errorHandling.js";

// Insert Menggunakan Storeprocedure
const insertusercust = async (req, res) => {
  try {
    const { dt_user, dt_customer } = req.body;
    const query = `call insertCustomer('[${JSON.stringify(dt_user)}]', '[${JSON.stringify(dt_customer)}]')`;
    const result = await sequelize.query(query);
    res.send(errorhandling(result, 200, "sukses"));

    // console.log(req.body);
  } catch (error) {
    res.send(errorhandling(500, error.message));
  }
};

export default { insertusercust };
