const mongoose = require('mongoose');

const Adress = mongoose.model(
    "Adress",
    new mongoose.Schema({
        state: String,
        name: String,
        region: String,
        city: String,
        prov: String,
        latt: String,
        longt: String,
        address: String
    },
        { timestamps: true }
    ).set("toJSON", {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.id;
            delete ret.createdAt;
            delete ret.updateAt;
        },
    })
);

module.exports = Adress;