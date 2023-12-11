const path = require('path')
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
require('dotenv').config()




function createMailOption(to,subject,link){
    var mailOptions = {
        from: process.env.MAIL_USER,
        to: to,
        subject: subject,
        template: 'email',
        context: {
          link: link
        }
      
      }
      return mailOptions
}

function sendMail(to,subject,link){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD
        }
      });
    
      const handlebarOptions = {
        viewEngine: {
          extName: ".handlebars",
          partialsDir: path.resolve('./app/templates'),
          defaultLayout: false,
        },
        viewPath: path.resolve('./app/templates'),
        extName: ".handlebars",
      }
    console.log(path.resolve('./app/templates'))
    
    transporter.use('compile', hbs(handlebarOptions));
    transporter.sendMail(createMailOption(to,subject,link), function (error, info) {
        return error
      })
    console.log('oke')
}

module.exports = sendMail