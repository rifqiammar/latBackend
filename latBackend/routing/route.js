import { Router } from "express";

import home from "../controller/home.js";
import user from "../controller/user.js";

const router = Router();

router.get("/", home.home);
router.get("/users", user.user);
router.post("/users", user.createuser);

export default router;
