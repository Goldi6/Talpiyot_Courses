import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { getSimpleDate } from "utils/dates";

export default function UserData({ userData }) {
  return (
    <Box
      style={{
        borderRight: "1px solid #333",
        margin: "1rem",
        padding: "1rem",
      }}
    >
      <Typography variant="h3" style={{ paddingBottom: "2rem" }}>
        User Data
      </Typography>
      <Stack gap="1rem">
        <Typography>
          <b>first name:</b>{" "}
          <span className="capitalize">{userData.firstName}</span>
        </Typography>
        <Typography>
          <b>last name:</b>{" "}
          <span className="capitalize">{userData.lastName}</span>
        </Typography>
        <Typography>
          <b>email:</b> {userData.email}
        </Typography>
        <Typography>
          <b>Birth date:</b> {getSimpleDate(userData.birthday)}
        </Typography>
      </Stack>
    </Box>
  );
}
