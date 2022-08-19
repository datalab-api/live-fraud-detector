const { truncate } = require('fs/promises');
const mongoose = require('mongoose');
const { type } = require('os');

let counter = 1;
let CountedId = { type: Number, default: () => counter++ };


const Dataset = mongoose.model(
    "Dataset",
    new mongoose.Schema({
        account_id: { type: Number, min:0, max:80000},
        user_date_creation: { type: String },
        payment_date: { type: String },
        addresse_changed_days: { type: Number, default: 0 },
        browsing_time_seconds: { type: Number, min : 10, max: 3600 },
        page_visited: { type: Number },
        number_ticket_opened: { type: Number },
        number_previous_orders : { type: Number },
        items: { type: Array },
        payment_provider: { type: String },
        card_nationality: { type: String },
        delivery_address: { type: Object },
        billing_country: { type: String },
        billing_address: { type: Object },
        email: { type: String },
        type: { type: String },
        email_changed_days: { type: Number, default: 0},
        delivery_company: { type: String },
        delivery_place: { type: String },
        delivery_option: { type: String },
        voucher: { type: Boolean, default: false },
        subscription: { type: Boolean, default: false },
        total: { type: String}
    },
        { timestamps: true }
    ).set("toJSON", {
        getters: true,
        minimize: false,
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.createdAt;
            delete ret.type;
            delete ret.updatedAt;            
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