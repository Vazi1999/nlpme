const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render("nlpme");
});

app.get('/thankYou', (req, res) => {
  res.render("thankYou");
});

app.post('/', (req, res) => {
    const name = req.body.fullName;
    const phone = req.body.phoneNumber;
  
    // Create a Nodemailer transporter object
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'morant.nlp@gmail.com',
        pass: 'lnkhysdhcdtmvvib'
      }
    });
  
    // Set up email data
    const mailOptions = {
      from: 'morant.nlp@gmail.com',
      to: 'morant.nlp@gmail.com',
      subject: 'New message from nlpme website!',
      text: `שם מלא : ${name}\n טלפון : ${phone}`

      
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.redirect("/thankYou");
  });

  
app.listen(process.env.PORT || 3000, () => console.log('Server started!!!!!!'));
