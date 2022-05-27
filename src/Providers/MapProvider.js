import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useCallback } from "react";

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const [userPosition, setUserPosition] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [google, setGoogle] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(({ coords }) => {
      setUserPosition({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    });
  }, []);

  const createMarkers = useCallback((places) => {
    return setMarkers(
      places.map((place) => {
        return {
          name: place.name,
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
          place,
        };
      })
    );
  }, []);

  const searchByNear = useCallback(
    (_, map) => {
      const service = new google.maps.places.PlacesService(map);
      const parameters = {
        radius: 2000,
        type: ["restaurant"],
        location: map.center,
      };

      service.nearbySearch(parameters, (response, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          createMarkers(response);
        }
      });
      setMap(map);
    },
    [google, createMarkers]
  );

  const searchByText = useCallback(
    (query) => {
      const service = new google.maps.places.PlacesService(map);
      const parameters = {
        query,
        location: map.center,
        type: ["restaurant"],
      };

      service.textSearch(parameters, (response, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          createMarkers(response);
        }
      });

      map.panTo(userPosition);
    },
    [google, map, createMarkers, userPosition]
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
        userPosition,
        searchByText,
        searchByNear,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
export const useMap = () => useContext(MapContext);
