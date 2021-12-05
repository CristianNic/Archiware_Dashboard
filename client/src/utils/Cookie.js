import cookie from "react-cookie";

// TODO: Log when an email/slack notification was sent. The time can be
// retrieved and loaded into state. If the React client is restarted the 
// cookie will remember that an email was sent and won't send another.
// eg. Job warnings are sent once on slack as soon as they happen and 
// maybe emailed once more at the start of each day, as per client request.

export function setCookie(jobID, minutes) {
  const sent = Date.now();
  const date = new Date();
  // cookie expires after a set interval to send out another notification. 
  date.setTime(date.getTime() + minutes * 60 * 1000);
  
  cookie.set("notification", true, {
    job: jobID,
    sent: sent,
    expires: date
  });
}


