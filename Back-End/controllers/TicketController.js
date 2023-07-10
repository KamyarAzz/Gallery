const db = require('../models');
const Ticket = db.Ticket;

exports.create = (req, res) => {
    if (!req.body.exhibitionId || !req.body.nationalCode || !req.body.purchaseDate) {
        res.status(400).send({
            message: "please provide all required fields!"
        });
        return;
    }

    const ticket = {
        exhibitionId: req.body.exhibitionId,
        nationalCode: req.body.nationalCode,
        purchaseDate: req.body.purchaseDate,
    };

    Ticket.create(ticket)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Ticket."
            });
        });
};

exports.createMultiple = (req, res) => {
    const exhibitionId = req.body.exhibitionId;
    const count = req.body.count;

    for(let i = 0; i < count; i++) {
        Ticket.create({ exhibitionId })
            .then(data => {
                if(i === count - 1) {
                    res.send({message: "Tickets were created successfully!"});
                }
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Tickets."
                });
            });
    }
};

exports.delete = (req, res) => {
    const ticketId = req.params.ticketId;

    Ticket.destroy({
        where: { ticketId: ticketId }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Ticket was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Ticket with ticketId=${ticketId}. Maybe Ticket was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Ticket with ticketId=" + ticketId
        });
    });
};

exports.deleteAllByExhibition = (req, res) => {
    const exhibitionId = req.params.exhibitionId;

    Ticket.destroy({
        where: { exhibitionId: exhibitionId }
    })
    .then(num => {
        res.send({
            message: `${num} Tickets were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Tickets with exhibitionId=" + exhibitionId
        });
    });
};

exports.update = (req, res) => {
    const ticketId = req.params.ticketId;

    Ticket.update(req.body, {
        where: { ticketId: ticketId }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Ticket was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Ticket with ticketId=${ticketId}. Maybe Ticket was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Ticket with ticketId=" + ticketId
        });
    });
};

exports.findAll = (req, res) => {
    Ticket.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Tickets."
        });
    });
};

exports.findAllByExhibition = (req, res) => {
    const exhibitionId = req.params.exhibitionId;

    Ticket.findAll({
        where: { exhibitionId: exhibitionId }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Tickets."
        });
    });
};

exports.findAllByVisitor = (req, res) => {
    const nationalCode = req.params.nationalCode;

    Ticket.findAll({
        where: { nationalCode: nationalCode }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Tickets."
        });
    });
};

exports.findAllByExhibitionWithoutVisitor = (req, res) => {
    const exhibitionId = req.params.exhibitionId;

    Ticket.findAll({
        where: {
            exhibitionId: exhibitionId,
            nationalCode: null
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Tickets."
        });
    });
};
