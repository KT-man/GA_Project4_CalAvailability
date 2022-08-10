import { NextApiRequest, NextApiResponse } from "next";
import {
  getCookies,
  getCookie,
  setCookie,
  deleteCookie,
  hasCookie,
} from "cookies-next";

export default async function handler(req, res) {
  setCookie("server-key", "value", { req, res, maxAge: 60 * 60 * 24 * 30 });

  //   return res.json(getCookies({ req, res }));
  //   getCookies({ req, res });
  deleteCookie("cookie2", { req, res });

  return res.status(200).json({ message: "ok" });
}
