import { type MouseEventHandler, type PropsWithChildren } from "react";

export interface OverlayPropType extends PropsWithChildren {
  onClick?: MouseEventHandler;
}
