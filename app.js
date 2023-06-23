class Spaceship {
    constructor(name, hull, firepower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }

    // Attack
    attack(target) {
        console.log(`${this.name} attacks ${target.name}.`);

        if (Math.random() <= this.accuracy) {
            target.hull -= this.firepower;
            console.log(`Hit! ${target.name} hull: ${target.hull}`);
        } else {
            console.log(`${this.name} missed the target.`);
        }
    }
}

// Player class
class Player {
    constructor(name, hull) {
        this.name = name;
        this.hull = hull;
    }

    // Attack
    attack(target) {
        console.log(`${this.name} attacks ${target.name}.`);

        if (Math.random() <= this.accuracy) {
            target.hull -= this.firepower;
            console.log(`Hit! ${target.name} hull: ${target.hull}`);
        } else {
            console.log(`${this.name} missed the target.`);
        }
    }
}

//USS Assembly spaceship creation
const ussAssembly = new Player("USS Assembly", 20);
ussAssembly.firepower = 5;
ussAssembly.accuracy = 0.7;
// array that holds the enemy ships in the game 
const alienShips = [];
//this number can be modified if you're feeling lucky and want to fight more waves
const numAlienShips = 6;
// the stats are however random for each alien ship
for (let i = 1; i <= numAlienShips; i++) {
    const hull = getRandomValue(3, 6);
    const firepower = getRandomValue(2, 4);
    const accuracy = getRandomValue(0.6, 0.8);

    alienShips.push(new Spaceship(`Alien Ship ${i}`, hull, firepower, accuracy));
}

// Game logic
let currentShipNum = 0;
let gameOver = false;

function attack() {
    if (gameOver) return;

    const currentShip = alienShips[currentShipNum];

    ussAssembly.attack(currentShip);

    if (currentShip.hull <= 0) {
        console.log(`${currentShip.name} destroyed!`);

        currentShipNum++;

        if (currentShipNum >= numAlienShips) {
            console.log("Congratulations! You destroyed all alien ships. You win!");
            gameOver = true;
            showPlayAgainButton();
        } else {
            console.log(`You have the option to attack the next ship or retreat.`);
        }
    } else {
        currentShip.attack(ussAssembly);

        if (ussAssembly.hull <= 0) {
            console.log("Your ship was destroyed by the aliens. You lose! Game over!");
            gameOver = true;
        }
    }
}

function retreat() {
    if (gameOver) return;

    console.log("You barely made it out safely! Game over!");
    gameOver = true;
    showPlayAgainButton();
}
function showPlayAgainButton() {
    const playAgainButton = document.getElementById('play-again');
    playAgainButton.style.display = 'inline';
}
//refreshes the page
function playAgain() {
    window.location.reload();
}

// used to get random values within a range when making the alien ships
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}