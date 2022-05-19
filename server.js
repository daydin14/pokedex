/*
index
show
new
edit
create
update
delete
*/
const express = require("express");
const app = express();
const port = 3000;
const pokemon = require("./models/pokemon");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// Index
app.get("/pokemon", (req, res) => {
  res.render();
});
// Show
app.get("/pokemon/:id", (req, res) => {
  res.render();
});
// New
app.get("/pokemon/new", (req, res) => {
  res.render();
});
// Edit
app.get("/pokemon/:id/edit", (req, res) => {
  res.render();
});
// Create
app.post("/pokemon/:id", (req, res) => {
  res.redirect("/pokemon");
});
// Update
app.put("/pokemon/:id", (req, res) => {
  res.redirect("/pokemon");
});
// Destroy/Delete
app.delete("pokemon/:id", (req, res) => {
  pokemon.splice(req.params.id, 1);
  res.redirect("/pokemon");
});
