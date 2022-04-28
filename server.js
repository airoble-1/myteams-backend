require("dotenv").config()

const express = require("express")
const app = express()
const HTTP_PORT = process.env.PORT || 8080
const sequelize = require("./database/database")
const Team = require("./api/team/model/team")
const User = require("./api/user/model/user")

app.use(require("cors")()) // allow Cross-domain requests
app.use(require("body-parser").json()) // When someone sends something to the server, we can recieve it in JSON format

app.get("/", (req, res) => {
  res.json("Hello World!")
})

const initialize = async () => {
  try {
    // User.belongsToMany(Team, { through: "User_Teams" })
    await sequelize.sync({ force: true })
    User.create({
      username: "airoble1",
      email: "airoble1@myseneca.ca",
      firstName: "Ahmed",
      lastName: "Roble",
      password: "12345678",
    })
    app.listen(HTTP_PORT, () => {
      console.log(`Express http server listening on ${HTTP_PORT}`)
    })
  } catch (error) {
    console.error("Error:", error.message)
  }
}

initialize()
