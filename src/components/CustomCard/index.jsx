import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Rating } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";

import { useState } from "react";
import { useMap } from "../../Providers/MapProvider";
import logo from "../../assets/img/logo.png";

const CustomCard = ({ place }) => {
  const { map } = useMap();
  const [infos, setInfos] = useState(null);

  useEffect(() => {
    var request = {
      placeId: place.place_id,
      fields: [
        "name",
        "rating",
        "formatted_phone_number",
        "geometry",
        "opening_hours",
        "photo",
      ],
    };

    const service = new window.google.maps.places.PlacesService(map);
    service.getDetails(request, (response, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        console.log(response);
        setInfos(response);
      }
    });
  }, [map, place]);

  return (
    infos && (
      <Card elevation={12}>
        <Box
          paddingX={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <CardContent
            sx={{ display: "flex", gap: "10px", flexDirection: "column" }}
          >
            <Typography
              variant="h6"
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
              }}
            >
              {place.name}
            </Typography>
            <Rating
              name="read-only"
              value={place.rating}
              readOnly
              size="small"
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
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
              height="150"
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
      </Card>
    )
  );
};

export default CustomCard;