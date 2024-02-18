import {types as DiagnosisFormTypes} from './DiagnosisForm'
import {types as ExportDataFormTypes} from './ExportDataForm'
import {types as PostDiagnosisFormTypes} from './PostDiagnosisForm'

import DiagnosisForm from './DiagnosisForm'
import ExportDataForm  from './ExportDataForm'
import PostDiagnosisForm  from './PostDiagnosisForm'

export default {DiagnosisForm, ExportDataForm, PostDiagnosisForm}


type FormikHandleSubmitType = (
  e?: FormEvent<HTMLFormElement> | undefined
) => void;
export {
  DiagnosisFormTypes,
  ExportDataFormTypes,
  PostDiagnosisFormTypes,
  FormikHandleSubmitType
}


