const RSVP = require("../models/RSVP");

exports.getRSVPByEvent = async (req, res) => {
  try {
    const rsvpList = await RSVP.findAll({ where: { event_id: req.params.eventId } });
    res.json(rsvpList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRSVP = async (req, res) => {
  try {
    const rsvp = await RSVP.create(req.body);
    res.status(201).json(rsvp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRSVP = async (req, res) => {
  try {
    const rsvp = await RSVP.findByPk(req.params.id);
    if (!rsvp) return res.status(404).json({ error: "RSVP no encontrado" });
    await rsvp.destroy();
    res.json({ message: "RSVP eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
