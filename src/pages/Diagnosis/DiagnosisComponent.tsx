import { ArrowRight } from "@mui/icons-material";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

function DiagnosisComponent() {
    return (
    <div className="App">
      <header className="App-header">
        <List>
            <ListItemButton>
               <ListItemText primary={"Test"}/>
               <ListItemIcon>
                   <ArrowRight/>
               </ListItemIcon>
            </ListItemButton>
        </List>
      </header>
    </div>
    );
}

export default DiagnosisComponent;
