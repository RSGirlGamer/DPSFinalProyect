const express = require("express");
const router = express.Router();
const { getRSVPByEvent, createRSVP, deleteRSVP } = require("../controllers/rsvpController");

router.get("/event/:eventId", getRSVPByEvent);
router.post("/", createRSVP);
router.delete("/:id", deleteRSVP);

module.exports = router;
