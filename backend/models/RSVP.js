const { DataTypes } = require("sequelize");
const db = require("../config/database");

const RSVP = db.define("RSVP", {
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  event_id: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = RSVP;
