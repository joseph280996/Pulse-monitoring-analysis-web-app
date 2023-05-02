import { ArrowRight } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import "./Diagnosis.style.css";
import type { IDiagnosisDetailsViewProps } from "./DiagnosisDetails.types";

function DiagnosisDetailsView({ diagnoses }: IDiagnosisDetailsViewProps): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <List>
          {(diagnoses || []).map((diagnosis) => {
            return (
              <ListItemButton key={diagnosis.id}>
                <ListItemText primary={"Test"} />
                <ListItemIcon>
                  <ArrowRight />
                </ListItemIcon>
              </ListItemButton>
            );
          })}
        </List>
      </header>
    </div>
  );
}

export default DiagnosisDetailsView;