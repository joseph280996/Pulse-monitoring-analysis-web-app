import { RouteObject } from "react-router-dom";
import DiagnosisUpload from "./DiagnosisUpload";
import Analysis from "./Analysis";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <DiagnosisUpload />,
  },
  {
    path: "/analyze",
    element: <Analysis />,
  },
];

export default routes;
