'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users, Orders}) {
      this.belongsTo(Users,{ foreignKey: 'user_id', as: 'user' })
      this.hasOne(Orders, { foreignKey: 'invoice_id', as: 'order'})
    }
  }
  Invoices.init({
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Invoices',
  });
  return Invoices;
};