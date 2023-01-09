import './SingleCard.css'
export default function SingleCard({card,handlechoice,flipped,disabled}){
  const handleclick= () =>{
    if(!disabled){
      handlechoice(card)

    }

  }
    return(
        <div>
            <div className='card'>
            <div className={flipped ? "flipped":""}>
              <img   className='front' src={card.src} alt="card-front" />
              <img className='back' onClick={handleclick} src="/img/cover.png" alt="card-back" />
            </div>
          </div>



        </div>


    )
}