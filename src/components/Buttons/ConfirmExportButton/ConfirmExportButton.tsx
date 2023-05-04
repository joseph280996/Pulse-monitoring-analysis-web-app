import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ReactElement } from 'react';
import './ConfirmExportButton.scss';
import StyledButton from '../StyledButton';
import { IButtonProps } from '../StyledButton/StyledButton.types';

const ContinueButton = ({ type = 'button' }: IButtonProps): ReactElement => {
  return (
    <StyledButton
      buttonTextClassName="ContinueButton-text"
      wrapperClassName="ContinueButton-wrapper"
      className="ContinueButton"
      iconPosition="end"
      icon={faArrowRight}
      type={type}
    >
      Export Data
    </StyledButton>
  );
};

export default ContinueButton;
