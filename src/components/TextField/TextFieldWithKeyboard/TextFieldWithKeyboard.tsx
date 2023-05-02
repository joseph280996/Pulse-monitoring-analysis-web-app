import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { ReactElement, useState, useRef } from "react";
import StyledButton from "../../Button";
import Overlay from "../../Overlay";
import TextField from "../TextField";
import { ITextFieldProps } from "../TextFieldTypes";
import "./TextFieldWithKeyboard.scss";

interface ITextFieldWithKeyboard extends ITextFieldProps {
}

const TextFieldWithKeyboard = ({
  onChange,
  className,
  ...textFieldProps
}: ITextFieldWithKeyboard): ReactElement => {
  const [isOpenOverLay, setIsOpenOverlay] = useState<boolean>(false);
  return (
    <div>
      {isOpenOverLay && (
        <Overlay>
          <div className="TextFieldWithKeyboard-overlayInner">
            <div className="TextFieldWithKeyboard-fieldAndCloseButton">
              <TextField
                className={classNames("TextFieldWithKeyboard-field", className)}
                onChange={(event) => {
                  event.stopPropagation();
                  //onChange((event.target as HTMLInputElement).value);
                }}
                {...textFieldProps}
              />
              <StyledButton
                onClick={() => {
                  setIsOpenOverlay(false);
                }}
                className="TextFieldWithKeyboard-closeIcon"
                icon={faWindowClose}
              />
            </div>
          </div>
        </Overlay>
      )}
      <TextField
        className={className}
        onClick={() => {
          setIsOpenOverlay(true);
        }}
        onChange={(event) => {
          //onChange((event.target as HTMLInputElement).value);
        }}
        {...textFieldProps}
      />
    </div>
  );
};

export default TextFieldWithKeyboard;
