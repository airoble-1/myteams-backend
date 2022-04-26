require("dotenv").config()
const express = require("express")
const app = express()
const HTTP_PORT = process.env.PORT || 8080

app.use(require("cors")()) // allow Cross-domain requests
app.use(require("body-parser").json()) // When someone sends something to the server, we can recieve it in JSON format

app.listen(HTTP_PORT, () => {
  console.log(`Express http server listening on ${HTTP_PORT}`)
})
