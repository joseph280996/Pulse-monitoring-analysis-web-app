import { ReactElement } from "react";
import DiagnosisForm, { IDiagnosisFormContainerProps } from "../../components/forms/DiagnosisForm/DiagnosisForm";

const DiagnosisPageComponent = ({
  height,
  ...passThroughProps
}: IDiagnosisFormContainerProps): ReactElement => {
  return (
    <div style={{ maxHeight: height }}>
      <DiagnosisForm height={height} {...passThroughProps} />
    </div>
  );
};

export default DiagnosisPageComponent;
