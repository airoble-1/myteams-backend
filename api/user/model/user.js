const { sequelize } = require("sequelize")
const Team = require("../../../api/team/model/team")

const User = sequelize.define("User", {
  username: {
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
})

User.belongsToMany(Team, { through: "team_user" })

sequelize
  .sync({ alter: true })
  .then()
  .catch((err) => console.log("User table could not be synced:", err))

module.exports = User
