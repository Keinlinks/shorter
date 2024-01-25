const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  database: "shorterDB",
  username: "root",
  password: "",
  host: "localhost",
  dialect: "mysql",
});

const links = sequelize.define(
  "links",
  {
    url: {
      type: Sequelize.DataTypes.TEXT,
    },
    id: {
      type: Sequelize.DataTypes.STRING,
      primaryKey: true,
    },
    clicks: {
      type: Sequelize.DataTypes.NUMBER,
      allowNull: true,
    },
  },
  {
    tableName: "links",
    timestamps: true,
    underscored: false,
  }
);

module.exports = { links, sequelize };
