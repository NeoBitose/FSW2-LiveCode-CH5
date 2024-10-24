'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [];

    for (let i = 0; i < 100; i++) {
      products.push({
        name: faker.commerce.productName(),
        stock: faker.number.int({ min: 10, max: 30}),
        price: faker.number.int({ min: 10000, max: 40000}),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Products', products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
