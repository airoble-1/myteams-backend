const { Sequelize } = require("sequelize")
// sequelize to connect to the postgres database on Heroku
const sequelize = new Sequelize(
  "ddqkig0mh00lb1",
  "uajxjmvvgomizw",
  "6086995a2dfc72992d6d8bc8909854a02be6287504ee555dc48b484b96c8684b",
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
    logging: false,
  }
)

module.exports = sequelize
