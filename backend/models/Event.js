const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Event = db.define("Event", {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
});

module.exports = Event;
