import { useState } from 'react';
import './App.css';

export default function App() {
  // 診断結果を表示するかどうか
  const [isResult, setIsResult] = useState(false);
  // 各作品のポイント
  const [point, setPoint] = useState({
    p3: 0,
    p4: 0,
    p5: 0,
  });
  // 現在の質問が何問目か
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // 質問のデータ
  const questionData = [
    {
      question: 'ペルソナ3が好きですか？',
      yes: 'p3',
      no: '',
    },
    {
      question: 'ペルソナ4が好きですか？',
      yes: 'p4',
      no: '',
    },
    {
      question: 'ペルソナ5が好きですか？',
      yes: 'p5',
      no: '',
    },
  ];

  // 診断結果のデータ
  const resuldData = {
    p3: {
      name: 'ペルソナ3',
      description: 'ペルソナ3の説明です。オルフェウスが出てきます。',
    },
    p4: {
      name: 'ペルソナ4',
      description: 'ペルソナ4の説明です。イザナギが出てきます。',
    },
    p5: {
      name: 'ペルソナ5',
      description: 'ペルソナ5の説明です。アルセーヌが出てきます。',
    },
  };

  // 質問に答えた時の処理
  const handleAnswer = (target) => {
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

  // ポイントが最大のものを返す
  const getPointMax = () => {
    const max = Math.max(point.p3, point.p4, point.p5);
    switch (max) {
      case point.p3:
        return 'p3';
      case point.p4:
        return 'p4';
      case point.p5:
        return 'p5';
      default:
        return null;
    }
  };

  // 最大のポイントを持つ作品のデータを返す
  const calclateResult = () => {
    const max = getPointMax();
    return resuldData[max];
  }

  // 診断をやり直す
  const handleRetry = () => {
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
          <h1><span>ペルソナシリーズ</span><span>おすすめ作品診断</span></h1>
        </header>
        <div className="container">
          {isResult
            ? <Result retryClick={handleRetry} lastResultData={calclateResult()} />
            : <Question currentQuestionNumber={currentQuestion + 1} currentQuestionData={questionData[currentQuestion]} answerClick={handleAnswer} />
          }
        </div>
        <DataViewer data={{isResult, point, currentQuestion, questionData, resuldData}} />
      </div>
    </div>
  );
}

// 質問画面のコンポーネント
function Question({ currentQuestionNumber ,currentQuestionData, answerClick }) {
  return (
    <>
      <div className="question">
        <p>{`Q${currentQuestionNumber}. ${currentQuestionData.question}`}</p>
      </div>
      <div className="answer">
        <button onClick={() => answerClick(currentQuestionData.yes)}>はい</button>
        <button onClick={() => answerClick(currentQuestionData.no)} >いいえ</button>
      </div>
    </>
  );
}

// 診断結果画面のコンポーネント
function Result({ retryClick, lastResultData: { name, description } }) {
  return (
    <>
      <div className="result">
        <p>あなたにおすすめの作品は<em>{name}</em>です！</p>
      </div>
      <div className="description">
        <p>{description}</p>
      </div>
      <div className="retry">
        <button onClick={retryClick}>もう一度診断する</button>
      </div>
    </>
  )
}

// データを表示するデバッグ用のコンポーネント
function DataViewer({ data }) {
  return (
    <div className="data-viewer">
      <pre>{JSON.stringify(data, undefined, 4)}</pre>
    </div>
  );
}