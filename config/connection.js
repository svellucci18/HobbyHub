const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || "hobbyHub_db",
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "127.0.0.1" || "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;
