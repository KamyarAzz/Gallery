module.exports = (sequelize, DataTypes) => {
  class ArtworkMaterial extends DataTypes.Model {}

  ArtworkMaterial.init(
    {
      artworkId_material_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'ArtworkT',
          key: 'artworkId'
        }
      },
      material: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true
      }
    },
    {
      sequelize,
      tableName: 'ArtworkMaterialT',
      timestamps: false,
      freezeTableName: true,
      underscored: false,
    }
  );

  return ArtworkMaterial;
};
