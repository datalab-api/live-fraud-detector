const mongoose = require('mongoose');

const GeoPostCode = mongoose.model(
    "GeoPostCode",
    new mongoose.Schema({
        name_of_the_municipality:{type:String},
        routing_label: {type:String,unique:true},
        code_postal: {type:Number },
        gps_cordinates:{type:Array},
        country: {
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

module.exports = GeoPostCode;