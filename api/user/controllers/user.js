const User = require("./../model/user")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../../../utils/jwtGenerator")

module.exports.user_register = async (req, res) => {
  try {
    res.status(500)
    //1 . destructure the req.body
    let { email, firstName, lastName, password, confirmPassword } = req.body
    //2 . check if the user already exists throw error
    const emails = await User.findAll({ where: { email } })
    if (emails.length > 0) {
      res.status(401)
      throw new Error("Email already exists")
    } //3 . firstName, lastName are empty throw error
    if (firstName === "" || lastName === "") {
      throw new Error("First Name and Last Name are required")
    }
    //4 . check if password is less than 8 characters throw error
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters")
    }
    //5 . check if password and passwordConfirmation are not equal throw error
    if (password !== confirmPassword) {
      throw new Error("Password and Confirm Password must match")
    }
    //6 . check if email is not valid throw error
    email = email.toLowerCase()
    const emailRegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const isEmailValid = emailRegExp.test(email)
    if (!isEmailValid) {
      throw new Error("Pleae enter a valid email address")
    }
    //7 . hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    //8 . create the user in DB
    const user = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    })
    if (user) {
      res.status(200).json({
        message: "User created successfully",
      })
    }
  } catch (error) {
    res.json({
      message: error.message,
    })
  }
}

module.exports.user_login = async (req, res) => {
  try {
    res.status(500)
    const { email, password } = req.body
    const dbUser = await User.findOne({ where: { email } })
    if (!dbUser) {
      res.status(401)
      throw new Error("email or password is incorrect")
    }
    const isPasswordValid = await bcrypt.compare(password, dbUser.password)
    if (!isPasswordValid) {
      res.status(401)
      throw new Error("email or password is incorrect")
    }
    res.status(200).json({
      token: jwtGenerator(dbUser.id),
    })
  } catch (error) {
    res.json({
      message: error.message,
    })
  }
}
