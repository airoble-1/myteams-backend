const sequelize = require("./../../../database/database")
const Sequelize = require("sequelize")
const User = require("../../../api/user/model/user")

const Team = sequelize.define("Team", {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
})

// Team.belongsToMany(User, { through: "team_users" })

module.exports = Team
