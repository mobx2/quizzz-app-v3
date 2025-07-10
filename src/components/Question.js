import Options from "./Options";

export default function Question({ answer, question, dispatch }) {
  return (
    <div>
      <h3>{question.question}</h3>
      <Options answer={answer} dispatch={dispatch} question={question} />
    </div>
  );
}
