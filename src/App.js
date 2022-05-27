import { Grid } from "@mui/material";
import Map from "./components/Map";
import Home from "./pages/Home";

function App() {
  return (
    <Grid container>
      <Grid item xs={12} sm={2}>
        <Home />
      </Grid>
      <Grid item xs={12} sm={10} sx={{ boxSizing: "border-box" }}>
        <Map />
      </Grid>
    </Grid>
  );
}

export default App;
