import { useState } from "react";

import "@material/react-text-field/dist/text-field.css";
import "@material/react-material-icon/dist/material-icon.css";

import MaterialIcon from "@material/react-material-icon";
import TextField, { HelperText, Input } from "@material/react-text-field";
import { useMap } from "../Providers/MapProvider";

import logo from "../assets/img/logo.png";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const { searchByText } = useMap();
  const handleClick = () => {
    searchByText(inputValue);
  };

  return (
    <>
      <img src={logo} alt="food finder logo" width={150} />
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
      <button onClick={handleClick}>Pesquisar</button>
    </>
  );
};

export default Home;
