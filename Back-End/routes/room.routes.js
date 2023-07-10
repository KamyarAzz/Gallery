const express = require('express');
const router = express.Router();
const roomController = require('../controllers/RoomController');

router.post('/api/rooms', roomController.create);

router.get('/api/rooms', roomController.findAll);

router.get('/api/rooms/:number', roomController.findOne);

router.put('/api/rooms/:number', roomController.update);

router.delete('/api/rooms/:number', roomController.delete);

module.exports = router;
