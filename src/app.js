import express from "express";
import fetch from "node-fetch";
// Create the server instance.
const app = express();
// Configure the server instance to receive JSON data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

// localhost:3000
app.get("/", (request, response) => {
  response.json({
    message: "Hello World!",
  });
});

// localhost:3000
app.post("/", async (request, response) => {
  // If this fetch request returns JSON, then we want to store it as an object that we can work with.
  let result = await fetch(baseURL + request.body.pokemonName).then((data) => {
    return data.json();
  });

  response.json({
    pokedexNumber: result.id,
    name: result.name,
  });
});

// Activate the server at port 3000.
app.listen(3000, () => {
  console.log("Server running!");
});
