const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Member = sequelize.define("member", {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isPenalty: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  penaltyEndDate: {
    type: DataTypes.DATE,
  },
});

module.exports = Member;
