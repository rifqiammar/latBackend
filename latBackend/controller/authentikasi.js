import { errorhandling } from "../helper/errorHandling.js";
import models from "../model/init-models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    // Mengambil username dan password dari request client / form dan menyimpan ke dalam variable
    const { username, password } = req.body;

    //Query ke DB untuk mencari Username yang sama seperti yang di inputkan
    const usr = await models.users.findOne({ where: { username: username } });

    // Pengecekan Username
    if (!usr) {
      throw new Error(`${username} Tidak di Temukan`);
    }

    //  compare bcrypt
    const match = await bcrypt.compare(password, usr.password);

    // Pengecekan Password
    if (!match) {
      throw new Error(`${username} Password Salah`);
    }

    // Jika Berhasil
    // const payload = { username: usr.username };
    const token = jwt.sign({ username: usr.username, createdat: usr.createdat }, process.env.SECRET_KEY, { expiresIn: "1d" }); // expire 30 detik
    // res.send(errorhandling({ usr, token }, 200, "Selamat Anda Berhasil Login"));
    res.send(errorhandling({ token }, 200, "Selamat Anda Berhasil Login"));
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};

// Pengecekan Token Untuk Akses Api | Middleware
const cekToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // console.log(authorization);

    if (!authorization) {
      throw new Error("Authorization Belum Terisi");
    }

    // const verif = jwt.verify(authorization, process.env.SECRET_KEY);
    // if (!verif) {
    //   throw new Error("Token Salah Gagal");
    // }

    // Pengecekan Token Jika Sama
    jwt.verify(authorization, process.env.SECRET_KEY);

    next();
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};

export default {
  login,
  cekToken,
};
