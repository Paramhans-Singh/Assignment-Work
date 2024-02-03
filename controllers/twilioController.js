const twilio = require("twilio");

const accountSid = "ACb51806d60d7a88d4ff96669c6a9bc019";
const authToken = "31d00d7120a776c6fa87a1e1924db3a8";
const twilioPhoneNumber = "9810963305";

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
