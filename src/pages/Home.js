import { useState } from "react";
import {
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  IconButton,
  Grid,
  Button,
} from "@mui/material";

import { useMap } from "../Providers/MapProvider";
import { LogoContainer, PlacesContainer, Rotate } from "./styles";
import { Slider, Box } from "@mui/material";

import { usePlaces } from "../Providers/PlacesProvider";

import SearchIcon from "@mui/icons-material/Search";
import CustomCard from "../components/CustomCard";
import pizzaImage from "../assets/img/pizza.png";
import logo from "../assets/img/logo.png";
import HomeLoader from "../components/HomeLoader";

const marks = [
  {
    value: 1,
    label: "0.1 km",
  },

  {
    value: 25,
    label: "2.5 km",
  },
  {
    value: 50,
    label: "5 km",
  },
  {
    value: 75,
    label: "7.5 km",
  },
  {
    value: 100,
    label: "10 km",
  },
];

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [sliderValue, setSliderValue] = useState(1);

  const { places } = usePlaces();
  const { searchByText, isLoading, currentPage } = useMap();

  const handleClick = () => {
    searchByText(inputValue, sliderValue);
  };

  const handleSlideChange = ({ target }) => {
    setSliderValue(target.value);
  };

  const searchMoreResults = () => {
    setTimeout(() => {
      currentPage.nextPage();
    }, 2000);
  };

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      sx={{ position: "relative" }}
    >
      <Box
        sx={{
          paddingX: 4,
          paddingY: 2,
          textAlign: "center",
        }}
      >
        <Rotate
          src={pizzaImage}
          alt={pizzaImage}
          style={{
            width: "200px",
          }}
        />

        <LogoContainer src={logo} alt="food finder logo" width={300} />
        <Box display="flex" flexDirection="column" gap={3} alignItems="center">
          <FormControl fullWidth>
            <InputLabel>Escolha um tipo de comida...</InputLabel>
            <OutlinedInput
              label="Escolha um tipo de comida..."
              value={inputValue}
              onChange={({ target }) => setInputValue(target.value)}
              id="input-with-icon-adornment"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClick}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Slider
            aria-label="Custom marks"
            step={1}
            valueLabelDisplay="auto"
            marks={marks}
            min={1}
            sx={{ maxWidth: "275px" }}
            onChange={handleSlideChange}
          />
        </Box>
      </Box>

      {!isLoading ? (
        <>
          <PlacesContainer>
            {places &&
              places.map((place, i) => (
                <Grid item xs={12} key={i}>
                  <CustomCard {...{ place, i }} />
                </Grid>
              ))}
            {currentPage && (
              <Button onClick={searchMoreResults}>
                Encontrar mais restaurantes
              </Button>
            )}
          </PlacesContainer>
        </>
      ) : (
        <HomeLoader />
      )}
    </Box>
  );
};

export default Home;
