import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ReactElement } from "react";
import StyledButton from "../StyledButton";
import { IButtonProps } from "../StyledButton/StyledButton.types";
import "./ContinueButton.scss";

const ContinueButton = ({ type = "button" }: IButtonProps): ReactElement => {
  return (
    <StyledButton
      wrapperClassName="ContinueButton-wrapper"
      className="ContinueButton"
      icon={faArrowRight}
      type={type}
    />
  );
};

export default ContinueButton;
