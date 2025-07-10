import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Loader from "./Loader";
import Error from "./Error";
import Question from "./Question";
import NextNutton from "./NextButton";
import Finish from "./Finish";
import Reset from "./Reset";
import Progress from "./Progress";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  // loading, ready, active, finish, error
  status: "loading",

  index: 0,

  answer: null,

  points: 0,

  highScore: 0,

  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,

        questions: action.payload,

        status: "ready",
      };

    case "dataFaild":
      return {
        ...state,

        status: "error",
      };

    case "start":
      return {
        ...state,

        status: "active",

        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "newAnswer":
      return {
        ...state,

        answer: action.payload,
      };

    case "nextQuestion":
      const question = state.questions.at(state.index);

      return {
        ...state,

        answer: null,

        index: state.index + 1,

        points:
          state.answer === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "finish":
      return {
        ...state,

        status: "finish",

        highScore:
          state.highScore > state.points ? state.highScore : state.points,
      };

    case "reset":
      return {
        ...state,

        status: "ready",

        index: 0,

        answer: null,

        points: 0,
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: (state.secondsRemaining -= 1),
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };

    default:
      throw new Error("Somthing went wrong");
  }
}

export default function App() {
  const [
    { secondsRemaining, highScore, questions, status, index, answer, points },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  const totalPoints = questions.reduce((prev, next) => prev + next.points, 0);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: "dataReceived", payload: res });
      })
      .catch((err) => dispatch({ type: "dataFaild" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Progress
              points={points}
              totalPoints={totalPoints}
              index={index}
              numQuestions={numQuestions}
            />
            <Question
              answer={answer}
              dispatch={dispatch}
              question={questions[index]}
            />

            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              {answer !== null && (
                <NextNutton
                  dispatch={dispatch}
                  numQuestions={numQuestions}
                  index={index}
                  status={status}
                />
              )}
            </Footer>
          </>
        )}

        {status === "finish" && (
          <>
            <Finish
              highScore={highScore}
              totalPoints={totalPoints}
              points={points}
            />

            <Reset dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}
