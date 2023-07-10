const db = require('../models');
const TicketPrice = db.TicketPrice;

exports.create = (req, res) => {
    if (!req.body.ticketId || !req.body.date || !req.body.price) {
        res.status(400).send({
            message: "please provide all required fields!"
        });
        return;
    }

    const ticketPrice = {
        ticketId: req.body.ticketId,
        date: req.body.date,
        price: req.body.price
    };

    TicketPrice.create(ticketPrice)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the TicketPrice."
            });
        });
};

exports.update = (req, res) => {
    const ticketId = req.body.ticketId;
    const date = req.body.date;

    TicketPrice.update(req.body, {
        where: { ticketId: ticketId, date: date }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "TicketPrice was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update TicketPrice with ticketId=${ticketId} and date=${date}. Maybe TicketPrice was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating TicketPrice with ticketId=" + ticketId + " and date=" + date
        });
    });
};

exports.delete = (req, res) => {
    const ticketId = req.params.ticketId;
    const date = req.params.date;

    TicketPrice.destroy({
        where: { ticketId: ticketId, date: date }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "TicketPrice was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete TicketPrice with ticketId=${ticketId} and date=${date}. Maybe TicketPrice was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete TicketPrice with ticketId=" + ticketId + " and date=" + date
            });
        });
};

exports.findOne = (req, res) => {
    const ticketId = req.params.ticketId;
    const date = req.params.date;

    TicketPrice.findOne({
        where: { ticketId: ticketId, date: date }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `TicketPrice with ticketId=${ticketId} and date=${date} was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving TicketPrice with ticketId=" + ticketId + " and date=" + date
            });
        });
};

exports.findAll = (req, res) => {
    TicketPrice.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving ticket prices."
            });
        });
};

exports.findAllByTicket = (req, res) => {
    const ticketId = req.params.ticketId;

    TicketPrice.findAll({
        where: { ticketId: ticketId }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving TicketPrices with ticketId=" + ticketId
            });
        });
};
