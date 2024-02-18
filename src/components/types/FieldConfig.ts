import IField from "./interfaces/IField";
import { FC, MouseEventHandler } from "react";
import { AnySchema } from "yup";

export interface FieldConfig extends Omit<IField, "name" | "value"> {
  FieldComponent?: FC<any>;
  label?: string;
  name: string;
  placeholder?: string;
  validate: AnySchema;
  onClick?: MouseEventHandler;
}
