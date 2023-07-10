const express = require('express');
const router = express.Router();
const artworkController = require('../controllers/ArtworkController');

router.post('/api/artworks', artworkController.create);

router.get('/api/artworks', artworkController.findAll);

router.get('/api/artworks/:id', artworkController.findOne);

router.put('/api/artworks/:id', artworkController.update);

router.delete('/api/artworks/:id', artworkController.delete);

router.get('/api/artworks/artist/:artistId', artworkController.findAllByArtist);

module.exports = router;
