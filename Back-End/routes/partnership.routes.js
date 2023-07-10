const express = require('express');
const router = express.Router();
const partnershipController = require('../controllers/PartnershipController');

router.post('/api/partnerships', partnershipController.create);

router.get('/api/partnerships', partnershipController.findAll);

router.get('/api/partnerships/:id', partnershipController.findOne);

router.put('/api/partnerships/:id', partnershipController.update);

router.delete('/api/partnerships/:id', partnershipController.delete);

router.get('/api/partnerships/active', partnershipController.findActive);

module.exports = router;
