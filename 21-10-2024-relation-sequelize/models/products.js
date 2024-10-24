'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.hasMany(models.Shops, { foreignKey: 'productId', as: 'shop' });
    }
  }
  Products.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product name is required"
        }
      }
    },
    images: DataTypes.ARRAY(DataTypes.TEXT),
    stock: DataTypes.INTEGER,
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 5000,
          msg: "Minimal price must be 5000 IDR"
        }
      },
    }
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};