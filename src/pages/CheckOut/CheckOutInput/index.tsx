import {
  FormControl,
  FormLabel,
  MultilineTextField,
  TextField,
} from "components/UI/FormComponents";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface CheckoutInputProps {
  id: string;
  label: string;
  inputName: string;
  error: boolean;
  errorMessage: string;
  register: UseFormRegister<FieldValues>;
  multiline?: boolean;
}

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
