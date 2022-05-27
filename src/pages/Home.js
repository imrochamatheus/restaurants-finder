import { useState } from "react";

import "@material/react-text-field/dist/text-field.css";
import "@material/react-material-icon/dist/material-icon.css";

import MaterialIcon from "@material/react-material-icon";

import TextField, { HelperText, Input } from "@material/react-text-field";
import { useMap } from "../Providers/MapProvider";
import { LogoContainer } from "./styles";
import { Slider, Box } from "@mui/material";

import logo from "../assets/img/logo.png";

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

  const { searchByText } = useMap();
  const handleClick = () => {
    searchByText(inputValue, sliderValue);
  };

  const handleSlideChange = ({ target }) => {
    setSliderValue(target.value);
  };

  return (
    <>
      <LogoContainer src={logo} alt="food finder logo" width={300} />

      <Box>
        <TextField
          outlined
          variant="standard"
          label="Pesquisar..."
          onChange={({ target }) => setInputValue(target.value)}
          helperText={<HelperText>O que vamos comer hoje?</HelperText>}
          trailingIcon={<MaterialIcon role="button" icon="search" />}
        >
          <Input
            value={inputValue}
            onChange={({ target }) => setInputValue(target.value)}
          />
        </TextField>
        <Slider
          aria-label="Custom marks"
          step={1}
          valueLabelDisplay="auto"
          marks={marks}
          min={1}
          onChange={handleSlideChange}
        />
        <button onClick={handleClick}>Pesquisar</button>
      </Box>
    </>
  );
};

export default Home;
