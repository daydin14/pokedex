const express = require("express");
const app = express();
const port = 3000;
const pokemon = require("./models/pokemon");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// JSON
app.get("/", (req, res) => {
  res.send(pokemon);
});

// New
app.get("/pokemon/new", (req, res) => {
  res.render("new.ejs");
});
// Index
app.get("/pokemon", (req, res) => {
  res.render("index.ejs", { pokemon: pokemon });
});

// Show
app.get("/pokemon/:id", (req, res) => {
  const { id, name, img, type, stats, moves, damages, misc } =
    pokemon[req.params.id];
  res.render("show.ejs", {
    pokemon: { id, name, img, type, stats, moves, damages, misc },
  });
});
// Create
app.post("/pokemon", (req, res) => {
  const {id, name} = req.body;
  let newPokemon = {id,name};
  pokemon.push(newPokemon);
  res.redirect("/pokemon");
});
// Update
app.put("/pokemon/:id", (req, res) => {
  pokemon[req.params.id].id = req.body.id;
  pokemon[req.params.id].name = req.body.name;
  res.redirect("/pokemon");
});
// Edit
app.get("/pokemon/:id/edit", (req, res) => {
  res.render("edit.ejs", {
    pokemon: pokemon[req.params.id],
    index: req.params.id,
  });
});
// Destroy/Delete
app.delete("pokemon/:id", (req, res) => {
  pokemon.splice(req.params.id, 1);
  res.redirect("/pokemon");
});

app.listen(port);
