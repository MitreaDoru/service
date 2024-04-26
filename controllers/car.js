const Car = require('../models/car')
const { validationResult } = require('express-validator')

exports.postAddCar = (req, res, next) => {
    const id = req.body.clientId;
    const numarInmatriculare = req.body.numarInmatriculare;
    const serieSasiu = req.body.serieSasiu;
    const marca = req.body.marca;
    const model = req.body.model;
    const anulFabricatiei = req.body.anulFabricatiei;
    const tipMotorizare = req.body.tipMotorizare;
    const capacitateMotor = req.body.capacitateMotor;
    const caiPutere = req.body.caiPutere;
    const kWPutere = req.body.kWPutere;
    const istoricService = req.body.istoricService
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            errorMessage: errors.array()[0].msg, oldInput: {
                numarInmatriculare: numarInmatriculare,
                serieSasiu: serieSasiu,
                marca: marca,
                model: model,
                anulFabricatiei: anulFabricatiei,
                tipMotorizare: tipMotorizare,
                capacitateMotor: capacitateMotor,
                caiPutere: caiPutere,
                kWPutere: kWPutere,

            }
        });
    }
    const car = new Car({
        numarInmatriculare: numarInmatriculare,
        serieSasiu: serieSasiu,
        marca: marca,
        model: model,
        anulFabricatiei: anulFabricatiei,
        tipMotorizare: tipMotorizare,
        capacitateMotor: capacitateMotor,
        caiPutere: caiPutere ? caiPutere : kWPutere * 1.36,
        kWPutere: kWPutere ? kWPutere : caiPutere / 1.36,
        clientId: id
    });
    car.save()
    res.json({
        message: 'Masina adaugata', carAddedInfo: {
            carId: car._id.toString(),
            numarInmatriculare,
            serieSasiu,
            marca,
            model,
            anulFabricatiei,
            tipMotorizare,
            capacitateMotor,
            caiPutere: caiPutere ? caiPutere : kWPutere * 1.36,
            kWPutere: kWPutere ? kWPutere : caiPutere / 1.36,
        }
    });
}
exports.postEditCar = (req, res, next) => {
    const id = req.body.id;
    const numarInmatriculare = req.body.numarInmatriculare;
    const serieSasiu = req.body.serieSasiu;
    const marca = req.body.marca;
    const model = req.body.model;
    const anulFabricatiei = req.body.anulFabricatiei;
    const tipMotorizare = req.body.tipMotorizare;
    const capacitateMotor = req.body.capacitateMotor;
    const caiPutere = req.body.caiPutere;
    const kWPutere = req.body.kWPutere;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            errorMessage: errors.array()[0].msg, oldInput: {
                numarInmatriculare: numarInmatriculare,
                serieSasiu: serieSasiu,
                marca: marca,
                model: model,
                anulFabricatiei: anulFabricatiei,
                tipMotorizare: tipMotorizare,
                capacitateMotor: capacitateMotor,
                caiPutere: caiPutere,
                kWPutere: kWPutere,
            }
        });
    } else {
        Car.findById(id)
            .then(car => {
                car.numarInmatriculare = numarInmatriculare;
                car.serieSasiu = serieSasiu;
                car.marca = marca;
                car.model = model;
                car.anulFabricatiei = anulFabricatiei;
                car.tipMotorizare = tipMotorizare;
                car.capacitateMotor = capacitateMotor;
                car.caiPutere = caiPutere !== 0 ? caiPutere : kWPutere * 1.36;
                car.kWPutere = kWPutere !== 0 ? kWPutere : caiPutere / 1.36;
                car.save();
                res.json({
                    message: "Masina editata", carEditedInfo: {
                        carId: id,
                        numarInmatriculare,
                        serieSasiu,
                        marca,
                        model,
                        anulFabricatiei,
                        tipMotorizare,
                        capacitateMotor,
                        caiPutere: caiPutere !== 0 ? caiPutere : kWPutere * 1.36,
                        kWPutere: kWPutere !== 0 ? kWPutere : caiPutere / 1.36
                    }
                })
            });
    }
}
exports.postDeleteCar = async (req, res, next) => {
    id = req.body.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errorMessage: errors.array()[0].msg, oldInput: { nume: nume, prenume: prenume, telefon: telefon, email: email } });
    } else {
        await Car.findByIdAndDelete(id);
        return res.json({ message: "Car deleted" })
    }
}
