const { DataTypes } = require("sequelize");
const db = require("../config/database");

const User = db.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
});

module.exports = User;
