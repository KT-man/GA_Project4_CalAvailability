// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
require("dotenv").config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: "reallydedicatedtoga@gmail.com", // Change to your recipient
  from: process.env.SENDGRID_EMAIL, // Change to your verified sender
  subject: "Need to test one more time",
  html: `
    <html>
      <body>
        <div>
          <h1>You've been invited to the following event: {{ title }}</h1>
        </div>
        <div>
          <h2>Event Details</h2>
          <h3>Start Time: </h3>
          <h3>End Time: </h3>
        </div>
        <div>
          Please confirm your attendance!
          <span>
            <button>I am Attending!</button>
            <button onclick = alert("Please come...")>I am a social recluse</button>
          </span>
        </div>
      </body>
    </html>`,
};
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });
