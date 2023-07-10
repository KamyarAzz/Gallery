module.exports = (sequelize, DataTypes) => {
    class RoomExhibitionAssociation extends DataTypes.Model {}

    RoomExhibitionAssociation.init({
        exhibitionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'ExhibitionT',
                key: 'exhibitionId'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION',
        },
        roomNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'RoomT',
                key: 'roomNumber'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION',
        }
    }, {
        sequelize,
        modelName: 'RoomExhibitionAssociation',
        tableName: 'RoomExhibitionAssociationT',
        timestamps: false,
        underscored: false
    });

    return RoomExhibitionAssociation;
};
