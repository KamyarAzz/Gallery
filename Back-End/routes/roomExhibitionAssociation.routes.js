const express = require('express');
const router = express.Router();
const roomExhibitionAssociationController = require('../controllers/RoomExhibitionAssociationController');

router.post('/api/roomExhibitionAssociations', roomExhibitionAssociationController.create);

router.delete('/api/roomExhibitionAssociations/:exhibitionId/:roomNumber', roomExhibitionAssociationController.delete);

router.post('/api/roomExhibitionAssociations/multiple', roomExhibitionAssociationController.createMultiple);

router.get('/api/roomExhibitionAssociations', roomExhibitionAssociationController.findAll);

router.get('/api/roomExhibitionAssociations/one/:exhibitionId/:roomNumber', roomExhibitionAssociationController.findOne);

router.get('/api/roomExhibitionAssociations/rooms/:exhibitionId', roomExhibitionAssociationController.findAllByExhibition);

router.get('/api/roomExhibitionAssociations/exhibitions/:roomNumber', roomExhibitionAssociationController.findAllByRoom);

module.exports = router;
