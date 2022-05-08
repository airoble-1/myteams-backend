require("dotenv").config()

const express = require("express")
const app = express()
const HTTP_PORT = process.env.PORT || 8080
const cors = require("cors")
const sequelize = require("./database/database")
const Team = require("./api/team/model/team")
const User = require("./api/user/model/user")
const userControllers = require("./api/user/controllers/user")
const authJwt = require("./middleware/authJwt")
app.use(cors()) // allow Cross-domain requests
app.use(express.json()) // Access req.body in JSON format

app.get("/", (req, res) => {
  res.json("Hello World!")
})

app.post("/api/user/register", userControllers.user_register)

app.post("/api/user/login", userControllers.user_login)

app.get("/api/team/dashboard", authJwt, async (req, res) => {
  try {
    res.json({
      data: {
        message: "Private route.",
      },
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({
      error: {
        message: err.message,
      },
    })
  }
})

const initialize = async () => {
  try {
    // User.belongsToMany(Team, { through: "User_Teams" })
    await sequelize.sync()
    app.listen(HTTP_PORT, () => {
      console.log(`Express http server listening on ${HTTP_PORT}`)
    })
  } catch (error) {
    console.error("Error:", error.message)
  }
}

initialize()
