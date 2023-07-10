const express = require('express');
const router = express.Router();
const artworkExhibitionAssociationController = require('../controllers/artworkExhibitionAssociationController');

router.post('/api/artworkExhibitionAssociations', artworkExhibitionAssociationController.create);

router.get('/api/artworkExhibitionAssociations', artworkExhibitionAssociationController.findAll);

router.get('/api/artworkExhibitionAssociations/one/:exhibitionId/:artworkId', artworkExhibitionAssociationController.findOne);

router.delete('/api/artworkExhibitionAssociations/:exhibitionId/:artworkId', artworkExhibitionAssociationController.delete);

router.post('/api/artworkExhibitionAssociations/multiple', artworkExhibitionAssociationController.createMultiple);

router.get('/api/artworkExhibitionAssociations/artworks/:exhibitionId', artworkExhibitionAssociationController.findAllByExhibition);

router.get('/api/artworkExhibitionAssociations/exhibitions/:artworkId', artworkExhibitionAssociationController.findAllByArtwork);

module.exports = router;
