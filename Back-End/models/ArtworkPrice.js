module.exports = (sequelize, DataTypes) => {
  class ArtworkPrice extends DataTypes.Model {}

  ArtworkPrice.init(
    {
      artwork_price_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'ArtworkT',
          key: 'artworkId'
        }
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'ArtwrokPriceT',
      timestamps: false,
      freezeTableName: true,
      underscored: false,
    }
  );

  return ArtworkPrice;
};
