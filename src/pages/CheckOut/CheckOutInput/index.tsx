import {
  FormControl as MuiFormControl,
  FormLabel as MuiFormLabel,
  TextField as MuiTextField,
  TextFieldProps,
} from "@mui/material";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { styled } from "shared/theme";

interface CheckoutInputProps {
  id: string;
  label: string;
  inputName: string;
  error: boolean;
  errorMessage: string;
  register: UseFormRegister<FieldValues>;
  multiline?: boolean;
}

const FormControl = styled(MuiFormControl)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const FormLabel = styled(MuiFormLabel)({
  fontWeight: 700,
  alignSelf: "flex-start",
  lineHeight: "3.2rem",
});

const TextField = styled(MuiTextField)({
  flex: 1,
  maxWidth: "24rem",
  "& input": {
    paddingTop: "6px",
    paddingBottom: "6px",
    fontSize: "1.4rem",
  },
});

const MultilineTextField = styled((props: TextFieldProps) => (
  <TextField {...props} multiline minRows={2} maxRows={3} />
))({
  "& .MuiOutlinedInput-root": { padding: "0" },
  "& #address": {
    padding: "0.6rem 1.4rem",
  },
});

const CheckoutInput = ({
  id,
  label,
  inputName,
  register,
  error,
  errorMessage,
  multiline,
}: CheckoutInputProps) => {
  const TextFieldComponent = multiline ? MultilineTextField : TextField;

  return (
    <FormControl>
      <FormLabel htmlFor="full-name">{label}:</FormLabel>
      <TextFieldComponent
        id={id}
        inputProps={{ ...register(inputName, { required: true }) }}
        error={error}
        helperText={error && errorMessage}
      />
    </FormControl>
  );
};

export default CheckoutInput;
