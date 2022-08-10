import { NextApiRequest, NextApiResponse } from "next";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
const { v4: uuid4 } = require("uuid");

export default async function handler(req, res) {
  // Checks if cookie is there, if not, create cookie
  if (!getCookie("calendarId", { req, res })) {
    setCookie("calendarId", uuid4(), { req, res, maxAge: 60 * 60 * 24 * 30 });

    const generatedCookie = getCookie("calendarId", { req, res });

    return res.json({
      status: "ok, cookie generated",
      cookie_value: generatedCookie,
    });
  } else {
    const existingCookie = getCookie("calendarId", { req, res });
    return res.json({
      status: "cookie already exists",
      cookie_value: existingCookie,
    });
  }

  //   getCookies({ req, res });
  deleteCookie("cookie2", { req, res });
}
