import { useState } from 'react';
import './App.css';

export default function App() {
  const [isResult, setIsResult] = useState(false);
  const [point, setPoint] = useState({
    p3: 0,
    p4: 0,
    p5: 0,
  });

  const answer = () => {
    setPoint({...point, p3: point.p3 + 1});
    setIsResult(true);
  }

  const retry = () => {
    setIsResult(false);
    setPoint({
      p3: 0,
      p4: 0,
      p5: 0,
    });
  };

  return (
    <div className="App">
      <div className="wrapper">
        <header className='header'>
          <h1>ペルソナシリーズおすすめ作品診断</h1>
        </header>
        <div className="container">
          {isResult
            ? <Result retryClick={retry} />
            : <Question answerClick={answer} />
          }
          <div className="point-viewer">
            <h2>各選択肢のポイント</h2>
            <p>ペルソナ3: {point.p3}pt</p>
            <p>ペルソナ4: {point.p4}pt</p>
            <p>ペルソナ5: {point.p5}pt</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Question({ answerClick }) {
  return (
    <>
      <div className="question">
        <p>Q1. ペルソナ3が好きですか？</p>
      </div>
      <div className="answer">
        <button onClick={answerClick}>はい</button>
        <button onClick={answerClick} >いいえ</button>
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
        <button onClick={retryClick}>もう一度診断する</button>
      </div>
    </>
  )
}