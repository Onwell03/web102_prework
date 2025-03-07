/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
// const GAMES_JSON = JSON.parse(GAMES_DATA)

// update JSON.parse
let GAMES_JSON = [];
try {
    GAMES_JSON = JSON.parse(GAMES_DATA);
} catch (error) {
    console.error('Error parsing JSON data:', error);
    // Handle the error (e.g., provide default data or display an error message)
}


// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
} 

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (const game of games){
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" />
            <h2>${game.name}</h2>
            <p>Description: ${game.description}</p>
            <p>Pledged: $${game.pledged}</p>
            <p>Goal: $${game.goal}</p>
            <p>Backers: ${game.backers}</p>
        `
        // append the game to the games-container
        gamesContainer.append(gameCard);
    }

    
        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")




}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON)
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const initialValue = 0;
const sumWithInitial = GAMES_JSON.reduce((acc, cv) => acc + cv['backers'], initialValue);


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${sumWithInitial}`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const initial = 0
const sumWithI = GAMES_JSON.reduce((x, y) => x + y['pledged'], initial);

// set inner HTML using template literal
raisedCard.innerHTML = `$${sumWithI}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const result1 = GAMES_JSON.filter((game) => game['goal'] - game['pledged'] > 0);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(result1)

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const result2 = GAMES_JSON.filter((game) => game['goal'] - game['pledged'] < 0);


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(result2)

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

//unfundedBtn.addEventListener("click", filterUnfundedOnly);
//fundedBtn.addEventListener("click", filterFundedOnly);
//allBtn.addEventListener("click", showAllGames);

// Update the button click event listeners
unfundedBtn.addEventListener("click", function() {
    filterUnfundedOnly();
    setActiveButton(unfundedBtn);
});

fundedBtn.addEventListener("click", function() {
    filterFundedOnly();
    setActiveButton(fundedBtn);
});

allBtn.addEventListener("click", function() {
    showAllGames();
    setActiveButton(allBtn);
});

// Function to set the active button style
function setActiveButton(activeButton) {
    [unfundedBtn, fundedBtn, allBtn].forEach(btn => btn.classList.remove("active"));
    activeButton.classList.add("active");
}


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const result3 = GAMES_JSON.filter((game) => game['goal'] - game['pledged'] > 0);
const unfunded = result3.length;

// create a string that explains the number of unfunded games using the ternary operator
const descrip = unfunded > 0 ? `We have ${unfunded} unfunded games on our website, check them below!` : "All the games we have now on our webisite have been fully funded";


// create a new DOM element containing the template string and append it to the description container
const newElement = document.createElement("div");
newElement.innerHTML = `<p>${descrip} </p>`;
descriptionContainer.appendChild(newElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [ indexOne, indexTwo ] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const newTop = document.createElement("div");
newTop.innerHTML = `<p>${indexOne.name} </p>`;
firstGameContainer.append(newTop);
// do the same for the runner up item
const newRunnerUp = document.createElement("div");
newRunnerUp.innerHTML = `<p>${indexTwo.name}</p>`;
secondGameContainer.append(newRunnerUp);
