const mongoose = require('mongoose');

const Adress = mongoose.model(
    "Adress",
    new mongoose.Schema({
        adress:{type:String},
        name: {type:String},
        region: {type: String },
        city: {type: String },
        province: {type: String },
        gps_cordinates:{type:Array},
        ref_country: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Country"
        }
        },
        {timestamps: true}
    ).set("toJSON", {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.createdAt;
            delete ret.updateAt;
        },
    })
);

module.exports = Adress;