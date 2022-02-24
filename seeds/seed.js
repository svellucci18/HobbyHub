const sequelize = require("../config/connection");
const { User, Hobby, Category } = require("../models");

const userData = require("./userData.json");
const hobbyData = require("./hobbyData.json");
const categoryData = require("./categoryData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const category of categoryData) {
    await Category.create({
      ...category,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const hobby of hobbyData) {
    await Hobby.create({
      ...hobby,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();