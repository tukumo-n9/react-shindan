import { createClient } from 'microcms-js-sdk';

// API取得用のクライアントを作成
export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
});

// 質問データを取得
export const getQuestion = async () => {
  const questionData = await client.get({
    endpoint: "question",
  });

  return questionData;
};

// ブログの詳細を取得
export const getResult = async () => {
  const resultData = await client.get({
    endpoint: "result",
  });

  return resultData;
};