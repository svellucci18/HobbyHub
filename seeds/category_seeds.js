const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'books',
  },
  {
    tag_name: 'music',
  },
  {
    tag_name: 'movies',
  },
];

const seedTags = () => Category.bulkCreate(categoryData);

module.exports = seedTags;