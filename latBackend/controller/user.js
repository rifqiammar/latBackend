import { errorhandling } from "../helper/errorHandling.js";
import models from "../model/init-models.js";
import { sequelize } from "../model/init-models.js";
import bcrypt from "bcrypt";
import order_detail from "../model/order_detail.js";

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

// Melakukan Join Database
const getUserCustomer = async (req, res) => {
  try {
    // const result = await models.users.findAll({ include: "customers" }); // Untuk menampilkan left join
    // const result = await models.users.findAll({ include: { model: models.customers, as: "customers", required: true } }); // Untuk menampilkan inner join
    //  Sintax Simple dan alternative untuk get Join data, Menampilkan seluruh relasinya
    const result = await models.users.findAll({ include: { all: true, nested: true } });
    //   include: [
    //     {
    //       model: models.customers,
    //       as: "customers",
    //       required: true,
    //       // attributes: ["firstname", "lastname"],
    //     },
    //     {
    //       model: models.orders,
    //       as: order,
    //          include: {
    //            model: models.orders_detail;s,
    //              as: "order_details",
    // }
    //     },
    //   ],
    // });

    res.send(errorhandling(result[0].data, 200, "Berhasil"));
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};

// get Data dari db Menggunakan View
const viewdata = async (req, res) => {
  try {
    const query = `select *from dataEproduct`;
    const result = await sequelize.query(query);
    res.send(errorhandling(result[0].data, 200, "sukses"));
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};

const dataCurPaginate = async (req, res) => {
  try {
    const query = `select * from datacursor (${req.params.lim},${req.params.page})`;
    const result = await sequelize.query(query);
    res.send(errorhandling(result, 200, "sukses"));
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};
export default {
  user,
  createuser,
  updateUser,
  deleteUser,
  getUserCustomer,
  viewdata,
  dataCurPaginate,
};
