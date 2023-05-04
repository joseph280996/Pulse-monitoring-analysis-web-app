import { faPlay } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { MouseEventHandler, ReactElement } from 'react';
import StyledButton from '../StyledButton';
import { IButtonWithIconProps } from '../StyledButton/StyledButton.types';
import './StartButton.scss';

interface IStartButtonProps extends IButtonWithIconProps {
  onStart: MouseEventHandler;
}

const StartButton = ({
  onStart,
  className,
  ...buttonProps
}: IStartButtonProps): ReactElement => {
  return (
    <StyledButton
      icon={faPlay}
      wrapperClassName="StartButton-wrapper"
      className={classNames('StartButton', className)}
      onClick={onStart}
      {...buttonProps}
    />
  );
};

export default StartButton;
