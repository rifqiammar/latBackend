import { Router } from "express";

import home from "../controller/home.js";
import user from "../controller/user.js";
import userCust from "../controller/userCust.js";
import order from "../controller/order.js";

const router = Router();

router.get("/", home.home);

router.get("/users", user.user);
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
