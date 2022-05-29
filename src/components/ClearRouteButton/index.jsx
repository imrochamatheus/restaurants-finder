import { useMap } from "../../Providers/MapProvider";
import { useDirections } from "../../Providers/DirectionsProvider";

import { CustomButton } from "./styles";
import { Tooltip } from "@mui/material";

function ClearRouteButton({ panTo }) {
  const { recenter } = useMap();
  const { clearRoute } = useDirections();

  const handleClick = () => {
    recenter();
    clearRoute();
  };

  return (
    <Tooltip title="Limpar rota">
      <CustomButton onClick={handleClick}>
        <img src="/compass.svg" alt="compass" />
      </CustomButton>
    </Tooltip>
  );
}

export default ClearRouteButton;
