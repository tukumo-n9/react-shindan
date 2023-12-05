"use client";

import { useState } from 'react';
import styles from './App.module.css';

export default function App({ propsQuestionData, propsResultData }) {
  // 診断が開始しているかどうか
  const [isStart, setIsStart] = useState(false);

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

  // 質問のデータ(CMSから取得)
  const [CMSQuestionData, setCMSQuestionData] = useState(propsQuestionData);

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

  // 診断結果のデータ(CMSから取得)
  const [CMSResultData, setCMSResultData] = useState(propsResultData);

  // 診断結果のデータ
  const resultData = {
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

  // 状況に合わせてスタート画面・質問画面・診断結果画面を表示する
  const switchScene = () => {
    if (!isStart) {
      return <Start startClick={handleStart} />;
    }
    if (isResult) {
      return <Result retryClick={handleRetry} lastResultData={calculateResult()} />;
    } else {
      return <Question currentQuestionNumber={currentQuestion + 1} currentQuestionData={questionData[currentQuestion]} answerClick={handleAnswer} />;
    }
  };

  // スタートボタンを押した時の処理
  const handleStart = () => {
    setIsStart(true);
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
  const calculateResult = () => {
    const max = getPointMax();
    return resultData[max];
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
    setIsStart(false);
  };

  return (
    <div className={styles.App}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1><span>ペルソナシリーズ</span><span>おすすめ作品診断</span></h1>
        </header>
        <div className={styles.container}>
          {switchScene()}
        </div>
        <DataViewer data={{isResult, point, currentQuestion, questionData, resultData, CMSQuestionData, CMSResultData}} />
      </div>
    </div>
  );
}

// スタート画面のコンポーネント
function Start({ startClick }) {
  return (
    <div className={styles.start}>
      <div className={styles.start__lead}>
        <p>「ペルソナ」シリーズは株式会社アトラスが制作・販売しているRPGシリーズです。</p>
        <p>昼は高校、夜は世界を救う戦いの二重生活。</p>
        <p>心の奥底に眠るもう一人の自分＝「ペルソナ」を解き放ち、強大な敵に立ち向かう。</p>
        <p>現在でもプレイすることが容易な作品である、ペルソナ3・4・5の中であなたにおすすめの作品を診断します。
        </p>
      </div>
      <div className={styles.start__button}><button onClick={startClick}>診断を始める</button></div>
    </div>
  );
}

// 質問画面のコンポーネント
function Question({ currentQuestionNumber ,currentQuestionData, answerClick }) {
  return (
    <>
      <div className={styles.question}>
        <p>{`Q${currentQuestionNumber}. ${currentQuestionData.question}`}</p>
      </div>
      <div className={styles.answer}>
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
      <div className={styles.result}>
        <p>あなたにおすすめの作品は<em>{name}</em>です！</p>
      </div>
      <div className={styles.description}>
        <p>{description}</p>
      </div>
      <div className={styles.retry}>
        <button onClick={retryClick}>もう一度診断する</button>
      </div>
    </>
  )
}

// データを表示するデバッグ用のコンポーネント
function DataViewer({ data }) {
  return (
    <div className={styles.dataViewer}>
      <pre>{JSON.stringify(data, undefined, 4)}</pre>
    </div>
  );
}