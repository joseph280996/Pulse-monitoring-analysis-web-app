import { RouteObject } from "react-router-dom";
import DiagnosisUpload from "./DiagnosisUpload";
import Analysis from "./Analysis";
import {
  allDiagnosesLoader,
  singleDiagnosisLoader,
} from "../dataLoaders/diagnosesLoader";

const routes: RouteObject[] = [
  {
    path: "/",
    loader: allDiagnosesLoader,
    element: <DiagnosisUpload />,
  },
  {
    path: "/analyze/:id",
    loader: singleDiagnosisLoader,
    element: <Analysis />,
  },
];

export default routes;
