import { errorhandling } from "../helper/errorHandling.js";
import models from "../model/init-models.js";
import bcrypt from "bcrypt";

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
    const salt = bcrypt.genSaltSync(10);
    const passhash = bcrypt.hashSync(pswd, salt);
    const result = await models.users.create(
      {
        username: usr,
        password: passhash,
      },
      { returning: true }
    );
    res.send(errorhandling(errorhandling(result, 200, "Berhasil")));
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};

const updateUser = async (req, res) => {
  try {
    const { pswd } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const passhash = bcrypt.hashSync(pswd, salt);
    const result = await models.users.update(
      {
        username: req.body.usr,
        password: passhash,
      },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.send(errorhandling(errorhandling(result, 200, "Berhasil")));
  } catch (error) {
    res.send(errorhandling(errorhandling(result, 400, error.message)));
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await models.users.destroy({
      where: { id: req.params.id },
      returning: true,
    });
    res.send(errorhandling(errorhandling(result, 200, "Berhasil")));
  } catch (error) {
    res.send(errorhandling(errorhandling(result, 400, error.message)));
  }
};

export default { user, createuser, updateUser, deleteUser };
