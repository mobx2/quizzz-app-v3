export default function NextNutton({ status, index, dispatch, numQuestions }) {
  if (index < numQuestions - 1)
    return (
      <button
        onClick={() => dispatch({ type: "nextQuestion" })}
        className="btn btn-ui"
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        onClick={() => dispatch({ type: "finish" })}
        className="btn btn-ui"
      >
        Finish
      </button>
    );

  if (status === "finish")
    <button onClick={() => dispatch({ type: "reset" })} className="btn btn-ui">
      Restart Quiz
    </button>;
}
