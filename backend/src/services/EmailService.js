const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
var inlineBase64 = require('nodemailer-plugin-inline-base64');

const sentEmailCreateOrder = async (email, orderItems) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_ACCOUNT, // generated ethereal user
            pass: process.env.MAIL_PASSWORD, // generated ethereal password
        },
    });
    transporter.use('compile', inlineBase64({ cidPrefix: 'somePrefix_' }));

    let listItem = '';
    const attachImage = [];
    orderItems.forEach((order) => {
        listItem += `<div>
    <div>
      Bạn đã đặt sản phẩm <b>${order.name}</b> với số lượng: <b>${order.amount}</b> và giá là: <b>${order.price} VND</b></div>
      <div>Bên dưới là hình ảnh của sản phẩm</div>
    </div>`;
        attachImage.push({ path: order.image });
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: process.env.MAIL_ACCOUNT, // list of receivers
        subject: 'Cảm ơn bạn đã mua hàng tại nasa , chúc bạn mạnh khỏe', // Subject line
        text: 'Hello world?', // plain text body
        html: `<div><b>Cảm ơn bạn đã mua hàng tại nasa </b></div> ${listItem}`,
        attachments: attachImage,
    });
};

module.exports = {
    sentEmailCreateOrder,
};
