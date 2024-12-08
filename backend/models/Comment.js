const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Comment = db.define("Comment", {
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  event_id: { type: DataTypes.INTEGER, allowNull: false },
  comment: { type: DataTypes.TEXT, allowNull: false },
  rating: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Comment;
