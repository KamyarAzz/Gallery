module.exports = (sequelize, DataTypes) => {
    class ArtworkExhibitionAssociation extends DataTypes.Model {}

    ArtworkExhibitionAssociation.init({
        artworkId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        exhibitionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'ArtworkExhibitionAssociation',
        tableName: 'ArtworkExhibitionAssociationT',
        timestamps: false,
        underscored: false
    });

    return ArtworkExhibitionAssociation;
};