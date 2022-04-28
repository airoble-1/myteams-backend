const User = require("./../model/user")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../../../utils/jwtGenerator")

module.exports.user_register = async (req, res) => {
  try {
    res.status(500)
    //1 . destructure the req.body
    let { userName, email, firstName, lastName, password, confirmPassword } =
      req.body
    //2 . check if the user already exists throw error
    const usernames = await User.findAll({ where: { userName } })
    if (usernames.length > 0) {
      res.status(401)
      throw new Error("User already exists")
    }
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
      userName,
      email,
      firstName,
      lastName,
      password: hashedPassword,
    })
    const { id, userName: newUserName, email: newEmail } = user.dataValues
    //9 . generate the token
    const token = jwtGenerator(id)
    res.status(200).json({
      token,
      user: {
        id,
        username: newUserName,
        email: newEmail,
      },
    })
  } catch (error) {
    res.json({
      error: {
        message: error.message,
      },
    })
  }
}
