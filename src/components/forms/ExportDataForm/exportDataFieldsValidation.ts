import { string } from "yup";
import { type FieldConfig } from "../../types";

const exportDataFields: FieldConfig[] = [
  {
    name: "startDate",
    validate: string().required("Required"),
  },
  {
    name: "endDate",
    validate: string().required("Required"),
  },
];
export default exportDataFields;
