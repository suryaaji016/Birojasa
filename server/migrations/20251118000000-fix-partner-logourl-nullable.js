"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Change logoUrl column to allow NULL values
    await queryInterface.changeColumn("Partners", "logoUrl", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert to NOT NULL (though this was the bug)
    await queryInterface.changeColumn("Partners", "logoUrl", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
