import { ChangeEventHandler, FocusEventHandler } from "react";

export type PulseTypeSelectProps = {
  onBlur: FocusEventHandler;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  className?: string;
  value: number | string;
  name?: string;
};

