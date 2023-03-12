class Card {
  // This Class defines the rank, suit, and values of the cards
  constructor(rank, suit, value) {
    this.rank = rank;
    this.suit = ["♠", "♣", "♥", "♦"];
    // set to an array Suits = Suits, Values = Numerical Value of Cards
    this.value = [
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
}

class Deck {
  // this Class populates the deck
  constructor() {
    this.cards = [];
  }

  get card() {
    return this.cards;
  }

  buildDeck() {
    this.populate();
    this.shuffle();
    return this.cards;
  }

  populate() {
    const suits = ["♠", "♣", "♥", "♦"];
    const ranks = [
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
      "A",
    ];
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    for (let i = 0; i < suits.length; i++) {
      for (let a = 0; a < ranks.length; a++) {
        this.cards.push(new Card(ranks[a], suits[i], values[a]));
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
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
    return this.suit.flatMap((suit) => {
      console.log("flatMap suit:", suit);
      //flat map works similar to map,  condenses all arrays into one array
      return this.value.map((value) => {
        return new Card(suit, value);
      });
    });
  }
}

class Player {
  constructor(name) {
    this.playerName = name; // defines the player
    this.playerScore = 0;
    this.playerDeck = [];
  }

  get name() {
    return this.playerName;
  }

  get deck() {
    return this.playerDeck;
  }

  get score() {
    return this.playerScore;
  }
  set deck(newDeck) {
    if (Array.isArray(newDeck)) {
      this.playerDeck = newDeck;
    }
  }

  set score(newScore) {
    if (newScore != isNaN) {
      this.playerScore = newScore;
    }
  }
}

class Game {
  constructor() {
    this.players = [];
    this.deck = [];
  }

  createGame() {
    this.players[0] = new Player(
      prompt("Whom do I have the pleasure of going to War with?") // message prompt to begin game
    );
    this.players[1] = new Player("Computer"); // second player automated

    console.log(`Game on ${this.players[0].name}!`);

    const cards = new Deck().buildDeck();

    this.players[0].deck = [...cards.slice(0, 26)]; //split deck into two equal piles, .ceil theoretically corrects a rounding error. Fortunately 52 divides equally
    this.players[1].deck = [...cards.slice(26, 52)];

    console.log("I DECLARE WAR!!!"); // prompt

    for (let i = 0; i < this.players[0].deck.length; i++) {
      if (this.players[0].deck[i].value > this.players[1].deck[i].value) {
        this.players[0].score += 1;
        let winningHand = `${this.players[0].deck[i].rank} of ${this.players[0].deck[i].suit}`;
        console.log(`${this.players[0].name} has won with ${winningHand}`);
      } else {
        this.players[1].score += 1;
        let winningHand = `${this.players[1].deck[i].rank} of ${this.players[0].deck[i].suit}`;
        console.log(`Computer has won with ${winningHand}`);
      }
    }

    console.log("Game Over!");
    if (this.players[0].score > this.players[1].score) {
      console.log(
        `${this.players[0].name.toUpperCase()} WON WAR with a score of ${
          // prompt declaring the winner
          this.players[0].score
        }`
      );
    } else if (this.players[0].score < this.players[1].score) {
      console.log(
        `${this.players[1].name.toUpperCase()} WON WAR with a score of ${
          // prompt declaring the winner
          this.players[1].score
        }`
      );
    } else {
      console.log(`${this.players[0].name.toUpperCase()} AND COMPUTER TIED!`); // prompt declaring the tie
    }
  }
}

const game = new Game(); //start game
game.createGame();
