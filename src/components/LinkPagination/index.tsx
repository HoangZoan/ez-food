import { PaginationItem } from "@mui/material";
import PagePagination from "components/PagePagination";
import { Link } from "react-router-dom";

interface Props {
  count: number;
  locationPath: string;
}

const LinkPagination = ({ count, locationPath }: Props) => {
  return (
    <PagePagination
      count={count}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`${locationPath}${`?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
};

export default LinkPagination;
