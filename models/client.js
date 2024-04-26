const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema(
    {
        nume: {
            type: String,
            required: true
        },
        prenume: {
            type: String,
            required: true
        },
        telefon: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        carsIds: {
            type: Schema.Types.ObjectId,
            ref: 'Car',
            required: false
        }

    }
)

module.exports = mongoose.model("Client", clientSchema);