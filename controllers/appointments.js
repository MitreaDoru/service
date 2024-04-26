const Appointment = require('../models/appointment')
const Car = require('../models/car')
const { validationResult } = require('express-validator')

exports.postAddAppointment = (req, res, next) => {
    const contact = req.body.contact;
    const masina = req.body.masina;
    const actiuni = req.body.actiuni;
    const timpProgramare = req.body.timpProgramare;
    const primire = req.body.primire;
    const procesare = req.body.procesare;
    const durata = req.body.durata;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errorMessage: errors.array()[0].msg, oldInput: { contact, masina, actiuni, timpProgramare, primire, procesare, durata } });
    }
    const appointment = new Appointment({ contact, masina, actiuni, timpProgramare, primire, procesare, durata });
    appointment.save();
    res.json({
        message: 'Programare adaugata',
        appointment: {
            id: appointment._id.toString(),
            contact: appointment.contact,
            masina: appointment.masina,
            actiuni: appointment.actiuni,
            timpProgramare: appointment.timpProgramare,
            primire: appointment.primire,
            procesare: appointment.procesare,
            durata: appointment.durata
        }
    });
}
exports.postEditAppointment = (req, res, next) => {
    const id = req.body.id;
    const contact = req.body.contact;
    const masina = req.body.masina;
    const actiuni = req.body.actiuni;
    const timpProgramare = req.body.timpProgramare;
    const primire = req.body.primire;
    const procesare = req.body.procesare;
    const durata = req.body.durata;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errorMessage: errors.array()[0].msg, oldInput: { contact, masina, actiuni, timpProgramare, primire, procesare, durata } });
    }
    Appointment.findById(id)
        .then(appointment => {
            if (!appointment) {
                return res.json({ errorMessage: "Aceasta programare nu apare in baza de date" });
            } else {
                appointment.contact = contact;
                appointment.masina = masina;
                appointment.actiuni = actiuni;
                appointment.timpProgramare = timpProgramare;
                appointment.primire = primire;
                appointment.procesare = procesare;
                appointment.durata = durata;
                appointment.save();
                res.json({ message: 'Programare editata', editedAppointmentInfo: { contact, masina, actiuni, timpProgramare, primire, procesare, durata, id: id } });
            }
        });
}
exports.postDeleteAppointment = async (req, res, next) => {
    const id = req.body.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errorMessage: errors.array()[0].msg });
    } else {
        await Appointment.findByIdAndDelete(id);
        return res.json({ message: "Programare stearsa" });
    }
}
exports.postAddToCarHistory = (req, res, next) => {
    const id = req.body.id;
    const masina = req.body.masina;
    const actiuni = req.body.actiuni;
    const primire = req.body.primire;
    const procesare = req.body.procesare;
    const durata = req.body.durata;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errorMessage: errors.array()[0].msg });
    } else {
        Car.findOne({ numarInmatriculare: masina })
            .then(async car => {
                if (!car) {
                    return res.json({ errorMessage: "Masina nu este inregistrata in baza de date" });
                } else {
                    car.istoricService = [...car.istoricService, { actiuni, primire, procesare, durata }];
                    car.save();
                    await Appointment.findByIdAndDelete(id);
                    return res.json({ message: "Programare stearsa si scrisa in istoricul masinii" });
                }
            });
    }
}