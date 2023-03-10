// contains all the logic for War Card Game
import Deck from './Card_deck.js'

const deck = new Deck()
deck.shuffle()
console.log(deck.cards)