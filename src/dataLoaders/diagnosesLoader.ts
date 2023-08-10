import DiagnosisService from "../apis/DiagnosisService";
import { type LoaderFunctionArgs } from "react-router-dom";
import { IDiagnosisQueryKey } from "../apis/interfaces/queryKeys/IDiagnosisQueryKeys";
import {
  IAllDiagnosesLoaderReturnType,
  ISingleDiagnosesLoaderReturnType,
} from "./types/diagnosesLoader.types";

export const allDiagnosesLoader =
  async (): Promise<IAllDiagnosesLoaderReturnType> => {
    const data = await DiagnosisService.instance.getAsync();

    return { diagnoses: data };
  };

export const singleDiagnosisLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<ISingleDiagnosesLoaderReturnType> => {
  const queryFilter: IDiagnosisQueryKey = {
    id: Number(params.id) || 0,
  };
  const data = await DiagnosisService.instance.getWithFilterAsync(queryFilter);
  console.log(data);
  return {
    diagnosis: data[0],
  };
};
