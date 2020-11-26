var express = require('express');
const UserModels = require('../models/User_Model');
const bcrypt = require('bcrypt');
const jsonToken = require('jsonwebtoken');
var ls = require('local-storage');
const saltRounds = 10;

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\$&');
};
module.exports.main = function(req, res) {
    link = req.originalUrl;
    main = 'users/main';
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi')
        UserModels.find({ username: regex }).sort({ _id: -1 }).exec((err, data) => {
            if (err) {
                console.log(err)
            } else {
                res.render('users/main', { data: data });
            }
        })
    } else {

        UserModels.find().sort({ _id: -1 }).exec((err, data) => {
            if (err) {
                console.log(err)
            } else {
                res.render('users/main', { data: data });
            }
        })
    }
};
module.exports.add = function(request, response) {
    response.render('users/add')
};
module.exports.postAdd = function(req, res) {
    var errors = [];
    // if (req.body.Firstname == '') {
    //     res.renderFile('users/add', { error: 'Hãy điền tên' })
    // }
    // if (!req.body.phone) {
    //     errors.push('Hãy điền Số điiện thoại');
    // }
    // if (!req.body.Lastname) {
    //     errors.push('Hãy điền Họ');
    // }
    // if (!req.body.username) {
    //     errors.push('Hãy điền username');
    // }
    // if (!req.body.Password) {
    //     errors.push('Hãy điền password');
    // }
    // if (!req.body.email) {
    //     errors.push('Hãy điền email');
    // }

    // if (!req.body.DOB) {
    //     errors.push('Hãy điền ngày sinh');
    // }
    // if (!req.body.address) {
    //     errors.push('Hãy điền địa chỉ');
    // }
    // if (!req.body.cmnd) {
    //     errors.push('Hãy điền Số chứng minh nhân dân');
    // }
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
module.exports.delete = (req, res) => {
    UserModels.findByIdAndDelete({ _id: req.body.id }, (err, data) => {
        if (err) {
            res.send({ kq: 0, err: err })
        } else {
            res.send({ kq: 1, data: data });
        }
    });
}
module.exports.edit = async(req, res) => {
    var data = {}
    data.user = await UserModels.findById(req.params.id).catch(err => {
        res.send(err);
    })
    res.render('users/edit', data);
}
module.exports.editPost = (req, res) => {
    const hash = req.body.Password;
    var pass = UserModels.findOne({ _id: req.body.id }).exec((err, data) => {
        return data.password;
    })
    bcrypt.compare(pass, hash,
        function(err, result) {
            obj = {
                First_name: req.body.Firstname,
                Last_Name: req.body.Lastname,
                username: req.body.username,
                password: result,
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
            UserModels.updateOne({ _id: req.body.id }, obj, (err, data) => {
                res.redirect('/users');
            })
        });
}
module.exports.login = (req, res) => {
    res.render('users/login');
}
module.exports.loginPost = (req, res) => {
    UserModels.find({ username: req.body.username }).exec((err, data) => {
        if (err) {
            res.send({ kq: 0, err: err })
        } else {
            if (data === '') {
                res.send({ kq: 0, err: 'Nguoi dung khong ton tai' });
            } else {
                UserModels.find({ password: req.body.password }).exec((err, data) => {
                    if (err) {
                        res.send({ kq: 0, err: err })
                    } else {
                        if (data === '') {
                            res.send({ kq: 0, err: 'Hay dien password' })
                        } else {
                            payload = {
                                First_name: data.Firstname,
                                Last_Name: data.Lastname,
                                username: data.username,
                                password: data.password,
                                email: data.email,
                                Gender: data.Gender,
                                DOB: data.DOB,
                                role: data.role,
                                address: data.address,
                                CMND: data.cmnd,
                                District: data.District,
                                City: data.City,
                                phone: data.phone
                            }
                            seretKey = '#@gt';
                            token = jsonToken.sign(payload, seretKey, { expiresIn: 60 });
                            ls.set('save', token);
                            console.log(token);
                            res.send({ kq: 1, data: data });
                        }
                    }
                })
            }
        }
    })
}