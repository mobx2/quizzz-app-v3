export default function Options({ question, dispatch, answer }) {
  const isAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          className={`btn btn-option 
              ${answer === index ? "answer" : ""}
              ${isAnswered && index === question.correctOption ? "correct" : ""}
              ${isAnswered && index !== question.correctOption ? "wrong" : ""}
            `}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
