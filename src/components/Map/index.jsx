import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { Circle } from "google-maps-react";
import { Box } from "@mui/material";

import { useMemo, useState } from "react";
import { useEffect } from "react";
import { useMap } from "../../Providers/MapProvider";

import RecenterButton from "../RecenterButton";
import foodIcon from "../../assets/img/foodMarker.png";
import userIcon from "../../assets/img/here-icon.png";
import foodImage from "../../assets/img/food-icon.png";

const MapContainer = (props) => {
  const { range, markers, setGoogle, searchByNear, userPosition } = useMap();

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

  const handleMarkerClick = (place, marker) => {
    setClickedMarker(marker);
    setCurrentPlace(place);
    setSelected(true);
  };

  return (
    <Box sx={{ height: "100vh", position: "relative" }}>
      <Map
        zoom={15}
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
            fillOpacity={0.1}
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
            <h2 style={{ fontSize: "16px" }}>{currentPlace?.title}</h2>
          </div>
        </InfoWindow>
      </Map>
    </Box>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  language: "pt-BR",
})(MapContainer);
