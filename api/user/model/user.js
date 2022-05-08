const sequelize = require("./../../../database/database")
const Sequelize = require("sequelize")
const Team = require("../../../api/team/model/team")

const User = sequelize.define("User", {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  title: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  inviteStatus: {
    type: Sequelize.ENUM("PENDING", "ACCEPTED", "DECLINED"),
    defaultValue: "PENDING",
  },
  inviteMessage: Sequelize.TEXT,
})

module.exports = User
