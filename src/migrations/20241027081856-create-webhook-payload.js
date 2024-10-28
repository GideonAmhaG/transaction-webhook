"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("webhook_payloads", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      amount: Sequelize.FLOAT,
      currency: Sequelize.STRING,
      created_at_time: Sequelize.INTEGER,
      timestamp: Sequelize.INTEGER,
      cause: Sequelize.STRING,
      full_name: Sequelize.STRING,
      account_name: Sequelize.STRING,
      invoice_url: Sequelize.STRING,
      received_at: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("webhook_payloads");
  },
};
