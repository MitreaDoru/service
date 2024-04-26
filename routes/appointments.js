const appointmentsController = require('../controllers/appointments')
const express = require('express');
const router = express.Router();
const { body } = require('express-validator')


router.post('/addAppointment', [
    body('contact', 'Contact prea scurt').isLength({ min: 2 }),
    body('masina', 'Numar de masina este prea scurt').isLength({ min: 5 }),
], appointmentsController.postAddAppointment);
router.post('/editAppointment', appointmentsController.postEditAppointment);
router.post('/deleteAppointment', appointmentsController.postDeleteAppointment);
router.post('/addToCarHistory', appointmentsController.postAddToCarHistory);

module.exports = router