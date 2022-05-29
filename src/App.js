import { Grid } from "@mui/material";
import Map from "./components/Map";
import Home from "./pages/Home";

function App() {
  return (
    <Grid container sx={{ background: "rgba(0,0,0,0.04)" }}>
      <Grid item width="450px" display="flex" flexDirection="column" gap={1}>
        <Home />
      </Grid>

      <Grid item xs sx={{ position: "relative" }}>
        <Map />
      </Grid>
    </Grid>
  );
}

export default App;
