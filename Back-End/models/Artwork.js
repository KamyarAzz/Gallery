module.exports = (sequelize, DataTypes) => {
  class Artwork extends DataTypes.Model {}

  Artwork.init({
    artworkId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    artistId_artwork_fk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    salesStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'available'
    },
    description: {
      type: DataTypes.STRING(1500),
      allowNull: true
    },
    artworkName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Artwork',  //node
    tableName: 'ArtworkT',  //sql
    timestamps: false,
    underscored: false
  });

  return Artwork;
};
