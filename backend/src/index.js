const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

routes(app);

mongoose
    .connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('Connect db thành công');
    })
    .catch((err) => {
        console.log('Connect db thất bại');
        console.log(err);
    });

app.listen(port, () => {
    console.log('server is running' + port);
});
