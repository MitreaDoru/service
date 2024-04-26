const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema(
    {
        numarInmatriculare: {
            type: String,
            required: true
        },
        serieSasiu: {
            type: String,
            required: true
        },
        marca: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        anulFabricatiei: {
            type: Number,
            required: true
        },
        tipMotorizare: {
            type: String,
            required: true
        },
        capacitateMotor: {
            type: Number,
            required: true
        },
        caiPutere: {
            type: Number,
            required: true
        },
        kWPutere: {
            type: Number,
            required: true
        },
        istoricService: [{
            actiuni: { type: String, required: false },
            primire: { type: String, required: false },
            procesare: { type: String, required: false },
            durata: { type: Number, required: false },
        }],
        clientId: {
            type: Schema.Types.ObjectId,
            ref: 'Car',
            required: true
        }

    }
)

module.exports = mongoose.model("Car", carSchema);