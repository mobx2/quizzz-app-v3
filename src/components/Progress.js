export default function Progress({ points, totalPoints, numQuestions, index }) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + 1} />
      <p>
        Question {index + 1} / <strong>{numQuestions}</strong>
      </p>
      <p>
        {points} / <strong>{totalPoints}</strong>
      </p>
    </header>
  );
}
