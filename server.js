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
// Create
app.post("/pokemon", (req, res) => {
  // use unshift for adding pokemon when you decide to update this code
  const { id, name } = req.body;
  let newPokemon = { id, name };
  pokemon.push(newPokemon);
  res.redirect("/pokemon");
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

// Update
app.put("/pokemon/:id", (req, res) => {
  pokemon[req.params.id].id = req.body.id;
  pokemon[req.params.id].name = req.body.name;

  if (pokemon[req.params.id].type.length === 2) {
    pokemon[req.params.id].type[0] = req.body.type1;
    pokemon[req.params.id].type[1] = req.body.type2;
  } else {
    pokemon[req.params.id].type[0] = req.body.type1;
  }

  pokemon[req.params.id].stats.hp = req.body.hp;
  pokemon[req.params.id].stats.attack = req.body.attack;
  pokemon[req.params.id].stats.defense = req.body.defense;
  pokemon[req.params.id].stats.spattack = req.body.spattack;
  pokemon[req.params.id].stats.spdefense = req.body.spdefense;
  pokemon[req.params.id].stats.speed = req.body.speed;

  pokemon[req.params.id].misc.classification = req.body.classification;
  pokemon[req.params.id].misc.height = req.body.height;
  pokemon[req.params.id].misc.weight = req.body.weight;
  pokemon[req.params.id].misc.capturerate = req.body.capturerate;
  pokemon[req.params.id].misc.eggsteps = req.body.eggsteps;

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
app.delete("/pokemon/:id", (req, res) => {
  pokemon.splice(req.params.id, 1);
  res.redirect("/pokemon");
});

app.listen(port);
