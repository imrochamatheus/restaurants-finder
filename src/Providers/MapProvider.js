import { createContext, useContext, useEffect, useState } from "react";
import { useCallback } from "react";

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const [userPosition, setUserPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [google, setGoogle] = useState(null);
  const [map, setMap] = useState(null);
  const [range, setRange] = useState(400);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(({ coords }) => {
      setUserPosition({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    });
  }, []);

  const createMarkers = useCallback((places) => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return setMarkers(
      places.map((place) => {
        return {
          ...place,
          name: place.name,
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
        };
      })
    );
  }, []);

  const checkIfInRange = useCallback(
    (places, radius) => {
      const selectedPlaces = places.filter((place) => {
        const isSmaller =
          google.maps.geometry.spherical.computeDistanceBetween(
            place.geometry.location,
            userPosition
          ) < radius;

        return isSmaller;
      });

      createMarkers(selectedPlaces);
    },
    [createMarkers, userPosition, google]
  );

  const searchByNear = useCallback(
    (_, map) => {
      setIsLoading(true);
      const service = new google.maps.places.PlacesService(map);
      const parameters = {
        radius: range,
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
    [google, createMarkers, range]
  );

  const searchByText = useCallback(
    (query, radius) => {
      setIsLoading(true);
      setRange(radius * 100);
      map.panTo(userPosition);
      const service = new google.maps.places.PlacesService(map);
      const parameters = {
        query,
        location: map.center,
        type: ["restaurant"],
      };

      service.textSearch(parameters, (response, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          checkIfInRange(response, radius * 100);
        }
      });
    },
    [google, map, userPosition, checkIfInRange]
  );

  return (
    <MapContext.Provider
      value={{
        map,
        range,
        google,
        setMap,
        markers,
        setRange,
        isLoading,
        setGoogle,
        setMarkers,
        setIsLoading,
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
