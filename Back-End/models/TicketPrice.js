module.exports = (sequelize, DataTypes) => {
    class TicketPrice extends DataTypes.Model {}

    TicketPrice.init({
        ticketId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'Ticket',
                key: 'ticketId'
            }
        },
        date: {
            type: DataTypes.DATE,
            primaryKey: true,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'TicketPrice',
        tableName: 'TicketPriceT',
        timestamps: false,
        underscored: false
    });

    return TicketPrice;
};
