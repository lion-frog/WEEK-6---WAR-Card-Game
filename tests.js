describe('new Deck', function(){
    it('Deck should have 52 cards', function(){
        let testDeck = new Deck()
        expect(testDeck.cards.length).to.equal(52);
    });
    