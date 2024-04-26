const appointmentsController = require('../controllers/appointments')
const Appointment = require('../models/appointment')
const express = require('express');
const router = express.Router();
const { body } = require('express-validator')


router.post('/addAppointment', [
    body('timpProgramare', 'Nume prea scurt').custom(async (value, { req }) => {
        const client = await Appointment.findOne({ timpProgramare: value });
        if (client) {
            throw new Error('Exista deja o programare la aceasta ora');
        }
        // else if (value[:2] === ("07" || "06" || "05" || "04" || "03" || "02" || "01" || "00")){

        // }
        return true
    }),
    // body('prenume', 'Prenume prea scurt').isLength({ min: 2 }),
    // body('telefon', 'Numar incorect').isLength({ min: 10 }),
], appointmentsController.postAddAppointment);
router.post('/editAppointment', appointmentsController.postEditAppointment);
router.post('/deleteAppointment', appointmentsController.postDeleteAppointment);
router.post('/addToCarHistory', appointmentsController.postAddToCarHistory);

module.exports = router