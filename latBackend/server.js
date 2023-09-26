import "dotenv/config";

import express from "express";

import router from "./routing/route.js";
const app = express();
const port = process.env.PORT || 7200;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use(router);

app.listen(port, () => {
  console.log(` Program berjalan pada Port: ${port}`);
});
