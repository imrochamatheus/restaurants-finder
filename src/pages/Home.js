import { useState } from "react";
import { Button, Grid, IconButton, Tooltip, Typography } from "@mui/material";

import { useMap } from "../Providers/MapProvider";
import { usePlaces } from "../Providers/PlacesProvider";

import { PlacesContainer } from "./styles";
import { Main } from "./styles";
import { SearchContainer } from "./styles";
import { StyledInput } from "./styles";
import { Slider, Box } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CustomCard from "../components/CustomCard";
import HomeLoader from "../components/HomeLoader";
import noResults from "../assets/img/no-results.gif";
import Modal from "../components/Modal";
import { useDirections } from "../Providers/DirectionsProvider";

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
  const [sliderValue, setSliderValue] = useState(null);
  const [modalInfos, setModalInfos] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { places } = usePlaces();
  const { clearRoute } = useDirections();
  const { searchByText, isLoading, nextPage, setIsLoading } = useMap();

  const searchPlaces = () => {
    clearRoute();
    searchByText(inputValue, sliderValue);
  };

  const handleSlideChange = ({ target }) => {
    setSliderValue(target.value);
  };

  return (
    <Main>
      <SearchContainer>
        <Box display="flex" flexDirection="column" gap={3} alignItems="center">
          <StyledInput
            fullWidth
            variant="outlined"
            focused={false}
            value={inputValue}
            label="Escolha um tipo de comida..."
            onChange={({ target }) => setInputValue(target.value)}
            InputProps={{
              endAdornment: (
                <Tooltip title="Pesquisar">
                  <IconButton position="start" onClick={searchPlaces}>
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
          <Slider
            aria-label="Custom marks"
            step={1}
            valueLabelDisplay="auto"
            marks={marks}
            color="error"
            min={1}
            sx={{
              maxWidth: "275px",
            }}
            onChange={handleSlideChange}
          />
        </Box>
      </SearchContainer>

      {!isLoading ? (
        <>
          <PlacesContainer>
            {places.length ? (
              places.map((place, i) => (
                <Grid item xs={12} key={i}>
                  <CustomCard {...{ place, i, setIsOpen, setModalInfos }} />
                </Grid>
              ))
            ) : (
              <>
                <img
                  src={noResults}
                  alt="no results"
                  width={150}
                  style={{ alignSelf: "center", marginTop: "25%" }}
                />
                <Typography variant="h6">
                  Nenhum restaurante encontrado...
                </Typography>
              </>
            )}
          </PlacesContainer>
          {nextPage && places.length ? (
            <Button
              fullWidth
              onClick={() => {
                setIsLoading(true);
                nextPage.nextPage();
              }}
              sx={{ textTransform: "none" }}
            >
              Buscar mais resultados
            </Button>
          ) : (
            ""
          )}
        </>
      ) : (
        <HomeLoader width={150} height={150} />
      )}
      <Modal place={modalInfos} isOpen={isOpen} setIsOpen={setIsOpen} />
    </Main>
  );
};

export default Home;
