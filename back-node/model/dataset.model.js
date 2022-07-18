const mongoose = require('mongoose');

const User = mongoose.model(
    "Dataset",
    new mongoose.Schema({
        username:{type:String, unique:true},
        email: String,
        password: String,        
        {timestamps: true}
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