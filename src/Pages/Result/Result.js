/** @format */

import "./Result.css";
import { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

const Result = ({
  name,
  score,
  addFavoriteSetting,
  category,
  difficulty,
  isQuizStartedFromSettings,
  setIsQuizStartedFromSettings,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (!name) {
      history.push("/quiz-settings");
    }
  }, [name, history]);

  const handleSaveToFavorites = () => {
    addFavoriteSetting({ category, difficulty }); // Save settings as favorites
    setIsQuizStartedFromSettings(false);
  };

  return (
    <main className="result">
      <h2 className="title">Final Score: {score}</h2>
      <Link to="/quiz-settings">
        <button className="homepage-btn">Try again</button>
      </Link>
      {isQuizStartedFromSettings && (
        <button onClick={handleSaveToFavorites} className="favorite-btn">
          Save to Favorites
        </button>
      )}
    </main>
  );
};

export default Result;
