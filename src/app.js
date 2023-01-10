import express from "express";
import fetch from "node-fetch";
// Create the server instance.
const app = express();
// Configure the server instance to receive JSON data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

// Validation middleware for fetch request
app.use("/", async (request, response, next) => {
  // If this fetch request returns JSON, then we want to store it as an object that we can work with.
  if (request.body.pokemonName) {
    let result = await fetch(baseURL + request.body.pokemonName).then(
      (data) => {
        // Only jsonify data if fetch is successful
        if (data.status == 200) {
          return data.json();
        }
      }
    );
    // If fetch unsuccessful, go to error handling middleware
    if (!result) {
      next(new Error("No pokemon found"));
      return;
      // Otherwise save data from results to response.locals
    } else {
      response.locals.pokedexNumber = result.id;
      response.locals.name = result.name;
      next();
    }
  }
});

// Error handling middleware
app.use("/", (error, request, response, next) => {
  response.json({
    error: error.message,
  });
});

// GET localhost:3000
app.get("/", (request, response) => {
  response.json({
    message: "Hello World!",
  });
});

// POST localhost:3000
app.post("/", async (request, response, next) => {
  response.json({
    pokedexNumber: response.locals.pokedexNumber,
    name: response.locals.name,
  });
});

// Activate the server at port 3000.
app.listen(3000, () => {
  console.log("Server running!");
});
