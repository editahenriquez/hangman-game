import { useEffect, useState } from 'react'
import './App.css'
import HangImage from './components/HangImage'
import { letters } from './helpers/letters'
import { getRandomWord } from './helpers/getRandomWord';

function App() {
  const [word, setWord] =useState(getRandomWord());
  const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length));
  const [attempts, setAttempts ] = useState(0);
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false);

  //console.log(word); //Help XD

  useEffect(() =>{
    if(attempts>=9){
      setLose(true);
    }
  },[attempts]);//Hooks

  useEffect(() =>{
    const currentHiddenWord=hiddenWord.split(' ').join('');
    if (currentHiddenWord==word){
      setWon(true);
    }
  },[hiddenWord, word])


  const checkLetter = (letter: string) =>{
    if (lose) return;
    if (won) return;

    if (!word.includes(letter)) {
      setAttempts(Math.min(attempts + 1,9));
      return;
    }
    
    const hiddenWordArray=hiddenWord.split(' ');
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
         hiddenWordArray[i] =letter;
        }
    }
    setHiddenWord(hiddenWordArray.join(' '));
  }

  const newGame = ()=> {
    const newWord= getRandomWord();
    setWord(newWord);
    setHiddenWord('_ '.repeat(newWord.length));
    setAttempts(0);
    setLose(false);
    setWon(false);
  }

  return (
    <div className="App">
        {/*Game images*/}
        <HangImage imageNumber={attempts}/>

        {/*Hidden word*/}
        <h3>{hiddenWord}</h3>

        {/*Attempts counter*/}
        <h3>Attempts: {attempts}</h3>

        {/*Lose message*/}
        {
          (lose)? <h2>You lost <span id='answer'>(Answer: {word})</span></h2>:<h2></h2>
        }

        {/*Won message*/}
        {
          (won)? <h2>Congratulations, You won!</h2>:<h2></h2>
        }

        {/*Letter buttons*/}
        {
          letters.map((letter) =>(
            <button key={letter} onClick={ () => checkLetter(letter)}>{letter}</button>
          ))
        }

        {/*Reset game*/}
        <br /><br />
        <button onClick={newGame}>New Game?</button>
    </div>
  )
}

export default App