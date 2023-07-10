const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/VisitorController');

router.post('/api/visitors', visitorController.create);

router.get('/api/visitors', visitorController.findAll);

router.get('/api/visitors/:nationalCode', visitorController.findOne);

router.put('/api/visitors/:nationalCode', visitorController.update);

router.delete('/api/visitors/:nationalCode', visitorController.delete);

module.exports = router;
