const { password } = require("pg/lib/defaults")
const User = require("./../model/user")

module.exports.user_register = async (req, res) => {
  try {
    //1 . destructure the req.body
    let { userName, email, firstName, lastName, password, confirmPassword } =
      req.body
    //2 . check if the user already exists throw error
    const usernames = await User.findAll({ where: { userName } })
    if (usernames.length > 0) throw new Error("User already exists")
    const emails = await User.findAll({ where: { email } })
    if (emails.length > 0) throw new Error("Email already exists")
    //3 . firstName, lastName are empty throw error
    if (firstName === "" || lastName === "") {
      throw new Error("First Name and Last Name are required")
    }
    //4 . check if password is less than 8 characters throw error
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters")
    }
    //5 . check if password and passwordConfirmation are not equal throw error
    if (password !== confirmPassword) {
      throw new Error("Password and Confirm Password must be equal")
    }
    //6 . check if email is not valid throw error
    email = email.toLowerCase()
    const emailRegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const isEmailValid = emailRegExp.test(email)
    if (!isEmailValid) {
      throw new Error("Pleae enter a valid email address")
    }
    res.json({
      jwt: "Here is your JWT token",
      user: {
        id: "this is your id",
        username: "this is your username",
        email: "this is your email",
      },
    })
    //7 . hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    //8 . create the user in DB
    //9 . generate the token
  } catch (error) {
    console.error("Error:", error.message)
    res.status(500).json({
      error: {
        message: error.message,
      },
    })
  }
}
