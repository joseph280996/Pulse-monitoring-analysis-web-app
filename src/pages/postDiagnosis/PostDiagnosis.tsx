import { type ReactElement, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import { type PostDiagnosisLocationState } from "./PostDiagnosisTypes";
import useDiagnosis from "../../utils/hooks/useDiagnosis";
import recordDataToLineChartDataMapper from "../../utils/domain/mappers/recordDataToLineChartDataMapper";
import PostDiagnosisFormContainer from "../../components/forms/PostDiagnosisForm";
import LoadingSpinner from "../../components/LoadingSpinner";

function PostDiagnosis(): ReactElement {
  const location = useLocation();
  const { width, height } = useWindowDimensions(20);
  const locationState: PostDiagnosisLocationState =
    location?.state as PostDiagnosisLocationState;
  const { recordID } = location.state as PostDiagnosisLocationState;
  const { record, isLoading: isRecordLoading } = useDiagnosis(recordID);

  const recordedDataToDisplay = useMemo(
    () => recordDataToLineChartDataMapper(record),
    [record]
  );

  if (!locationState?.recordID) {
    return <Navigate to="/" replace />;
  }
  if (isRecordLoading || !record) {
    return <LoadingSpinner />;
  }
  return (
    <div className="PostDiagnosis">
      <PostDiagnosisFormContainer
        data={recordedDataToDisplay}
        initialValues={{
          recordID,
          pulseTypeID: 1,
          patientName: "",
        }}
      />
    </div>
  );
}

export default PostDiagnosis;
