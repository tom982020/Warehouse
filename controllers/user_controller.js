var express = require('express');
const UserModels = require('../models/User_Model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports.main = function(req, res) {
    link = req.originalUrl;
    main = 'users/main';
    UserModels.find().sort({ _id: -1 }).exec((err, data) => {
        res.render('users/main', { data: data });
    })
};
module.exports.add = function(request, response) {
    response.render('users/add')
};
module.exports.postAdd = function(req, res) {
    var errors = [];
    if (req.body.Firstname == '') {
        res.renderFile('users/add', { error: 'Hãy điền tên' })
    }
    if (!req.body.phone) {
        errors.push('Hãy điền Số điiện thoại');
    }
    if (!req.body.Lastname) {
        errors.push('Hãy điền Họ');
    }
    if (!req.body.username) {
        errors.push('Hãy điền username');
    }
    if (!req.body.Password) {
        errors.push('Hãy điền password');
    }
    if (!req.body.email) {
        errors.push('Hãy điền email');
    }

    if (!req.body.DOB) {
        errors.push('Hãy điền ngày sinh');
    }
    if (!req.body.address) {
        errors.push('Hãy điền địa chỉ');
    }
    if (!req.body.cmnd) {
        errors.push('Hãy điền Số chứng minh nhân dân');
    }
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.Password, salt, (err, hash) => {
            obj = {
                First_name: req.body.Firstname,
                Last_Name: req.body.Lastname,
                username: req.body.username,
                password: hash,
                email: req.body.email,
                Gender: req.body.Gender,
                DOB: req.body.DOB,
                role: req.body.role,
                address: req.body.address,
                CMND: req.body.cmnd,
                District: req.body.District,
                City: req.body.City,
                phone: req.body.phone
            };

            UserModels.create(obj, (err, data) => {
                res.redirect('/users');
            });
        });
    });
};
module.exports.delete = async(req, res) => {
    await UserModels.findByIdAndDelete({ _id: req.body.id })
}