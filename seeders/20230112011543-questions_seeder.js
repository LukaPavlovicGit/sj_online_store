'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Questions', [
      {
        question: 'Question 1',
        answer: 'Answer 1'
      },
      {
        question: 'Question 2',
        answer: 'Answer 2'
      },
      {
        question: 'Question 3',
        answer: 'Answer 3'
      },
      {
        question: 'Question 4',
        answer: 'Answer 4'
      },
      {
        question: 'Question 5',
        answer: 'Answer 5'
      },
      {
        question: 'Question 6',
        answer: 'Answer 6'
      }
    ], {})

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions',null, {})
  }
};
