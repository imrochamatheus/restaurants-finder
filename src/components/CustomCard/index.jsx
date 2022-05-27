import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";

import logo from "../../assets/img/logo.png";

const CustomCard = ({ place }) => {
  console.log(place);

  return (
    <Card>
      <Box paddingX={2} display="flex" justifyContent="space-between">
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {place.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="div"
            paddingY={2}
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {place.formatted_address || place.vicinity}
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
  );
};

export default CustomCard;
