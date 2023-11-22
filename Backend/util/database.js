const Sequelise = require("sequelize");

const sequelize = new Sequelise("bookappointmentapp", "root", "Mohmy@2866", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
