// gọi mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:ltIx1eUREA9wKgwk@cluster0.lr2un.mongodb.net/dbNhaKho?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    // thành công
    .then(() => console.log('Kết nối DB thành công'))
    // thất bại, báo lỗi
    .catch((err) => console.log(err));