import { createContext, useContext, useEffect, useState } from "react";
import { useCallback, useMemo } from "react";

import foodIcon from "../assets/img/foodMarker.png";

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const [userPosition, setUserPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [google, setGoogle] = useState(null);
  const [map, setMap] = useState(null);
  const [range, setRange] = useState(500);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(({ coords }) => {
      setUserPosition({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    });
  }, []);

  const recenter = useCallback(() => {
    map.panTo(userPosition);
  }, [userPosition, map]);

  const getPosition = useCallback((place) => {
    return {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
  }, []);

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

  const createMarkers = useCallback(
    (places) => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      const newMarkers = places.map((place) => {
        const marker = new google.maps.Marker({
          position: getPosition(place),
          title: place.name,
          icon: foodMarker,
        });

        marker.place = place;
        setTimeout(() => {
          marker.setMap(map);
        }, 2000);
        return marker;
      });

      return setMarkers(newMarkers);
    },
    [getPosition, google, map, foodMarker]
  );

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
      map.panTo(userPosition);
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
    [google, createMarkers, range, userPosition]
  );

  const searchByText = useCallback(
    (query, radius) => {
      setIsLoading(true);
      markers.forEach((marker) => marker.setMap(null));
      map.panTo(userPosition);
      setRange(radius * 100);
      const service = new google.maps.places.PlacesService(map);
      const parameters = {
        query,
        location: map.center,
        type: ["restaurant"],
      };

      service.textSearch(parameters, (response, status, pagination) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          if (pagination.hasNextPage) {
            checkIfInRange(response, radius * 100);
            setNextPage(pagination);
          } else {
            setNextPage(null);
            checkIfInRange(response, radius * 100);
          }
        }
      });
    },
    [google, map, userPosition, checkIfInRange, markers]
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
        recenter,
        setGoogle,
        nextPage,
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
