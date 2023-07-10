const express = require('express');
const router = express.Router();
const ticketPriceController = require('../controllers/TicketPriceController');

router.post('/api/ticketPrices', ticketPriceController.create);

router.put('/api/ticketPrices', ticketPriceController.update);

router.delete('/api/ticketPrices/:ticketId/:date', ticketPriceController.delete);

router.get('/api/ticketPrices/:ticketId/:date', ticketPriceController.findOne);

router.get('/api/ticketPrices', ticketPriceController.findAll);

router.get('/api/ticketPrices/ticket/:ticketId', ticketPriceController.findAllByTicket);

module.exports = router;
