/** @format */

import "./Home.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Categories from "../../Data/Categories";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const Home = ({
  name,
  setName,
  fetchQuestions,
  score,
  category,
  setCategory,
  difficulty,
  setDifficulty,
  favoriteSettings,
  setCurrQues,
  setIsQuizStartedFromSettings,
}) => {
  const [error, setError] = useState(false);
  const [topScore, setTopScore] = useState(score);

  const history = useHistory();

  const handleSubmit = () => {
    if (!name || !category || !difficulty) {
      setError(true);
    } else {
      setError(false);
      setTopScore(score);
      setCurrQues(0);
      setIsQuizStartedFromSettings(true);
      fetchQuestions(category, difficulty);
      history.push("/quiz");
    }
  };

  const handleFavoriteSettingClick = (favoriteSetting) => {
    setCategory(favoriteSetting.category);
    setDifficulty(favoriteSetting.difficulty);
    setCurrQues(0);
    setIsQuizStartedFromSettings(false);
    fetchQuestions(favoriteSetting.category, favoriteSetting.difficulty);
    history.push("/quiz");
  };

  const getCategoryName = (value) => {
    const numericValue = parseInt(value, 10);
    const selectedCategory = Categories.find(
      (cat) => cat.value === numericValue
    );
    return selectedCategory ? selectedCategory.category : "Unknown Category";
  };

  return (
    <main className="content">
      <section className="settings">
        <h2>Quiz Settings</h2>
        {error && <ErrorMessage>Please Fill all the Fields</ErrorMessage>}
        <div className="settings-select">
          <label htmlFor="username">User Name</label>
          <input
            id="username"
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Username"
          />
          <label htmlFor="category">Select Category:</label>
          <select
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="">All</option>
            {Categories.map((cat) => (
              <option value={cat.value} key={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>
          <label htmlFor="difficulty">Select Difficulty:</label>
          <select
            id="difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
          >
            <option value="">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button onClick={handleSubmit} className="start-btn">
          Start Quiz
        </button>
        <p>Top score {topScore}</p>
        {favoriteSettings.map((favoriteSetting, index) => (
          <button
            className="favorite-btn"
            key={index}
            onClick={() => handleFavoriteSettingClick(favoriteSetting)}
          >
            {`Favorite ${index + 1}: ${getCategoryName(
              favoriteSetting.category
            )} - ${favoriteSetting.difficulty}`}
          </button>
        ))}
      </section>
      <img src="/quiz.svg" className="banner" alt="quiz img" />
    </main>
  );
};

export default Home;
