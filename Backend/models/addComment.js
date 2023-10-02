const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const AddComment = sequelize.define("addcomment", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  comment: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});
module.exports = AddComment;
