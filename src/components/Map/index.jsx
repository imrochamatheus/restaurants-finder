import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { useEffect } from "react";

import { useMap } from "../../Providers/MapProvider";

const containerStyle = {
  width: "400px",
  height: "400px",
};
const MapContainer = (props) => {
  const { markers, setGoogle, searchByNear } = useMap();

  useEffect(() => {
    setGoogle(props.google);
  }, [setGoogle, props.google]);

  return (
    <Map
      google={props.google}
      zoom={18}
      centerAroundCurrentLocation
      containerStyle={containerStyle}
      onReady={searchByNear}
    >
      <Marker position={{ lat: -12.9944885, lng: -38.49691069999999 }} />
      {markers &&
        markers.map((marker, i) => (
          <Marker key={i} position={marker.position} title={marker.name} />
        ))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  language: "pt-BR",
})(MapContainer);
