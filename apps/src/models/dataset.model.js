const { truncate } = require('fs/promises');
const mongoose = require('mongoose');

let counter = 1;
let CountedId = { type: Number, default: () => counter++ };


const Dataset = mongoose.model(
    "Dataset",
    new mongoose.Schema({
        account_id: { type: Number, default: () => counter++ },
        user_date_creation: { type: Date },
        user_hour_creation: { type: String },
        payment_date: { type: Date },
        payment_hour: { type: String },
        adresse_changed_days: { type: Number },
        browsing_time_seconds: { type: Number },
        page_visited: { type: Number },
        number_ticket_opened: { type: Number },
        items: { type: Array },
        payment_provider: { type: String },
        card_nationality: { type: String },
        address_country: { type: String },
        delivery_address: { type: Object },
        billing_country: { type: String },
        billing_address: { type: Object },
        email: { type: String },
        email_changed_days: { type: String },
        delivery_company: { type: String },
        delivery_place: { type: String },
        delivery_option: { type: String },
        voucher: { type: Boolean, default: false },
        subscription: { type: Boolean, default: false },
        total: { type: mongoose.Types.Decimal128, min: 80, max: 800 }
    },
        { timestamps: true }
    ).set("toJSON", {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.createdAt;
        },
    })
);


Dataset.find({ id: { $gt: 0 } }).sort({ id: -1 })
    .then(([first, ...others]) => {
        if (first)
            counter = first.id + 1;
    });
module.exports = Dataset;

// cluster 