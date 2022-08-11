import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userCookie } from "../src/atoms/userCookies";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Link from "../src/Link";

import Head from "next/head";

export default function Index() {
  const [userCookies, setUserCookies] = useRecoilState(userCookie);
  const fetchCalendarCookie = async (url, config) => {
    try {
      const url = "http://localhost:3000/api/calendarID";
      const config = { method: "GET" };
      const cookieGenerator = await fetch(url, config);
      const cookieGeneratorData = await cookieGenerator.json();
      setUserCookies(cookieGeneratorData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCalendarCookie();
  }, []);

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <Container maxWidth="xl">
        <Box sx={{ my: 2, mx: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Calendar App
          </Typography>
          <br></br>
          <Link href="/calendarView" color="primary">
            View your calendar here!
          </Link>
          <br></br>
        </Box>
      </Container>
    </>
  );
}
