import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "shared/theme";

interface AuthorQuoteProps {
  message: string;
  author: string;
}

const ContentBox = styled(Box)(({ theme }) => ({
  textAlign: "left",
  backgroundColor: theme.palette.secondary.dark,
  color: "white",
  padding: `${theme.spacing(8)} ${theme.spacing(5)}`,
  borderRadius: theme.shape.borderRadius,
}));

const AuthorQuote = ({ message, author }: AuthorQuoteProps) => {
  return (
    <ContentBox>
      <Typography variant="h6" fontWeight={300} sx={{ mb: 5 }}>
        “{message}”
      </Typography>
      <Typography textAlign="right" variant="h6" fontWeight={700}>
        {author}
      </Typography>
    </ContentBox>
  );
};

export default AuthorQuote;
