import {useEffect, useState} from 'react'
import './App.css';
import SingleCard from './components/SingleCard';
// yeh card array hmesha constant rahgea toh
const cardImages = [
  {"src" : "/img/helmet-1.png",matched:false},
  {"src" : "/img/potion-1.png",matched:false},
  {"src" : "/img/ring-1.png",matched:false},
  {"src" : "/img/scroll-1.png",matched:false},
  {"src" : "/img/shield-1.png",matched:false},
  {"src" : "/img/sword-1.png",matched:false}
]
function App() {
  const [cards,setCards ] = useState([])
  const [turns,setTurns] = useState(0)
  const [choiceone,setChoiceone] = useState(null)
  const [choicetwo,setChoicetwo] = useState(null)
  const [disabled,setDisable] = useState(false)
  // shuffle cards
  const shuffleCards = ()=>{
    const shuffledCards = [...cardImages,...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({...card,id:Math.random()}))
    setChoiceone(null)
    setChoicetwo(null)
    setCards(shuffledCards) 
    setTurns(0)

  }
  const handlechoice = (card) =>{
    choiceone ? setChoicetwo(card) : setChoiceone(card)
    
  }
  // compare two selected cards

  useEffect(()=>{
    if(choiceone && choicetwo){
      setDisable(true)
        if(choiceone.src === choicetwo.src){
          setCards(prevcards=>{
            return prevcards.map((card)=>{
              if(card.src === choiceone.src){
                return {...card,matched:true}

              }
              else{
                return card
              }

            })
          })
          
          resetTurn()
        }
        else{
          
          setTimeout(()=>resetTurn(),1000)
        }
    }

  },[choiceone,choicetwo])
  
  // reset choices and increase turn
  const resetTurn = () =>{
    setChoiceone(null);
    setChoicetwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisable(false)
  }

  // start a new game automatically
  useEffect(()=>{
    shuffleCards()

  },[])
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card)=>(
          <SingleCard key={card.id} card={card} handlechoice={handlechoice} 
          flipped={card === choiceone || card===choicetwo || card.matched}disabled={disabled}/>
        ))}
      </div>
      <p>Turns :{turns}</p>
      
    </div>
  );
}

export default App;
