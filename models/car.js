const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema(
    {
        numarInmatriculare: {
            type: String,
            required: false
        },
        serieSasiu: {
            type: String,
            required: false
        },
        marca: {
            type: String,
            required: false
        },
        model: {
            type: String,
            required: false
        },
        anulFabricatiei: {
            type: Number,
            required: false
        },
        tipMotorizare: {
            type: String,
            required: false
        },
        capacitateMotor: {
            type: Number,
            required: false
        },
        caiPutere: {
            type: Number,
            required: false
        },
        kWPutere: {
            type: Number,
            required: false
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