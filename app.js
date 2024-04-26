const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const clientRoutes = require('./routes/client');
const carRoutes = require('./routes/car');
const appointmentsRoutes = require('./routes/appointments');
const Client = require('./models/client');
const Car = require('./models/car');
const Appointment = require('./models/appointment');
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
const httpServer = require("http").createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.get('/clients', (req, res, next) => {
    Client.find()
        .then(clients => {
            const clientsInfo = [];
            clients.map(client => {
                clientsInfo.push({ nume: client.nume, prenume: client.prenume, telefon: client.telefon, email: client.email, clientId: client._id.toString() })
            })
            Car.find()
                .then(cars => {
                    if (!cars) {
                        res.json({ clients: clientsInfo })
                    }
                    const carsInfo = [];
                    cars.map(car => {
                        carsInfo.push({
                            numarInmatriculare: car.numarInmatriculare,
                            serieSasiu: car.serieSasiu,
                            marca: car.marca,
                            model: car.model,
                            anulFabricatiei: car.anulFabricatiei,
                            tipMotorizare: car.tipMotorizare,
                            capacitateMotor: car.capacitateMotor,
                            caiPutere: car.caiPutere,
                            kWPutere: car.kWPutere,
                            istoricService: car.istoricService,
                            clientId: car.clientId.toString(),
                            carId: car._id.toString()
                        })
                    })
                    res.json({ clients: clientsInfo, cars: carsInfo })
                })
        })

})
app.get('/appointments', (req, res, next) => {
    Appointment.find()
        .then(appointments => {
            if (!appointments) {
                const error = new Error('No client found');
                error.statusCode = 401;
                throw error;
            }
            const appointmentsInfo = [];
            appointments.map(appointment => {
                appointmentsInfo.push({ contact: appointment.contact, masina: appointment.masina, actiuni: appointment.actiuni, timpProgramare: appointment.timpProgramare, primire: appointment.primire, procesare: appointment.procesare, durata: appointment.durata, id: appointment._id.toString() })
            })
            res.json({ appointments: appointmentsInfo })
        })

})
app.use(clientRoutes);
app.use(carRoutes)
app.use(appointmentsRoutes)

mongoose.connect(MONGODB_URI)
    .then(result => {
        httpServer.listen(8000)
    }).catch(err => console.log(err))