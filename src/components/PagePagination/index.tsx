import React from "react";
import { Pagination, PaginationProps } from "@mui/material";
import { styled } from "shared/theme";

const PagePagination = styled((props: PaginationProps) => (
  <Pagination
    {...props}
    color="primary"
    shape="rounded"
    size="large"
    siblingCount={2}
    boundaryCount={0}
  />
))(({ theme }) => ({
  "& .MuiPaginationItem-ellipsis": { display: "none" },
  "& .MuiButtonBase-root:hover": {
    backgroundColor: theme.colors.background.primary,
  },
  "& .MuiButtonBase-root.Mui-selected:hover": {
    backgroundColor: theme.palette.primary.light,
  },
  "& .MuiPaginationItem-root.Mui-selected": {
    color: theme.palette.common.white,
  },
  "& .Mui-disabled": {
    display: "none",
  },
}));

export default PagePagination;
