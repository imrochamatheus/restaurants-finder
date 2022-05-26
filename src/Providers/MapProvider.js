import { createContext, useContext, useState } from "react";
import { useCallback } from "react";

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const [markers, setMarkers] = useState(null);
  const [google, setGoogle] = useState(null);
  const [map, setMap] = useState(null);

  const searchByNear = useCallback(
    (_, map) => {
      const service = new google.maps.places.PlacesService(map);
      const parameters = {
        radius: 500,
        type: ["restaurant"],
        location: map.center,
      };

      service.nearbySearch(parameters, (response, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setMarkers(
            response.map((place) => ({
              name: place.name,
              position: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              },
              place,
            }))
          );
        }
      });
    },
    [google]
  );

  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
        google,
        markers,
        setMarkers,
        setGoogle,
        searchByNear,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
export const useMap = () => useContext(MapContext);
