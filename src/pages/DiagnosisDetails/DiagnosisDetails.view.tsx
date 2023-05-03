import { ArrowRight } from '@mui/icons-material';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import './DiagnosisDetails.style.css';

function DiagnosisView() {
  return (
    <div className="App">
      <header className="App-header">
        <List>
          <ListItemButton>
            <ListItemText primary={'Test'} />
            <ListItemIcon>
              <ArrowRight />
            </ListItemIcon>
          </ListItemButton>
        </List>
      </header>
    </div>
  );
}

export default DiagnosisView
