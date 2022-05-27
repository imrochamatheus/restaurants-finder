import { Grid } from "@mui/material";
import Map from "./components/Map";
import Home from "./pages/Home";

function App() {
  return (
    <Grid container>
      <Grid item xs={12} sm={4} paddingX={4}>
        <Home />
      </Grid>
      <Grid item xs={12} sm={8} sx={{ position: "relative" }}>
        <Map />
      </Grid>
    </Grid>
  );
}

export default App;
