const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'books',
  },
  {
    category_name: 'music',
  },
  {
    category_name: 'movies',
  },
];

const seedCategorys = () => Category.bulkCreate(categoryData);

module.exports = seedCategorys;