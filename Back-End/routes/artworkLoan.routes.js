const express = require('express');
const router = express.Router();
const artworkLoanController = require('../controllers/ArtworkLoanController');

router.post('/api/artworkLoans', artworkLoanController.create);

router.get('/api/artworkLoans', artworkLoanController.findAll);

router.get('/api/artworkLoans/artwork/:artworkId', artworkLoanController.findAllByArtworkId);

router.get('/api/artworkLoans/partnership/:partnershipId', artworkLoanController.findAllByPartnershipId);

router.get('/api/artworkLoans/worker/:workerId', artworkLoanController.findAllByWorkerId);

router.get('/api/artworkLoans/active', artworkLoanController.findActiveLoans);

router.get('/api/artworkLoans/:artworkId/:partnershipId/:workerId', artworkLoanController.findOne);

router.put('/api/artworkLoans/:artworkId/:partnershipId/:workerId', artworkLoanController.update);

router.delete('/api/artworkLoans/:artworkId/:partnershipId/:workerId', artworkLoanController.delete);

module.exports = router;
