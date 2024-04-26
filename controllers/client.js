const Client = require('../models/client')
const Car = require('../models/car')
const { validationResult } = require('express-validator')
exports.postAddClient = (req, res, next) => {
    const nume = req.body.nume;
    const prenume = req.body.prenume;
    const telefon = req.body.telefon;
    const email = req.body.email;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errorMessage: errors.array()[0].msg, oldInput: { nume: nume, prenume: prenume, telefon: telefon, email: email } });
    } else {
        const client = new Client({ nume: nume, prenume: prenume, telefon: telefon, email: email });
        res.json({ message: 'Client adaugat', clientId: client._id.toString() });
        return client.save();
    }
}
exports.postEditClient = (req, res, next) => {
    const nume = req.body.nume;
    const prenume = req.body.prenume;
    const telefon = req.body.telefon;
    const email = req.body.email;
    const id = req.body.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errorMessage: errors.array()[0].msg, oldInput: { nume: nume, prenume: prenume, telefon: telefon, email: email } });
    } else {
        Client.findById(id)
            .then(client => {
                if (!client) {
                    return res.json({ errorMessage: "Clientul nu se mai afla in baza de date" });
                } else {
                    client.nume = nume;
                    client.prenume = prenume;
                    client.telefon = telefon;
                    client.email = email;
                    client.save()
                    res.json({ message: 'Client editat', editedClientInfo: { nume: nume, prenume: prenume, telefon: telefon, email: email, id: id } })
                }
            });
    }
}
exports.postDeleteClient = async (req, res, next) => {
    const id = req.body.clientId;
    let carId = ''
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errorMessage: errors.array()[0].msg, oldInput: { nume: nume, prenume: prenume, telefon: telefon, email: email } });
    } else {
        await Client.findByIdAndDelete(id)
        await Car.findOne({ clientId: id })
            .then(car => {
                carId = car._id.toString()
            })
        await Car.findByIdAndDelete(carId)
        return res.json({ message: "Client sters" })
    }
}