import { errorhandling } from "../helper/errorHandling.js";

const home = async (req, res) => {
  try {
    await res.send("ini Halaman Home");
  } catch (e) {
    await res.send(errorhandling(400, "Gagal Request"));
  }
};

export default { home };
