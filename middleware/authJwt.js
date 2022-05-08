const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.headers.authorization

    if (!jwtToken) {
      res.status(401).json({
        error: {
          message: "Not Authorized1",
        },
      })
    } else {
      const payload = jwt.verify(jwtToken, process.env.jwtSecret)
      req.user = payload.user
      next()
    }
  } catch (error) {
    console.error(error.message)
    return res.status(403).json({
      error: {
        message: "Not Authorized2",
      },
    })
  }
}
