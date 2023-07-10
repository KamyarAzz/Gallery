const db = require('../models');
const Exhibition = db.Exhibition;
const Ticket = db.Ticket;
const TicketPrice = db.TicketPrice;
const Worker = db.Worker;

exports.create = (req, res) => {
    if (!req.body.name || !req.body.workerId) {
        res.status(400).send({
            message: "Please provide all required fields!"
        });
        return;
    }

    const exhibition = {
        workerId: req.body.workerId,
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        visitorAttended: req.body.visitorAttended,
        numberOfTickets: req.body.numberOfTickets
    };

    Exhibition.create(exhibition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Exhibition."
            });
        });
};

exports.findAll = (req, res) => {
    Exhibition.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving exhibitions."
            });
        });
};

// inja darim tamame namayeshgahaii ke 1 worker create karde ro dar miarim
exports.findByWorker = (req, res) => {
    const workerId = req.params.workerId;
    Exhibition.findAll({where: {workerId: workerId}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Exhibitions with workerId=" + workerId
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Exhibition.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Exhibition with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Exhibition.update(req.body, {
        where: { exhibitionId: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Exhibition was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Exhibition with id=${id}. Maybe Exhibition was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Exhibition with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Exhibition.destroy({
        where: { exhibitionId: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Exhibition was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Exhibition with id=${id}. Maybe Exhibition was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Exhibition with id=" + id
            });
        });
};

exports.setPriceForUnsoldTickets = (req, res) => {
    const exhibitionId = req.params.exhibitionId;
    const newPrice = req.body.price;

    if(!newPrice) {
        res.status(400).send({ message: "New price must be provided!" });
        return;
    }

    Ticket.findAll({ where: { exhibitionId: exhibitionId, nationalCode: null }})
        .then(tickets => {
            if (!tickets) {
                res.status(404).send({ message: "No unsold tickets found for this exhibition!" });
                return;
            }

            tickets.forEach((ticket) => {
                TicketPrice.create({
                    ticketId: ticket.ticketId,
                    date: new Date(),
                    price: newPrice
                });
            });

            res.send({ message: "Price updated for all unsold tickets!" });
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating price for unsold tickets" });
        });
};
