const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const Book = require("./book.js");
const Member = require("./member.js");

const Borrow = sequelize.define("borrow", {
  borrowDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  returnDate: {
    type: DataTypes.DATE,
  },
  isReturned: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Book.hasMany(Borrow, { foreignKey: "bookCode", onDelete: "CASCADE" });
Borrow.belongsTo(Book, { foreignKey: "bookCode" });

Member.hasMany(Borrow, { foreignKey: "memberCode", onDelete: "CASCADE" });
Borrow.belongsTo(Member, { foreignKey: "memberCode" });

module.exports = Borrow;
