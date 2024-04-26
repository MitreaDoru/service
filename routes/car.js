const carController = require('../controllers/car')
const express = require('express');
const router = express.Router();
const { body } = require('express-validator')


router.post('/addCar', carController.postAddCar);
router.post('/editCar', carController.postEditCar);
router.post('/deleteCar', carController.postDeleteCar);

module.exports = router