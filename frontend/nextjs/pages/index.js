import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";

import InputComponent from "../Components/InputComponent";
import LengthComponent from "../Components/LengthComponent";

export default function Index() {
  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
          <Link href="/about" color="secondary">
            Go to the about page
          </Link>
          <InputComponent></InputComponent>
          <LengthComponent></LengthComponent>
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
