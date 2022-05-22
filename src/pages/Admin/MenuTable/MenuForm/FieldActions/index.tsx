import { Button, Stack } from "@mui/material";

interface FieldActionsProps {
  onAdd: () => void;
  onRemove: () => void;
  addLabel: string;
  removeLabel?: string;
  showRemove: boolean;
}

const FieldActions = ({
  onAdd,
  addLabel,
  showRemove,
  onRemove,
  removeLabel = "Xóa bớt",
}: FieldActionsProps) => {
  return (
    <Stack direction="row" spacing={5}>
      <Button variant="outlined" onClick={onAdd}>
        {addLabel}
      </Button>
      {showRemove && (
        <Button variant="outlined" color="error" onClick={onRemove}>
          {removeLabel}
        </Button>
      )}
    </Stack>
  );
};

export default FieldActions;
