import { ChangeEventHandler, FocusEventHandler } from "react";

export type SelectProps = {
  id?: any;
  name?: string;
  className?: string;
  value: any;
  onChange: ChangeEventHandler;
  onBlur?: FocusEventHandler;
};

