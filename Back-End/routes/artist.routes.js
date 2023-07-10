const express = require('express');
const router = express.Router();
const artists = require('../controllers/ArtistController');

router.post('/api/artist', artists.create);

router.get('/api/artist', artists.findAll);

router.get('/api/artist/:id', artists.find);

router.put('/api/artist/:id', artists.update);

router.delete('/api/artist/:id', artists.delete);

module.exports = router;
