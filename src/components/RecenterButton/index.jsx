import { useMap } from "../../Providers/MapProvider";
import AdjustIcon from "@mui/icons-material/Adjust";
import { IconButton, Tooltip } from "@mui/material";

function RecenterButton({ panTo }) {
  const { recenter } = useMap();

  const handleClick = () => {
    recenter();
  };

  return (
    <Tooltip title="Recentralizar">
      <IconButton
        onClick={handleClick}
        sx={{
          position: "absolute",
          bottom: "1.8rem",
          left: "5rem",
          width: "4rem",
          background: "none",
          border: "none",
          zIndex: "10",
          cursor: "pointer",
        }}
      >
        <AdjustIcon sx={{ fontSize: "50px" }} />
      </IconButton>
    </Tooltip>
  );
}

export default RecenterButton;
