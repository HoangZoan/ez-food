import {
  FormControl as MuiFormControl,
  FormLabel as MuiFormLabel,
  TextField as MuiTextField,
  TextFieldProps,
} from "@mui/material";
import React from "react";
import { styled } from "shared/theme";

export const FormControl = styled(MuiFormControl)(({ theme }) => [
  {
    display: "grid",
    gridTemplateColumns: "1fr",
    rowGap: theme.spacing(1),
  },
  theme.breakpoints.up("sm") && {
    gridTemplateColumns: "1fr 1.5fr",
  },
]);

export const FormLabel = styled(MuiFormLabel)({
  fontWeight: 700,
  lineHeight: "3.2rem",
  "&.Mui-focused": {
    color: "inherit",
  },
});

export const TextField = styled(MuiTextField)(({ theme }) => ({
  "& input": {
    paddingTop: "6px",
    paddingBottom: "6px",
    fontSize: "1.4rem",
    borderRadius: "9px",
  },
  "& input::placeholder": {
    fontSize: "1.2rem",
  },
  "& input.Mui-disabled": {
    backgroundColor: theme.palette.grey[200],
  },
}));

export const MultilineTextField = styled(
  React.forwardRef<HTMLDivElement | null, TextFieldProps>((props, ref) => (
    <TextField multiline minRows={2} ref={ref} maxRows={3} {...props} />
  ))
)({
  "& .MuiOutlinedInput-root": { padding: "0" },
  "& textarea[aria-invalid]": {
    padding: "0.6rem 1.4rem",
  },
});
