import { faCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { MouseEventHandler, ReactElement } from 'react';
import StyledButton from '../StyledButton';
import { IButtonWithIconProps } from '../StyledButton/StyledButton.types';
import './RecordButton.scss';

interface IRecordButtonProps extends IButtonWithIconProps {
  onRecord: MouseEventHandler;
}

const RecordButton = ({
  onRecord,
  disabled,
  iconClassName,
  buttonTextClassName,
  className,
}: IRecordButtonProps): ReactElement => {
  return (
    <StyledButton
      iconClassName={iconClassName}
      className={classNames('RecordButton', className)}
      buttonTextClassName={buttonTextClassName}
      disabled={disabled}
      onClick={onRecord}
      icon={faCircle}
    />
  );
};

export default RecordButton;
