import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import * as React from "react";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router-dom";
import { ListItemLinkProps } from "./ListItemLink.types";

const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(
  itemProps,
  ref
) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

const ListItemLink = ({
  icon,
  to,
  children,
}: React.PropsWithChildren<ListItemLinkProps>) => {
  return (
    <ListItemButton component={Link} to={to}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      {children}
    </ListItemButton>
  );
};

export default ListItemLink;
