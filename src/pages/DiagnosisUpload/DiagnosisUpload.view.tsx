import { ArrowRight } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import useDiagnoses from "../../hooks/useDiagnoses";
import Diagnosis from "../../models/Diagnosis";

const DiagnosisHistory = () => {
  const { diagnoses } = useDiagnoses();
  console.log(diagnoses);
  return (
    <div className="App">
      <header className="App-header">
        <List>
          {diagnoses.map((diagnosis: Diagnosis) => (
            <ListItemButton key={diagnosis.id}>
              <ListItemText primary={"Test"} />
              <ListItemIcon>
                <ArrowRight />
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </header>
    </div>
  );
};

export default DiagnosisHistory;
