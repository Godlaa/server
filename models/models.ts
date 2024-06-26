/* eslint-disable @typescript-eslint/no-var-requires */
const sequelize = require("../db");
const { DataTypes } = require("sequelize");

export const Users = sequelize.define("users", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

export const Users_Personal_info = sequelize.define("users_personal_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  surname: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: true },
  faculty: { type: DataTypes.STRING, allowNull: true },
  group: { type: DataTypes.STRING, allowNull: false },
  course: { type: DataTypes.INTEGER, allowNull: true },
  avatar: { type: DataTypes.STRING, allowNull: true },
});

export const Users_Rating = sequelize.define("users_rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
});

export const Sections = sequelize.define("sections", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  discipline: { type: DataTypes.STRING, allowNull: true },
});

export const Questions = sequelize.define("questions", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  header: { type: DataTypes.STRING, allowNull: false },
  markers: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  is_vip: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export const User_likes = sequelize.define("user_likes", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  is_liked: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export const Answers = sequelize.define("answers", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING, allowNull: false },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
});

Users.hasOne(Users_Personal_info, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Users_Personal_info.belongsTo(Users, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Users.hasOne(Users_Rating, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Users_Rating.belongsTo(Users, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Users.hasMany(User_likes, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
User_likes.belongsTo(Users, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Users.hasMany(Questions, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Questions.belongsTo(Users, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Questions.hasMany(Answers, {
  foreignKey: "questionId",
  onDelete: "CASCADE",
});
Answers.belongsTo(Questions, {
  foreignKey: "questionId",
  onDelete: "CASCADE",
});

Users.hasMany(Answers, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Answers.belongsTo(Users, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Sections.hasMany(Questions, {
  foreignKey: "sectionId",
  onDelete: "CASCADE",
});
Questions.belongsTo(Sections, {
  foreignKey: "sectionId",
  onDelete: "CASCADE",
});

Answers.hasMany(User_likes, {
  foreignKey: "answerId",
  onDelete: "CASCADE",
});
User_likes.belongsTo(Answers, {
  foreignKey: "answerId",
  onDelete: "CASCADE",
});

module.exports = {
  Users,
  Users_Personal_info,
  Users_Rating,
  Sections,
  Questions,
  User_likes,
  Answers,
};
