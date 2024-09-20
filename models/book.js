const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Book = sequelize.define("book", {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  isBorrow: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Book;
