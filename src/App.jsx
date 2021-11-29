import { useState, useEffect } from 'react';
import Card from './components/Card';
import './App.css';


function App() {

  const [card, setCard] = useState([]); 
  const [playingCard1, setPlayingCard1] = useState();
  const [playingCard2, setPlayingCard2] = useState();
  const [lockCards, setLockCards] = useState();
  

 
  useEffect(() => { 
    
    fetchData(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
  
 


    async function fetchData(url) {
      const res1 = await fetch(url) 
      const deck = await res1.json();
      const res = await fetch (`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=52`);
      const data = await res.json();
      console.log(data);
      setCard(data);

      
    setCard(prevCard => {
      return prevCard.cards.map(card => { 
          card.matched=false;
          return card;      
    })
  });
}
    fetchData();
  }, []);

  
  function handleClickedCard (card) {
    if(!playingCard1) {
      setPlayingCard1(card)
    } else if (!playingCard2){
      setPlayingCard2(card);
    } else {
      
    }
  }

  useEffect(() => {
    
    if(playingCard1 && playingCard2) {
      setLockCards(true); 
    if(playingCard1.value === playingCard2.value) { 
      setCard(prevCard => { 

    return prevCard.map(card => { 
            if(card.code === playingCard1.code || card.code === playingCard2.code){
    return {...card, matched: true}

    } else {
    return card;

        }
      })
    })

    
    handleRestart(); 
      } else {
        
    setTimeout(() => handleRestart(), 1300); 
      }
    }
  }, [playingCard1, playingCard2]);


  const handleRestart = () => {
    setPlayingCard1();
    setPlayingCard2();
    setLockCards(false);
  
  };


  return (
    <div className="App">
      <div className="container"> 

     {card.length === 52 ? 
     (card.map(card => ( 

        <Card 
        card={card}
        key = {card.code}
        handleClickedCard = {handleClickedCard}
        TurnCard={card === playingCard1 || card === playingCard2 || card.matched === true}
        lockCards={lockCards}
        ></Card>
      
     ))):  
     (<p></p> )
     
     }

    </div>
     </div>

  );

     }

export default App;