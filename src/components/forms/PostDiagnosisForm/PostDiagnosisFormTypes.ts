import { type FormikProps } from "formik";
import { type ILineChartProps } from "../../Chart/LineChart";
import { type MouseEventHandler } from "react";

export interface PostDiagnosisFormProps {
  recordID: number;
  pulseTypeID: number;
  patientName: string;
}

export interface IPostDiagnosisProps
  extends ILineChartProps,
    FormikProps<PostDiagnosisFormProps> {
  onClick?: MouseEventHandler;
}

export interface IPostDiagnosisFormContainerProp extends ILineChartProps {
  initialValues: PostDiagnosisFormProps;
}
