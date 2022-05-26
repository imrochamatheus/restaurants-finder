import { Map, GoogleApiWrapper } from "google-maps-react";
const containerStyle = {
  width: "400px",
  height: "400px",
};
const MapContainer = (props) => {
  const { google } = props;

  const handleOnMapReady = (_, map) => {
    const service = new google.maps.places.PlacesService(map);

    const req = {
      location: map.center,
      radius: 500,
      query: "sorvete",
    };

    service.textSearch(req, (res, status) => {
      console.log(res);
    });
  };

  return (
    <Map
      google={google}
      zoom={18}
      centerAroundCurrentLocation
      containerStyle={containerStyle}
      onReady={handleOnMapReady}
    ></Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  language: "pt-BR",
})(MapContainer);
