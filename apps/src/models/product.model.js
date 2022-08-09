const mongoose = require('mongoose');

const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        name: { type: String },
        quantity: { type: Number, max:5 }
    },
        { timestamps: true }
    ).set("toJSON", {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.updateAt;
        },
    })
);

module.exports = Product;

