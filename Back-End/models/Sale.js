module.exports = (sequelize, DataTypes) => {
    class Sale extends DataTypes.Model {}

    Sale.init({
        artworkId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'ArtworkT',
                key: 'artworkId'
            }
        },
        workerId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'WorkerT',
                key: 'workerId'
            }
        },
        nationalCode: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'VisitorT',
                key: 'nationalCode'
            }
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        paymentMethod: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        artistCommision: {
            type: DataTypes.DECIMAL(4,2),
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Sale',
        tableName: 'SaleT',
        timestamps: false,
        underscored: false
    });

    return Sale;
};
