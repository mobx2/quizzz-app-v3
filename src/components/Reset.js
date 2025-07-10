export default function Reset({ dispatch }) {
  return (
    <button onClick={() => dispatch({ type: "reset" })} className="btn btn-ui">
      Restart Quiz
    </button>
  );
}
