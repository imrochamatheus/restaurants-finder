import { useMap } from "../../Providers/MapProvider";
import { useDirections } from "../../Providers/DirectionsProvider";

import { CustomButton } from "./styles";

function RecenterButton({ panTo }) {
  const { recenter } = useMap();
  const { clearRoute } = useDirections();

  const handleClick = () => {
    recenter();
    clearRoute();
  };

  return (
    <CustomButton onClick={handleClick}>
      <img src="/compass.svg" alt="compass" />
    </CustomButton>
  );
}

export default RecenterButton;
