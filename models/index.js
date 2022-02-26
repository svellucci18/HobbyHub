const Category = require("./Category");
const Hobby = require("./Hobby");
const User = require("./User");

Hobby.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

Category.hasMany(Hobby, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

Category.belongsTo(User);
User.hasMany(Category);

Hobby.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

User.hasMany(Hobby, {
});


module.exports = {
  User,
  Hobby,
  Category,
};
