module.exports = (sequelize, DataTypes) => {
    class Exhibition extends DataTypes.Model {}

    Exhibition.init({
        exhibitionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        workerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Worker',
                key: 'workerId'
            }
        },
        name: {
            type: DataTypes.STRING(512),
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(2048),
            allowNull: true
        },
        visitorAttended: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        numberOfTickets: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Exhibition',
        tableName: 'ExhibitionT',
        timestamps: false,
        underscored: false
    });

    return Exhibition;
};
