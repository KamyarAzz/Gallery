module.exports = (sequelize, DataTypes) => {
    class Room extends DataTypes.Model {}

    Room.init({
        roomNumber: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        lightingCondition: {
            type: DataTypes.STRING(1024),
            allowNull: true
        },
        airConditioningSystem: {
            type: DataTypes.STRING(1024),
            allowNull: true
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
        modelName: 'Room',
        tableName: 'RoomT',
        timestamps: false,
        underscored: false
    });

    return Room;
};
