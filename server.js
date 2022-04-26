require("dotenv").config()
const { Sequelize } = require("sequelize")
const express = require("express")
const app = express()
const HTTP_PORT = process.env.PORT || 8080

app.use(require("cors")()) // allow Cross-domain requests
app.use(require("body-parser").json()) // When someone sends something to the server, we can recieve it in JSON format

app.get("/", (req, res) => {
  res.json("Hello World!")
})

// sequelize to connect to the postgres database on Heroku
const sequelize = new Sequelize(
  "d8oe78572tnmv1",
  "wtcaqrwushovjc",
  "d6f0a71f761c4806aaa3fdfd4e55c00c63b0e55a99b0d23192c183d2bc9ba244",
  {
    host: "ec2-52-86-56-90.compute-1.amazonaws.com",
    dialect: "postgres",
    port: 5432,
    logging: false,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
    query: { raw: true },
  }
)

const initialize = async () => {
  try {
    await sequelize.authenticate()
    console.log("DB Connection has been established successfully.")
    app.listen(HTTP_PORT, () => {
      console.log(`Express http server listening on ${HTTP_PORT}`)
    })
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

initialize()
