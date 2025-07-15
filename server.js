
const express = require('express');
const app = express();
const PORT = 3000;

app.use(morgan('dev')); // use morgan to log requests

app.get('/greetings/:username', (req, res) => {
  const username = req.params.username;
  const greetings = [
    `Hello there, ${username}!`,
    `What a delight it is to see you once more, ${username}.`,
    `Hey hey, ${username}! Glad you stopped by.`,
    `${username}, you're looking wonderful today!`
  ];

  const randomIndex = Math.floor(Math.random() * greetings.length);
  res.send(greetings[randomIndex]);
});


app.get('/roll/:number', (req, res) => {
  const number = parseInt(req.params.number, 10);
  if (isNaN(number) || number < 1) {
    return res.status(400).send('Please provide a valid positive integer.');
  }
  
  const roll = Math.floor(Math.random() * number) + 1;
  res.send(`You rolled a ${roll} on a ${number}-sided die.`);
});

const collectables = [
    { name: 'Shiny Ball', price:5.95 },
    { name: 'Autographed picture of a dog', price: 10 },
    { name: 'Vintage 1970s yoghurt SOLD AS-IS', price: 0.99 },
];

app.get('/collectables/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    const item = collectables[index];
    if (!item) {    
        return res.status(404).send('Collectable not found.');
    }
    res.send(`So, you want the ${item.name}? For $${item.price.toFixed(2)}, it can be yours!`);
});

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    const {['min-price']: minPrice, ['max-price']: maxPrice} = req.query;

    let filteredShoes = shoes;

    if (minPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(maxPrice));
    }

    if (filteredShoes.length === 0) {
        return res.status(404).send('No shoes found matching your criteria.');
    }

    res.send(filteredShoes);
});

