import {
  FormControl as MuiFormControl,
  FormLabel as MuiFormLabel,
  TextField as MuiTextField,
  TextFieldProps,
} from "@mui/material";
import { styled } from "shared/theme";

export const FormControl = styled(MuiFormControl)({
  display: "grid",
  gridTemplateColumns: "1fr 1.5fr",
});

export const FormLabel = styled(MuiFormLabel)({
  fontWeight: 700,
  lineHeight: "3.2rem",
});

export const TextField = styled(MuiTextField)({
  "& input": {
    paddingTop: "6px",
    paddingBottom: "6px",
    fontSize: "1.4rem",
  },
});

export const MultilineTextField = styled((props: TextFieldProps) => (
  <TextField multiline minRows={2} maxRows={3} {...props} />
))({
  "& .MuiOutlinedInput-root": { padding: "0" },
  "& textarea[aria-invalid]": {
    padding: "0.6rem 1.4rem",
  },
});
