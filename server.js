// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// date Characters (DATA)
// =============================================================
var characters = [
  {
    name: "Test Daten",
    email: "test@nothing.net",
    gender: "female", 
    myAge: 40,
    ageMin: 30,
    ageMax: 40,
    model: 100,
    Qpaydate: 20,
    QageMin: 10,
    QageMax: 10,
    Qmodel: 10,
    Qyouspeak: 10,
    Qdatespeak: 10,
    Qdclub: 10,
    Qdinner: 10,
    Qbar: 10,
    Qpark: 10
     
  },
  
  
    
  
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// restart matching get is used as new data should be prsented as the array has more people
app.get("/api/characters", function(req, res) {
  return res.json(characters);
});

// Displays a single character, or returns false based upon matching
app.get("/api/characters/:character", function(req, res) {
  var chosen = req.params.character;

  console.log(chosen);

  for (var i = 0; i < characters.length; i++) {
    if (chosen === characters[i].routeName) {
      return res.json(characters[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/characters", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newcharacter = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newcharacter);

  characters.push(newcharacter);

  res.json(newcharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
