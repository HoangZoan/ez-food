import React from "react";
import { Chip, Stack } from "@mui/material";
import { SideDistType } from "shared/types";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "shared/theme";
import { Box } from "@mui/system";

interface SideDishChipsProps {
  items: SideDistType[];
  onDelete: (itemName: string) => void;
}

const DeleteIcon = styled((props) => (
  <Box {...props}>
    <CloseIcon sx={{ fontSize: "1.6rem", lineHeight: "1.6rem" }} />
  </Box>
))(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  transition: "all 0.2s",
  "&:hover": {
    backgroundColor: theme.colors.background.primary,
  },
}));

const SideDishChips = ({ items, onDelete }: SideDishChipsProps) => {
  return (
    <Stack direction="row" spacing={3}>
      {items.map(({ name }) => (
        <Chip
          color="primary"
          variant="outlined"
          key={name}
          label={name}
          sx={{
            borderRadius: "9px",
            fontSize: "1.4rem",
            "& .MuiChip-deleteIcon": {
              marginLeft: "0",
            },
          }}
          onDelete={() => onDelete(name)}
          deleteIcon={<DeleteIcon />}
        />
      ))}
    </Stack>
  );
};

export default SideDishChips;
