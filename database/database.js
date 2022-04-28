const { Sequelize } = require("sequelize")
// sequelize to connect to the postgres database on Heroku
const sequelize = new Sequelize(
  "d8oe78572tnmv1",
  "wtcaqrwushovjc",
  "d6f0a71f761c4806aaa3fdfd4e55c00c63b0e55a99b0d23192c183d2bc9ba244",
  {
    host: "ec2-52-86-56-90.compute-1.amazonaws.com",
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
    define: {
      freezeTableName: true,
    },
    query: { raw: true },
  }
)

module.exports = sequelize
