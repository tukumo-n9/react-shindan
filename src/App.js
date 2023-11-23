import { useState } from 'react';
import './App.css';

export default function App() {
  const [isResult, setIsResult] = useState(false);

  return (
    <div className="App">
      <div className="wrapper">
        <header className='header'>
          <h1>ペルソナシリーズおすすめ作品診断</h1>
        </header>
        <div className="container">
          {isResult
            ? <Result retryClick={setIsResult} />
            : <Question answerClick={setIsResult} />
          }
        </div>
      </div>
    </div>
  );
}

function Question({ answerClick }) {
  return (
    <>
      <div className="question">
        <p>Q1. ペルソナシリーズを知っていますか？</p>
      </div>
      <div className="answer">
        <button onClick={() => answerClick(true)}>はい</button>
        <button onClick={() => answerClick(true)} >いいえ</button>
      </div>
    </>
  );
}

function Result({ retryClick }) {
  return (
    <>
      <div className="result">
        <p>あなたにおすすめの作品は<em>ペルソナ3</em>です！</p>
      </div>
      <div className="description">
        <p>ペルソナ3の説明</p>
      </div>
      <div className="retry">
        <button onClick={() => retryClick(false)}>もう一度診断する</button>
      </div>
    </>
  )
}