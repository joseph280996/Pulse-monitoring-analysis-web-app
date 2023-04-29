import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { type ReactElement } from "react";
import "./PostDiagnosisForm.scss";
import { type IPostDiagnosisProps } from "./PostDiagnosisFormTypes";
import { TextFieldWithKeyboard } from "../../TextField";
import StyledButton from "../../Button";
import { PulseTypeSelect } from "../../Select";
import LineChart from "../../Chart/LineChart";

function PostDiagnosisFormComponent({
  data,
  width,
  height,
  handleSubmit,
  handleBlur,
  errors,
  setFieldTouched,
  setFieldValue,
  values,
  isSubmitting,
  status,
}: IPostDiagnosisProps): ReactElement {
  return (
    <form onSubmit={handleSubmit}>
      {status && <div>{status}</div>}
      <TextFieldWithKeyboard
        className="PostDiagnosis-field"
        type="text"
        placeholder="Patient Name"
        onChange={(input) => {
          setFieldValue("patientName", input);
        }}
        error={errors.patientName}
        name="patientName"
        onBlur={handleBlur}
        value={values.patientName}
        required
      />
      <LineChart data={data} width={width} height={height} />
      <div className="PostDiagnosis-buttonContainer">
        <PulseTypeSelect
          name="pulseTypeID"
          onBlur={() => {
            setFieldTouched("pulseTypeID", true);
          }}
          onChange={(event) => setFieldValue("pulseTypeID", event.target.value)}
          value={values.pulseTypeID}
        />
        <div className="PostDiagnosis-buttonWrapper">
          <StyledButton
            wrapperClassName="PostDiagnosis-button"
            type="submit"
            icon={faCheckCircle}
            className="PostDiagnosis-buttonIcon"
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </form>
  );
}

export default PostDiagnosisFormComponent;
