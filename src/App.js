import { Grid } from "@mui/material";
import Map from "./components/Map";
import Home from "./pages/Home";

function App() {
  return (
    <Grid container sx={{ background: "rgba(0,0,0,0.05)" }}>
      <Grid
        item
        xs={12}
        sm={4}
        xl={2}
        display="flex"
        flexDirection="column"
        gap={1}
      >
        <Home />
      </Grid>
      <Grid item xs={12} sm={8} xl={10} sx={{ position: "relative" }}>
        <Map />
      </Grid>
    </Grid>
  );
}

export default App;
