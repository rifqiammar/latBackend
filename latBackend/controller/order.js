import { sequelize } from "../model/init-models.js";
import { errorhandling } from "../helper/errorHandling.js";

const insertOrder = async (req, res) => {
  try {
    const { dt_order, dt_odetail } = req.body;
    const query = `call insertorder('[${JSON.stringify(dt_order)}]', '[${JSON.stringify(dt_odetail)}]')`;
    const result = await sequelize.query(query);
    res.send(errorhandling(result, 200, "sukses"));

    // console.log(req.body);
  } catch (error) {
    res.send(errorhandling(500, error.message));
  }
};

const updateOrder = async (req, res) => {
  try {
    const { dt_order, dt_odetail } = req.body;
    const query = `call updateorder('[${JSON.stringify(dt_order)}]', '${JSON.stringify(dt_odetail)}')`;
    const result = await sequelize.query(query);
    res.send(errorhandling(result, 200, "sukses"));

    // console.log(req.body);
  } catch (error) {
    res.send(errorhandling(500, error.message));
  }
};

export default { insertOrder, updateOrder };
