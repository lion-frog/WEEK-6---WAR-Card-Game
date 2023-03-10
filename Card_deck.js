// general deck, so can be used for a later game 
// create all the cards in deck, all Caps to represent a Global Constant Variable (satic)
const SUITS = ['♠', '♣', '♥', '♦']
// set to an array Suits = Suits, Values = Numerical Value of Cards
const VALUES = [
    'A', 
    '2', 
    '3', 
    '4', 
    '5', 
    '6', 
    '7', 
    '8', 
    '9', 
    '10', 
    'J', 
    'Q', 
    'K'
]

export default class Deck {
    constructor (cards = freshDeck()) {  // This class encapsulates everything defined as Cards
        this.cards = cards 
    }
    // 'getter' or get binds an object property to a function 
    get numberOfCards(){
        return this.cards.length
    }
    // Array to allow to shuffle the deck, using the for Loop. Shuffles the deck, to earlier cards that havent been played yet. 
    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            //gives us a placement in our deck earlier in the deck where we currently are, random index, 
        const newIndex = Math.floor (Math.random() * (i + 1))
        // grabs old card, swaps new card
        const oldValue = this.cards [newIndex]
        //holds new index, while swapping old
        this.cards [newIndex] = this.cards[i]
        // intermediary value, allows access to old card before its overwritten
        this.cards[i] = oldValue
// gives us a perfectly random shuffle every time
        }
    }
}

class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }
} 
// create a new deck, with all 52 suits and value combinations
function freshDeck() {
    /* loop through all the suits, loop through all the values, 
    and combine them altogether inside one array */
    return SUITS.flatMap(suit => { //flat map works similar to map,  condenses all arrays into one array
        return VALUES.map(value => {
            return new Card(suit, value)
        })    
    })
}
