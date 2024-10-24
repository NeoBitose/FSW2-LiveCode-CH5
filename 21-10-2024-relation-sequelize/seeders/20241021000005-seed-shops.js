'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const shops = [];
    const users = await queryInterface.sequelize.query(`SELECT id FROM "Users";`);
    const products = await queryInterface.sequelize.query(`SELECT id FROM "Products";`);
    const userIds = users[0];
    const productIds = products[0];

    for (let i = 0; i < 100; i++) {
      shops.push({
        name: faker.company.name(),
        productId: productIds[i % productIds.length].id,
        userId: userIds[i % userIds.length].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Shops', shops, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Shops', null, {});
  }
};
