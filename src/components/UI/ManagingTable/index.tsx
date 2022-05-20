import { styled } from "shared/theme";
import { TableCell as MuiTableCell, TableRow } from "@mui/material";

export const TableCell = styled(MuiTableCell)({
  fontSize: "1.6rem",
  borderColor: "transparent",
});

export const TableCellHead = styled(MuiTableCell)(({ theme }) => ({
  fontSize: "1.6rem",
  borderColor: theme.palette.primary.main,
  paddingTop: "0.8rem",
  paddingBottom: "0.8rem",
}));

export const TableBodyRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.colors.background.primary,
  },
}));
