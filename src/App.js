import { useState } from 'react';
import './App.css';

export default function App() {
  const [isResult, setIsResult] = useState(false);
  const [point, setPoint] = useState({
    p3: 0,
    p4: 0,
    p5: 0,
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionData = [
    {
      question: 'Q1. ペルソナ3が好きですか？',
      yes: 'p3',
      no: '',
    },
    {
      question: 'Q2. ペルソナ4が好きですか？',
      yes: 'p4',
      no: '',
    },
    {
      question: 'Q3. ペルソナ5が好きですか？',
      yes: 'p5',
      no: '',
    },
  ];

  const answer = (target) => {
    switch (target) {
      case 'p3':
        setPoint({...point, p3: point.p3 + 1});
        break;
      case 'p4':
        setPoint({...point, p4: point.p4 + 1});
        break;
      case 'p5':
        setPoint({...point, p5: point.p5 + 1});
        break;
      default:
        break;
    }
    if (currentQuestion === questionData.length - 1) {
      setIsResult(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const calclateResult = () => {
    const max = Math.max(point.p3, point.p4, point.p5);
    switch (max) {
      case point.p3:
        return 'ペルソナ3';
      case point.p4:
        return 'ペルソナ4';
      case point.p5:
        return 'ペルソナ5';
      default:
        return 'エラー：結果が正しく計算できませんでした。';
    }
  }

  const retry = () => {
    setIsResult(false);
    setPoint({
      p3: 0,
      p4: 0,
      p5: 0,
    });
    setCurrentQuestion(0);
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
            : <Question currentQuestionData={questionData[currentQuestion]} answerClick={answer} />
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

function Question({ currentQuestionData, answerClick }) {
  return (
    <>
      <div className="question">
        <p>{currentQuestionData.question}</p>
      </div>
      <div className="answer">
        <button onClick={() => answerClick(currentQuestionData.yes)}>はい</button>
        <button onClick={() => answerClick(currentQuestionData.no)} >いいえ</button>
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