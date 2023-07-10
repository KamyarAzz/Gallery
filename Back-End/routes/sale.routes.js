const express = require('express');
const salesController = require('../controllers/SaleController.js');
const router = express.Router();

router.post('/api/sales', salesController.create);

router.get('/api/sales', salesController.findAll);

router.get('/api/sales/:artworkId/:workerId/:nationalCode', salesController.find);

router.put('/api/sales/:artworkId/:workerId/:nationalCode', salesController.update);

router.delete('/api/sales/:artworkId/:workerId/:nationalCode', salesController.delete);

router.get('/api/sales/visitor/:nationalCode', salesController.findByVisitor);

router.get('/api/sales/worker/:workerId', salesController.findByWorker);

router.get('/api/sales/sum', salesController.findAllWithSum);

router.get('/api/sales/date/:date', salesController.findByDateWithSum);

module.exports = router;
