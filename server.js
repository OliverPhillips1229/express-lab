

const express = require('express');
const app = express();
const PORT = 3000;

// --- Route 1: Be Polite, Greet the User ---
app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    // added this for a bit of fun
    const greetings = [
        `Hello there, ${username}!`,
        `What a delight it is to see you once more, ${username}.`,
        `Hey hey, ${username}! Glad you stopped by.`,
        `${username}, you're looking wonderful today!`,
        `Ah, ${username}, we meet again!`
    ];
    const randomIndex = Math.floor(Math.random() * greetings.length);
    res.send(greetings[randomIndex]);
});

// --- Route 2: Rolling the Dice ---
app.get('/roll/:number', (req, res) => {
    const num = parseInt(req.params.number);
    if (isNaN(num)) {
        return res.send("You must specify a number.");
    }
    const result = Math.floor(Math.random() * (num + 1));
    res.send(`You rolled a ${result}`);
});

// --- Route 3: I Want THAT One! ---
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const item = collectibles[index];

    if (!item) {
        return res.send("This item is not yet in stock. Check back soon!");
    }

    res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
});

// --- Route 4: Filter Shoes by Query Parameters ---
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
    const { ['min-price']: min, ['max-price']: max, type } = req.query;

    let filtered = shoes;  
    if (min) {
        const minPrice = parseFloat(min);
        if (!isNaN(minPrice)) {
            filtered = filtered.filter(shoe => shoe.price >= minPrice);
        }
    }
    if (max) {
        const maxPrice = parseFloat(max);
        if (!isNaN(maxPrice)) {
            filtered = filtered.filter(shoe => shoe.price <= maxPrice);
        }
    }
    if (type) {
        filtered = filtered.filter(shoe => shoe.type.toLowerCase() === type.toLowerCase());
    }

    if (filtered.length === 0) {
        return res.send("No shoes matched your search.");
    }

    const responseText = filtered
        .map(shoe => `${shoe.name} — $${shoe.price} (${shoe.type})`)
        .join('\n');

    res.send(responseText);
});



    // --- Start the server ---
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
