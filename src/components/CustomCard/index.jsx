import { useEffect } from "react";
import { useState } from "react";

import { CardContent, CardMedia, Typography } from "@mui/material";
import { Rating } from "@mui/material";
import { Box } from "@mui/system";

import logo from "../../assets/img/logo.png";
import Loader from "../CardLoader";

import { StyledCard } from "./styles";
import { usePlaces } from "../../Providers/PlacesProvider";

const CustomCard = ({ i, place, setIsOpen, setModalInfos }) => {
  const { getDetails } = usePlaces();
  const [infos, setInfos] = useState(null);

  useEffect(() => {
    getDetails(place, setInfos, i);
  }, [place, i, getDetails]);

  const handleClick = () => {
    setIsOpen(true);
    setModalInfos(infos);
  };

  return infos ? (
    <StyledCard elevation={3} onClick={handleClick}>
      <Box
        paddingX={1}
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
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
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
    </StyledCard>
  ) : (
    <StyledCard>
      <Loader height={200} width={200} />
    </StyledCard>
  );
};

export default CustomCard;
