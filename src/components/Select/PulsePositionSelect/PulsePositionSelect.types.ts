import { ChangeEventHandler } from "react";

export type PulsePositionProps = {
  className?: string;
  name?: string;
  value: any;
  onPositionChange: ChangeEventHandler;
  onBlur?: ChangeEventHandler;
  required?: boolean;
  label?: string;
};

