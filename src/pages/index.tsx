import DiagnosisPage from "./Diagnosis";
import PiezoElectricDiagnosisService from "../apis/PiezoElectricDiagnosisService";
import type Diagnosis from "../dataObjects/Diagnosis";
import Analysis from "./Analysis";
import { type LoaderFunctionArgs } from "react-router-dom";
import { type GetRecordLoaderParamType } from "./Diagnosis/Diagnosis.types";

const allDiagnosesLoader = async (): Promise<{ diagnoses?: Diagnosis[] }> => {
  return await PiezoElectricDiagnosisService.instance.getAllDiagnoses();
};

const getRecordLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<{ records?: Diagnosis[] }> => {
  const { id } = params as GetRecordLoaderParamType;
  return await PiezoElectricDiagnosisService.instance.getRecordsByDiagnosisId(
    id
  );
};
          <Route path="/" element={<BasePage />}>
            <Route
              index
              element={<PrivateRouteWrapper element={LandingPage} />}
            />
            <Route
              path="diagnosis"
              element={<PrivateRouteWrapper element={Diagnosis} />}
            />
            <Route
              path="postdiagnosis"
              element={<PrivateRouteWrapper element={PostDiagnosis} />}
            />
            <Route
              path="finish"
              element={<PrivateRouteWrapper element={Finish} />}
            />
            <Route
              path="export-data"
              element={<PrivateRouteWrapper element={ExportDataPage} />}
            />
          </Route>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

export default [
  {
    path: "/patients",
    element: <DiagnosisPage />,
    loader: allDiagnosesLoader,
  },
  {
    path: "/patients/diagnosis/:id",
    element: <Analysis />,
    loader: getRecordLoader,
  },
];
