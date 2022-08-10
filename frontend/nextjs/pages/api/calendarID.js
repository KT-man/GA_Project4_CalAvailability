import { NextApiRequest, NextApiResponse } from "next";
import {
  getCookies,
  getCookie,
  setCookie,
  deleteCookie,
  hasCookie,
} from "cookies-next";
const { v4: uuid4 } = require("uuid");

export default async function handler(req, res) {
  // Checks if cookie is there, if not, create cookie
  if (!getCookie("calendarId", { req, res })) {
    setCookie("calendarId", uuid4(), { req, res, maxAge: 60 * 60 * 24 * 30 });
  }

  return res.json(getCookie("calendarId", { req, res }));
  //   getCookies({ req, res });
  deleteCookie("cookie2", { req, res });
}
