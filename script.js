    const app = (() => {

      const cache = {

        player: document.querySelector('.player_hand'),
        dealer: document.querySelector('.dealer_hand'),
        cardStack: document.querySelector('#cardStack'),
        fullDeck: [],
        playerDisplay: document.querySelector('.player_score'),
        dealerDisplay: document.querySelector('.dealer_score'),
        playerScore: 0,
        dealerScore: 0,
        start: document.getElementById('start'),
        stand: document.querySelector('.stand'),
        hit: document.querySelector('.hit'),
        restart:document.getElementById('restart'),

      }



      const game = () => {
        cache.start.addEventListener('click', deck)
      }




      //deck
      const deck = () => {
        let cardNumbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
        let cardSuits = ['hearts', 'clubs', 'spades', 'diam']
        for (var i = 0; i < cardSuits.length; i++) {
          for (var j = 0; j < cardNumbers.length; j++) {
            cache.fullDeck.push({
              id: 'card-' + cardNumbers[j],
              value: cardNumbers[j],
              suit: cardSuits[i],
              color: 'black',
              weight: parseInt(cardNumbers[j])
            })

          }

        }

        for (var i = 0; i < cache.fullDeck.length; i++) {
          if (cache.fullDeck[i].value == 'J' || cache.fullDeck[i].value == 'Q' || cache.fullDeck[i].value == 'K') {
            cache.fullDeck[i].weight = 10
          }
          if (cache.fullDeck[i].value == 'A') {
            cache.fullDeck[i].weight = 11
          }
          if (cache.fullDeck[i].suit.charAt(0) == 'h' || cache.fullDeck[i].suit.charAt(0) == 'd') {
            cache.fullDeck[i].color = 'red'

          }

        }

        shuffle(cache.fullDeck)

        let x = new Cards();
        for (var i = 0; i < cache.fullDeck.length; i++) {

          x.value = cache.fullDeck[i].value
          x.display = cache.cardStack
          x.suit = cache.fullDeck[i].suit
          x.color = cache.fullDeck[i].color
          x.createCard()

        }
        stackCards(cache.cardStack)
        deal()

      }

      let shuffle = (deck) => {
        // for 1000 turns
        // switch the values of two random cards
        for (let i = 0; i < 1000; i++) {
          let location1 = Math.floor((Math.random() * deck.length));
          let location2 = Math.floor((Math.random() * deck.length));
          let tmp = deck[location1];

          deck[location1] = deck[location2];
          deck[location2] = tmp;
        }


      }



      class Cards {
        constructor(id, value, suit, color, display) {

          this.id = id;
          this.value = value;
          this.suit = suit;
          this.weight = 0;
          this.color = color;
          this.display = display;

        }
        createCard() {
          let cardContainer = document.createElement('div');
          let valueTop = document.createElement('div');
          let valueSuit = document.createElement('div');
          let valueBottom = document.createElement('div');

          valueTop.classList.add('value-top')
          valueSuit.classList.add('suit')
          valueBottom.classList.add('value-bottom')
          valueTop.innerHTML = (`${this.value}`)
          valueSuit.innerHTML = (`&${this.suit};`)
          valueBottom.innerHTML = (`${this.value}`)
          cardContainer.classList.add('card_container')
          cardContainer.classList.add(`${this.color}`)
          cardContainer.innerHTML = (`${this.value}`)
          cardContainer.appendChild(valueTop)
          cardContainer.appendChild(valueSuit)
          cardContainer.appendChild(valueBottom)
          this.display.appendChild(cardContainer)
        }

      }

      const stackCards = (deck_div) => {

        let cards = document.getElementById('cardStack').children;

        for (var i = cards.length - 1; i >= 0; i--) {
          cards[i].style.top = i + 'px';
          cards[i].style.left = i + 'px';
          cards[i].classList.add('stacked_card');
        }


      }


      const deal = () => {
        cache.start.classList.add('displayNone')
        let playerScore = [];
        for (var i = 0; i < 4; i++) {
          playerScore.push(cache.fullDeck.pop())
        }
        cache.playerScore = (parseInt(playerScore[0].weight) + parseInt(playerScore[2].weight));
        cache.dealerScore = (parseInt(playerScore[1].weight) + parseInt(playerScore[3].weight));
        const deck_div = document.querySelectorAll('.card_container');
        let card1;
        let card2;
        let card3;
        let card4;
        for (let i = 0; i < deck_div.length; i++) {
          card1 = deck_div[51]
          card2 = deck_div[50]
          card3 = deck_div[49]
          card4 = deck_div[48]
        }

        card1.classList.remove('stacked_card')
        card4.classList.add('test')
        card2.classList.remove('stacked_card')
        card3.classList.remove('stacked_card')

        card4.classList.remove('stacked_card')
        cache.player.appendChild(card1)

        cache.player.appendChild(card3)
        cache.dealer.appendChild(card2)
        cache.dealer.appendChild(card4)
        card4.classList.add('cover_card')
        cache.hit.classList.add('displayBlock')
        cache.stand.classList.add('displayBlock')
        cache.playerDisplay.innerHTML = `<p> player score = ${cache.playerScore}`

        cache.hit.addEventListener('click', () => {



          hit(deck_div)
        })

        setTimeout(()=>{
          if(cache.dealerScore==21){

        alert('blackjack')
        }
        if(cache.playerScore==21){
          alert(' player has blackjack')

        }
        },2000)
        // setTimeout(compare, 1000)
      }


      const hit = () => {

        let remainingPack = document.querySelectorAll('.stacked_card')

        let newCard;
        for (var i = 0; i < remainingPack.length; i++) {
          newCard = remainingPack[i]
        }
        let nextCard = cache.fullDeck.pop();
        cache.playerScore += parseInt(nextCard.weight)
        newCard.classList.remove('stacked_card')
        cache.player.appendChild(newCard)
        cache.playerDisplay.innerHTML = `<p> player score = ${cache.playerScore}`
        if(cache.playerScore>21){
          cache.playerDisplay.innerHTML = `<p> player BUST = ${cache.playerScore}`

        }
      }






      const stand = () => {
        //reveal second card
        let cover = document.querySelector('.cover_card');
        cover.classList.remove('cover_card')

        //add cards whilst score under 17
        while (cache.dealerScore < 17 & cache.dealerScore < 21) {

          var cardClick = (function() {


            return function cardClicks(e) {



              let nextcard = cache.fullDeck.pop();


              cache.dealerScore += nextcard.weight
              cache.dealerDisplay.innerHTML = cache.dealerScore + 'test'

              // for(var i=0;i<nextcard.length;i++){
              //       standCard=nextcard[counter]
              // }



              //display next card

              let nextCardDisplay;
              let remainingPack = document.querySelectorAll('.stacked_card')
              for (var i = 0; i < remainingPack.length; i++) {
                nextCardDisplay = remainingPack[i]

              }

              nextCardDisplay.classList.remove('stacked_card')


              cache.dealer.appendChild(nextCardDisplay);




            }

          })()

          cardClick()


        }
        cache.dealerDisplay.innerHTML = 'dealer.score=' + cache.dealerScore

        if(cache.dealerScore>17 && cache.dealerScore>17 <22){

        setTimeout(function(){compare(cache.playerScore,cache.dealerScore)},2000)



      }
    }

const compare=(a,b)=>{
if(a>b){
  alert('player wins')
}
if(b>a){
  alert('dealer wins')

}
else{
  alert('push')
}



}


      return {

        init: () => {

          game()
        },
        standCta: () => {
          stand()
        },
        restartGame:()=>{
restart()

        }


      }

      //cards

    })()

    app.init()
