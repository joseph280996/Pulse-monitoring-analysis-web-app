import { useNavigate } from "react-router-dom";
import {
  type IPostDiagnosisFormContainerProp,
  type PostDiagnosisFormProps,
} from "./PostDiagnosisFormTypes";
import { useFormik } from "formik";
import { type ReactElement } from "react";
import DiagnosisService from "../../../utils/infrastructure/services/diagnosisService";

const PostDiagnosisFormContainer = ({
  initialValues,
  data,
  ...passThroughProps
}: IPostDiagnosisFormContainerProp): ReactElement => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    onSubmit: async (values: PostDiagnosisFormProps) => {
      await DiagnosisService.instance.postAsync(values);
      navigate("/finish");
    },
    validationSchema: object().shape(
      fields.reduce((fieldsValidation, { name, validate }) => {
        return { ...fieldsValidation, [name]: validate };
      }, {})
    ),
  });

  return (
    <PostDiagnosisFormComponent data={data} {...formik} {...passThroughProps} />
  );
};

export default PostDiagnosisFormContainer;
