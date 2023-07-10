module.exports = (sequelize, DataTypes) => {
  class ArtworkLocation extends DataTypes.Model {}

  ArtworkLocation.init(
    {
      artworkId_location_fk: {
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
      location: {
        type: DataTypes.STRING(256),
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'ArtworkLocationT',
      timestamps: false,
      freezeTableName: true,
      underscored: false,
    }
  );

  return ArtworkLocation;
};
