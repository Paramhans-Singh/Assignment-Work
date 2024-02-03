const twilio = require("twilio");
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_TOKEN;
const twilioPhoneNumber = process.env.PhoneNo;

const client = twilio(accountSid, authToken);

exports.makeVoiceCall = async (phoneNumber) => {
  try {
    const call = await client.calls.create({
      twiml:
        "<Response><Say>Your task is overdue. Please check your tasks.</Say></Response>",
      to: phoneNumber,
      from: twilioPhoneNumber,
    });

    console.log("Twilio Call SID:", call.sid);

    return call.sid ? true : false;
  } catch (error) {
    console.error("Error making Twilio voice call:", error.message);
    throw error;
  }
};
