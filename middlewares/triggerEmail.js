// 'use strict';

// const {sendEmail} = require('./middlewares/emailer');
// const {emailParams} = require('./.env');

// const errorSeverity = () => (req, res, next, err) =>{
//   ///if the error is a FooError or BarError
//   if (err instanceof FooError || err instanceof BarError){
//     console.log('an error was encountered and an email should be sent');
//     ///log something
//     ///format email:
//    const {emailData} =
//       {
//        from: "foo@bar.com",
//        to: "bizz@bang.com, marco@polo.com",
//        subject: "Hello world",
//        text: "Plain text content",
//        html: "<p>HTML version</p>"
//       }
//     sendEmail();
//   }
//   next();
// }


// module.exports={errorSeverity};