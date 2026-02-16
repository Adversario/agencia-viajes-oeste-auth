const express = require("express");
const router = express.Router();

const {
  getSolicitudes,
  createSolicitud
} = require("../controllers/solicitudesController");

router.get("/solicitudes", getSolicitudes);
router.post("/solicitudes", createSolicitud);

module.exports = router;