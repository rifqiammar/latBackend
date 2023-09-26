import { errorhandling } from "../helper/errorHandling.js";
import models from "../model/init-models.js";

const user = async (req, res) => {
  try {
    const result = await models.users.findAll();
    res.send(errorhandling(result, 200, "Berhasil"));
  } catch (e) {
    res.send(errorhandling(400, "Gagal Request"));
    // res.send(errorhandling(e.message));
  }
};

const createuser = async (req, res) => {
  try {
    const { usr, pswd } = req.body;
    const result = await models.users.create(
      {
        username: usr,
        password: pswd,
      },
      { returning: true }
    );
    res.send(errorhandling(errorhandling(result, 200, "Berhasil")));
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};

export default { user, createuser };
