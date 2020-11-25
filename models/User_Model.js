const mongoose = require('mongoose');

// Tạo cấu trúc cho collection
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    First_name: String,
    Last_Name: String,
    username: {
        type: String,
        unique: true
    },
    password: String,
    email: {
        type: String,
        unique: true
    },
    Gender: Number,
    DOB: Date,
    phone: {
        type: String,
        unique: true
    },
    address: String,
    role: Number,
    CMND: Number,
    District: String,
    City: String,
    status: {
        type: Boolean,
        default: false
    },
    draft: {
        type: Boolean,
        default: false
    }
});

// Tạo collection
module.exports = mongoose.model('user', UserSchema);