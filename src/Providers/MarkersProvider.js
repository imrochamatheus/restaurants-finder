import { createContext } from "react";
import { useContext } from "react";
import { useCallback } from "react";
import { useMemo } from "react";

import foodIcon from "../assets/img/foodMarker.png";
import userIcon from "../assets/img/logo.png";
import { useMap } from "./MapProvider";
import { usePlaces } from "./PlacesProvider";
import { useDirections } from "./DirectionsProvider";

const MarkersContext = createContext();

const MarkersProvider = ({ children }) => {
  const { google } = useMap();
  const { setDestiny } = useDirections();
  const { setClickedMarker, setCurrentPlace, setSelected } = usePlaces();

  const foodMarker = useMemo(() => {
    if (google) {
      return new google.maps.MarkerImage(
        foodIcon,
        null,
        null,
        null,
        new google.maps.Size(35, 52)
      );
    }
  }, [google]);

  const userMarker = useMemo(() => {
    if (google) {
      new google.maps.MarkerImage(
        userIcon,
        null,
        null,
        null,
        new google.maps.Size(100, 100)
      );
    }
  }, [google]);

  const handleMarkerClick = useCallback(
    (_, marker) => {
      setDestiny(marker.internalPosition);
      setCurrentPlace(marker.place);
      setClickedMarker(marker);
      setSelected(true);
    },
    [setDestiny, setClickedMarker, setCurrentPlace, setSelected]
  );

  return (
    <MarkersContext.Provider
      value={{ userMarker, foodMarker, handleMarkerClick }}
    >
      {children}
    </MarkersContext.Provider>
  );
};

export default MarkersProvider;
export const useMarkers = () => useContext(MarkersContext);
