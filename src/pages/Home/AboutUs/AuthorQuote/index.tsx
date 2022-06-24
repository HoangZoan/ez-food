import React from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { styled } from "shared/theme";

interface AuthorQuoteProps {
  message: string;
  author: string;
  avatarSrc: string;
}

const ContentBox = styled(Box)(({ theme }) => ({
  textAlign: "left",
  backgroundColor: theme.palette.secondary.dark,
  color: "white",
  padding: `${theme.spacing(8)} ${theme.spacing(5)}`,
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(5),
  },
}));

const AuthorQuote = ({ message, author, avatarSrc }: AuthorQuoteProps) => {
  return (
    <ContentBox>
      <Typography variant="h6" fontWeight={300} sx={{ mb: 5 }}>
        “{message}”
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={3}
      >
        <Avatar
          src={avatarSrc}
          alt={author}
          sx={{
            width: "6.4rem",
            height: "6.4rem",
            display: { xs: "block", md: "none" },
          }}
        />
        <Typography textAlign="right" variant="h6" fontWeight={700}>
          {author}
        </Typography>
      </Stack>
    </ContentBox>
  );
};

export default AuthorQuote;
