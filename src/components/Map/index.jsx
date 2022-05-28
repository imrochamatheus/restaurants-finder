import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
  Polyline,
} from "google-maps-react";

import { Circle } from "google-maps-react";
import { Box } from "@mui/material";

import { useCallback, useMemo, useState } from "react";
import { useEffect } from "react";
import { useMap } from "../../Providers/MapProvider";
import { useDirections } from "../../Providers/DirectionsProvider";

import RecenterButton from "../RecenterButton";
import foodIcon from "../../assets/img/foodMarker.png";
import userIcon from "../../assets/img/here-icon.png";
import foodImage from "../../assets/img/food-icon.png";

const MapContainer = (props) => {
  const { range, markers, setGoogle, searchByNear, userPosition } = useMap();
  const { route, setDestiny } = useDirections();

  const [clickedMarker, setClickedMarker] = useState(null);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setGoogle(props.google);
  }, [setGoogle, props.google]);

  let foodMarker = useMemo(
    () =>
      new window.google.maps.MarkerImage(
        foodIcon,
        null,
        null,
        null,
        new window.google.maps.Size(35, 52)
      ),
    []
  );

  let userMarker = useMemo(
    () =>
      new window.google.maps.MarkerImage(
        userIcon,
        null,
        null,
        null,
        new window.google.maps.Size(100, 100)
      ),
    []
  );

  const handleMarkerClick = useCallback(
    (_, marker) => {
      setDestiny(marker.internalPosition);
      setCurrentPlace(marker.infos);
      setClickedMarker(marker);
      setSelected(true);
    },
    [setDestiny]
  );

  return (
    <Box sx={{ height: "100vh", position: "relative" }}>
      <Map
        zoom={16}
        google={props.google}
        onReady={searchByNear}
        onRecenter={searchByNear}
        center={userPosition}
        centerAroundCurrentLocation
        style={{ width: "100%", maxWidth: "100%", height: "100vh" }}
      >
        <Marker
          position={userPosition}
          icon={userMarker}
          animation={window.google.maps.Animation.BOUNCE}
        />

        {markers &&
          markers.map((marker, i) => (
            <Marker
              key={i}
              icon={foodMarker}
              title={marker.name}
              infos={marker}
              position={marker.position}
              onClick={handleMarkerClick}
            />
          ))}
        <RecenterButton />
        {userPosition && (
          <Circle
            radius={range}
            center={userPosition}
            strokeColor="transparent"
            strokeOpacity={0}
            strokeWeight={5}
            fillColor="green"
            fillOpacity={0.05}
          />
        )}

        <InfoWindow
          visible={selected}
          marker={clickedMarker}
          onClose={() => {
            setSelected(false);
          }}
          style={{ background: "blue" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={foodImage} alt="food icon" width="100px" height="100px" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <h2 style={{ fontSize: "16px" }}>{currentPlace?.name}</h2>
              <p style={{ fontSize: "12px" }}>{currentPlace?.vicinity}</p>
            </div>
          </div>
        </InfoWindow>

        {route && (
          <Polyline
            path={route}
            geodesic={false}
            options={{
              strokeColor: "#38B44F",
              strokeOpacity: 0.5,
              strokeWeight: 5,
            }}
          />
        )}
      </Map>
    </Box>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  language: "pt-BR",
})(MapContainer);
