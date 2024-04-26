const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
    {
        contact: {
            type: String,
            required: true
        },
        masina: {
            type: String,
            required: true
        },
        actiuni: {
            type: String,
            required: false
        },
        timpProgramare: {
            type: String,
            required: false
        },
        primire: {
            type: String,
            required: false
        },
        procesare: {
            type: String,
            required: false
        },
        durata: {
            type: String,
            required: false
        },

    }
)

module.exports = mongoose.model("Appointment", appointmentSchema);