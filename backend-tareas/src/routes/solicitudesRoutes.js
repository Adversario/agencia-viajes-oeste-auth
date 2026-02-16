const express = require("express");
const router = express.Router();

const {
  getSolicitudes,
  createSolicitud,
  deleteSolicitud
} = require("../controllers/solicitudesController");

router.get("/solicitudes", getSolicitudes);
router.post("/solicitudes", createSolicitud);
router.delete("/solicitudes/:id", deleteSolicitud);

module.exports = router;