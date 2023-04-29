import { type FC, type ReactElement } from "react";
import "./Overlay.scss";
import { type OverlayPropType } from "./OverlayTypes";

const Overlay: FC<OverlayPropType> = ({ children, onClick }): ReactElement => {
  return (
    <div onClick={onClick} className="Overlay-container">
      {children}
    </div>
  );
};

export default Overlay;
