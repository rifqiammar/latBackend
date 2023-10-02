import { Router } from "express";

import home from "../controller/home.js";
import user from "../controller/user.js";
import userCust from "../controller/userCust.js";
import order from "../controller/order.js";
import authentikasi from "../controller/authentikasi.js";

const router = Router();

// Login / authentikasi
router.post("/login", authentikasi.login);

router.get("/", home.home);

// Method Cek Token Sebelum getUsers, Menggunakan Middleware (Cektoken)
router.get("/users", authentikasi.cekToken, user.user);

router.post("/users", user.createuser);
router.put("/users/:id", user.updateUser);
router.delete("/users/:id", user.deleteUser);

// Customer
router.post("/insertusercust", userCust.insertusercust);

//Join User dengan customer
router.get("/getusercustomer", user.getUserCustomer);
router.get("/getallusercustomers", user.viewdata);

// get Data Pagination
router.get("/getalldatapaginate", user.dataCurPaginate);

// Order
router.post("/order", order.insertOrder);
router.put("/order", order.updateOrder);

export default router;
