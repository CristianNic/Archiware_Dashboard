import cookie from "react-cookie";

export function setCookie(minutes) {
	let d = new Date();
	d.setTime(d.getTime() + minutes * 60 * 1000);

	cookie.set("onboarded", true, { path: "/", expires: d });
}

// for example sending an email/notification can be logged in a cookie
// and loaded into state. If the react client is restarted the cookie will
// remember that an email was sent and won't send another
