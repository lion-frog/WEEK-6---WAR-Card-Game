const CARD_VALUE_MAP = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  J: 13,
  K: 13,
  A: 14,
};

let playerDeck1, playerDeck2, inRound, stop;
// general deck, so can be used for a later game
// create all the cards in deck, all Caps to represent a Global Constant Variable (satic)

if (stop) {
  startGame();
  return;
}
class Deck {
  constructor() {
    // This class encapsulates everything defined as Cards
    this.cards = [];
    this.SUITS = ["♠", "♣", "♥", "♦"];
    // set to an array Suits = Suits, Values = Numerical Value of Cards
    this.VALUES = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
  }
  // 'getter' or get binds an object property to a function
  get numberOfCards() {
    return this.cards.length;
  }

  push(card) {
    this.cards.push(card);
  }
  // Array to allow to shuffle the deck, using the for Loop. Shuffles the deck, to earlier cards that havent been played yet.
  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      //gives us a placement in our deck earlier in the deck where we currently are, random index,
      const newIndex = Math.floor(Math.random() * (i + 1));
      // grabs old card, swaps new card
      const oldValue = this.cards[newIndex];
      //holds new index, while swapping old
      this.cards[newIndex] = this.cards[i];
      // intermediary value, allows access to old card before its overwritten
      this.cards[i] = oldValue;
      // gives us a perfectly random shuffle every time
    }
  }

  // create a new deck, with all 52 suits and value combinations
  freshDeck() {
    /* loop through all the suits, loop through all the values, 
    and combine them altogether inside one array */
    return this.SUITS.flatMap((suit) => {
      console.log("flatMap suit:", suit);
      //flat map works similar to map,  condenses all arrays into one array
      return this.VALUES.map((value) => {
        return new Card(suit, value);
      });
    });
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
}

//start game function - begin
function startGame() {
  const deck = new Deck();
  deck.freshDeck();
  deck.shuffle();

  //split deck into two equal piles, .ceil theoretically corrects a rounding error. Fortunately 52 divides equally
  const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
  //shuffles first 26 cards to player1
  playerDeck1 = new Deck(deck.cards.slice(0, deckMidpoint));
  // this deals the second set of leftover 26 cards to player 2
  playerDeck2 = new Deck(deck.cards.slice(0, deckMidpoint, deck.numberOfCards));
  inRound = false;
  stop = False;

  updateDeckCount();

  cleanBeforeRound();
} //Start game function - end

startGame(); //calls the function start game

function cleanBeforeRound() {
  inRound = false;
  Text.innerText = "";

  updateDeckCount();

  if (isRoundWinner(playerDeck1, playerDeck2)) {
    text.innerText = "Win";
    playerDeck.push(playerDeck1);
    playerDeck.push(playerDeck2);
  } else if (isRoundWinner(playerDeck2, playerDeck1)) {
    text.innerText = "Lose";
    playerDeck.push(playerDeck1);
    playerDeck.push(playerDeck2);
  } else {
    text.innerText = "Draw";
    playerDeck1.push(playerDeck1);
    playerDeck2.push(playerDeck2);
  }

  if (isGameOver(playerDeck)) {
    text.innerText = "You Lose!";
    stop = true;
  } else if (isGameOver(playerDeck2)) {
    text.innerText = "You Win!";
    stop = true;
  }
}

function flipCards() {
  inRound = true;
}

function updateDeckCount() {}

function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
}

function isGameOver(deck) {
  return deck.numberOfCards == 0;
}
