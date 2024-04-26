const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const clientController = require('../controllers/client');
const Client = require('../models/client');

router.post('/addClient', [
    body('nume', 'Nume prea scurt').isLength({ min: 2 }),
    body('prenume', 'Prenume prea scurt').isLength({ min: 2 }),
    body('telefon', 'Numar incorect').isLength({ min: 10 }),
    body('email', 'Email invalid').custom(async (value, { req }) => {
        const client = await Client.findOne({ email: value });
        if (client) {
            throw new Error('This email already exists!!!');
        }
        return true
    }),
], clientController.postAddClient);

router.post('/editClient', [
    body('nume', 'Nume prea scurt').isLength({ min: 2 }),
    body('prenume', 'Prenume prea scurt').isLength({ min: 2 }),
    body('telefon', 'Numar incorect').isLength({ min: 10 }),
    body('email', 'Email invalid').custom(async (value, { req }) => {
        const client = await Client.findOne({ email: value });
        if (client) {
            throw new Error('This email already exists!!!');
        }
        return true
    }),
], clientController.postEditClient);

router.post('/deleteClient', clientController.postDeleteClient);

module.exports = router