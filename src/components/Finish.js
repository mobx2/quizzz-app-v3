export default function Finish({ highScore, points, totalPoints }) {
  const percentage = (points / totalPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        {emoji} You scored <strong> {points} </strong>
        out if {totalPoints} ({Math.trunc(percentage)}%)
      </p>
      <p className="highscore">(highScore: {highScore} points)</p>
    </>
  );
}
