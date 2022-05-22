import { useState } from "react";

import "@material/react-text-field/dist/text-field.css";
import "@material/react-material-icon/dist/material-icon.css";

import MaterialIcon from "@material/react-material-icon";
import TextField, { HelperText, Input } from "@material/react-text-field";

import { Container } from "./styles";
import { SearchArea } from "./styles";

import logo from "../assets/img/logo.png";

const Home = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <Container>
      <SearchArea>
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
      </SearchArea>
    </Container>
  );
};

export default Home;
