const sequelize = require("./../../../database/database")
const Sequelize = require("sequelize")
const Team = require("../../../api/team/model/team")

const User = sequelize.define("User", {
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [8, 20],
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      len: [6, 20],
    },
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: Sequelize.STRING,
  inviteStatus: {
    type: Sequelize.ENUM("PENDING", "ACCEPTED", "DECLINED"),
    defaultValue: "PENDING",
  },
  inviteMessage: Sequelize.TEXT,
  password: Sequelize.STRING,
})

module.exports = User
