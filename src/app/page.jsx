import App from "../components/App";
import { getQuestion, getResult } from '../libs/microcms';

export default async function Page() {
  const questionData = await getQuestion();
  const resultData = await getResult();

  return <App propsQuestionData={questionData} propsResultData={resultData} />;
}