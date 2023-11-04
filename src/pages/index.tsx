import { RouteObject } from "react-router-dom";
import DiagnosisUpload from "./DiagnosisUpload";
import Analysis from "./Analysis";
import {
  allDiagnosesLoader,
  singleDiagnosisLoader,
} from "../dataLoaders/diagnosesLoader";
import NotFoundPage from "./404/404";
import DiagnosisPageContainer from "./Diagnosis/DiagnosisPage";

const routes: RouteObject[] = [
  {
    path: "/",
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/diagnose",
        element: <DiagnosisPageContainer/>
      },
      {
        path: "/analyze",
        loader: allDiagnosesLoader,
        element: <DiagnosisUpload />,
      },
      {
        path: "/analyze/:id",
        loader: singleDiagnosisLoader,
        element: <Analysis />,
      },
    ],
  },
];

export default routes;
