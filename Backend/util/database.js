const Sequelise = require("sequelize");

const sequelize = new Sequelise("bookappointmentapp", "root", "Mohmy", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
