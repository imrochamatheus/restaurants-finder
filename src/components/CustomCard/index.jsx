import { useCallback, useEffect } from "react";
import { useState } from "react";

import { CardContent, CardMedia, Typography } from "@mui/material";
import { Rating } from "@mui/material";
import { Box } from "@mui/system";

import logo from "../../assets/img/logo.png";
import Loader from "../CardLoader";

import { StyledCard } from "./styles";
import { usePlaces } from "../../Providers/PlacesProvider";
import { useMap } from "../../Providers/MapProvider";
import { useMarkers } from "../../Providers/MarkersProvider";
import { useDirections } from "../../Providers/DirectionsProvider";

const CustomCard = ({ i, place, setIsOpen, setModalInfos }) => {
  const { getDetails, setClickedMarker, setCurrentPlace, setSelected } =
    usePlaces();
  const { map, google } = useMap();
  const { foodMarker } = useMarkers();
  const { setDestiny, clearRoute } = useDirections();

  const [infos, setInfos] = useState(null);

  useEffect(() => {
    getDetails(place, setInfos, i);
  }, [place, i, getDetails]);

  const handleClick = () => {
    setIsOpen(true);
    setModalInfos(infos);
  };

  const handleMarkerClick = useCallback(
    (_, marker) => {
      setDestiny(marker.internalPosition);
      setCurrentPlace(marker.infos);
      setClickedMarker(marker);
      setSelected(true);
    },
    [setDestiny, setClickedMarker, setCurrentPlace, setSelected]
  );

  const handleOnMouseEnter = useCallback(() => {
    const location = {
      lat: infos.geometry.location.lat(),
      lng: infos.geometry.location.lng(),
    };

    const marker = new google.maps.Marker({
      position: location,
      title: infos.name,
      icon: foodMarker,
      map,
    });

    marker.infos = infos;
    marker.addListener("click", (e) => {
      handleMarkerClick("", marker);

      setTimeout(() => {
        map.panTo(marker.getPosition());
        map.setZoom(18);
      }, 500);
    });

    clearRoute();
    setClickedMarker(marker);
    setCurrentPlace(place);
    setSelected(true);
  }, [
    infos,
    place,
    google,
    map,
    setClickedMarker,
    setCurrentPlace,
    setSelected,
    foodMarker,
    clearRoute,
    handleMarkerClick,
  ]);

  return infos ? (
    <StyledCard
      elevation={3}
      onClick={handleClick}
      onMouseEnter={handleOnMouseEnter}
    >
      <Box
        paddingX={0}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <CardContent
          sx={{
            display: "flex",
            gap: "5px",
            flexDirection: "column",
            paddingY: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              fontSize: "16px",
            }}
          >
            {place.name}
          </Typography>
          <Typography
            sx={{ display: "flex", alignItens: "center", gap: 1 }}
            variant="body2"
          >
            {(place.rating ?? 0) + " "}
            <Rating
              sx={{
                verticalAlign: "middle",
              }}
              name="read-only"
              value={place.rating ?? 0}
              readOnly
              size="small"
            />
            {`(${place.user_ratings_total ?? 0})`}{" "}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
          >
            {place.formatted_address || place.vicinity}
          </Typography>
          <Typography variant="body2">
            {infos.formatted_phone_number}
          </Typography>
        </CardContent>
        {place?.photos ? (
          <CardMedia
            component="img"
            image={place.photos[0].getUrl()}
            alt="Live from space album cover"
            width="100%"
            height="130"
            sx={{ maxWidth: "100px" }}
          />
        ) : (
          <CardMedia
            component="img"
            image={logo}
            alt="Live from space album cover"
            width="100%"
            height="150"
            sx={{ maxWidth: "100px" }}
          />
        )}
      </Box>
    </StyledCard>
  ) : (
    <StyledCard>
      <Loader height={200} width={200} />
    </StyledCard>
  );
};

export default CustomCard;
