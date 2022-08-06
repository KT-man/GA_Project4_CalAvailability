import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Link from "../src/Link";

import Head from "next/head";

import InputComponent from "../src/Components/InputComponent";
import LengthComponent from "../src/Components/LengthComponent";

export default function Index() {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <Container maxWidth="xl">
        <Box sx={{ my: 2, mx: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
          <Link href="/about" color="secondary">
            Go to the about page
          </Link>
          <br></br>
          <br></br>

          <InputComponent></InputComponent>
          <LengthComponent></LengthComponent>
        </Box>
      </Container>
    </>
  );
}
