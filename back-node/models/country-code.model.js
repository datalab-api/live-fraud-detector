const mongoose = require('mongoose');

const Country = mongoose.model(
    "Country",
    new mongoose.Schema({
        dial_code:{type:String},
        name: {type:String,unique:true},
        code: {type:String}
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

module.exports = Country;