import { ArrowRight } from "@mui/icons-material";
import { List, ListItemIcon, ListItemText } from "@mui/material";
import ListItemLink from "../../components/List/ListItemLink/ListItemLink";
import Diagnosis from "../../models/Diagnosis";
import { DiagnosisUploadLoaderType } from "./DiagnosisUpload.types";

const DiagnosisHistory = ({ diagnoses }: DiagnosisUploadLoaderType) => {
  return (
    <div className="App">
      <header className="App-header">
        <List>
          {diagnoses.map((diagnosis: Diagnosis) => (
            <ListItemLink key={diagnosis.id} to={`analyze/${diagnosis.id}`}>
              <ListItemText primary={"Test"} />
              <ListItemIcon>
                <ArrowRight />
              </ListItemIcon>
            </ListItemLink>
          ))}
        </List>
      </header>
    </div>
  );
};

export default DiagnosisHistory;
