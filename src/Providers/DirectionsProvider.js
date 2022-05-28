import { createContext, useContext, useEffect, useState } from "react";
import { useMap } from "./MapProvider";

const DirectionsContext = createContext();

const DirectionsProvider = ({ children }) => {
  const { markers, userPosition, google, map } = useMap();
  const [route, setRoute] = useState(null);

  useEffect(() => {
    if (markers.length && userPosition && google) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();

      const start = new window.google.maps.LatLng(
        -12.9944885,
        -38.49691069999999
      );

      const end = new window.google.maps.LatLng(-12.9950158, -38.4951764);

      var request = {
        origin: start,
        destination: end,
        travelMode: "DRIVING",
      };

      directionsService.route(request, function (result, status) {
        if (status === "OK") {
          console.log(result);
          setRoute(result.routes[0].overview_path);
          // directionsRenderer.setDirections(result);
        }
      });
    }
  }, [markers, userPosition, google]);

  return (
    <DirectionsContext.Provider value={{ route }}>
      {children}
    </DirectionsContext.Provider>
  );
};

export default DirectionsProvider;
export const useDirections = () => useContext(DirectionsContext);
