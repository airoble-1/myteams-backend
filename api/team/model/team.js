const { sequelize } = require("sequelize")
const User = require("../../../api/user/model/user")

const Team = sequelize.define("Team", {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  teamLead: Sequelize.STRING, // relationship with User many-to-one
})

Team.belongsToMany(User, { through: "team_user" })

sequelize
  .sync({ alter: true })
  .then()
  .catch((err) => console.log("Team table could not be synced:", err))

module.exports = Team
