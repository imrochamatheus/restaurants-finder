import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMap } from "./MapProvider";

const DirectionsContext = createContext();

const DirectionsProvider = ({ children }) => {
  const { userPosition, google } = useMap();
  const [destiny, setDestiny] = useState(null);
  const [route, setRoute] = useState(null);

  useEffect(() => {
    if (userPosition && google && destiny) {
      const directionsService = new google.maps.DirectionsService();
      const origin = new google.maps.LatLng(userPosition.lat, userPosition.lng);

      const request = {
        origin: origin,
        destination: destiny,
        travelMode: "DRIVING",
      };

      directionsService.route(request, function (result, status) {
        if (status === "OK") {
          setRoute(result.routes[0].overview_path);
        }
      });
    }
  }, [userPosition, destiny, google]);

  const clearRoute = useCallback(() => {
    setRoute(null);
    setDestiny(null);
  }, []);

  return (
    <DirectionsContext.Provider
      value={{ route, setRoute, setDestiny, clearRoute }}
    >
      {children}
    </DirectionsContext.Provider>
  );
};

export default DirectionsProvider;
export const useDirections = () => useContext(DirectionsContext);
