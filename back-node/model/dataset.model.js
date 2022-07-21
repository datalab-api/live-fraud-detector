const { truncate } = require('fs/promises');
const mongoose = require('mongoose');

const User = mongoose.model(
    "Dataset",
    new mongoose.Schema({
        id: { type: mongoose.ObjectId, unique: true },
        user_date_creation: { type: Date },
        user_hour_creation: { type: String },
        payment_date: { type: Date },
        payment_hour: { type: String },
        number_orders: { type: Number },
        adresse_changed_days: { type: Number },
        browsing_time_seconds: { type: Number },
        page_visited: { type: Number },
        number_ticket_opened: { type: Number },
        items: { type: Array },
        payment_provider: { type: String },
        card_nationality: { type: String },
        address_country: { type: String },
        delivery_address: { type: String },
        billing_country: { type: String },
        billing_address: { type: String },
        city: { type: String },
        zip: { type: String },
        province: { type: String },
        email: { type: String },
        dialling_code: { type: String },
        phone: { type: String },
        delivery_company: { type: String },
        delivery_place: { type: String },
        delivery_option: { type: String },
        voucher: { type: String },
        average_basket_price: { type: String },
        total: { type: String }
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

module.exports = User;

// cluster 