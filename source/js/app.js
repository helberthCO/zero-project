import "../scss/index.scss"
import { imagesFolder, cardArray } from './data.js';

(_=> {
  let whiteImg = `${imagesFolder}/white.png`;
  let blankImg = `${imagesFolder}/blank.png`;

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  let cardsChosen =[];
  let cardsChosenId =[];
  let cardsWon =[];

  //Create board
  const createBoard = array => {
    array.map( (element, index) => {
      let card = document.createElement('img');
      card.setAttribute('src', blankImg);
      card.setAttribute('data-id', index);
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    })
  };

  //Check for matches
  const checkForMatch = _=> {
    let cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if(cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].setAttribute('src', whiteImg);
      cards[optionTwoId].setAttribute('src', whiteImg);
      cardsWon.push(cardsChosen);
    }else {
      cards[optionOneId].setAttribute('src', blankImg);
      cards[optionTwoId].setAttribute('src', blankImg);
    }
    cardsChosen = []; 
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;

    if(cardsWon.length >= cardArray.length/2) {
      resultDisplay.textContent = 'Congratulations! You found them all!'
    }
  };

  //Flip your cards
  function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    
    this.setAttribute('src', cardArray[cardId].img);

    if(cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

  createBoard(cardArray);

}
)();