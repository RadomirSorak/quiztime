/** @format */

import "./Home.css";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Categories from "../../Data/Categories";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useForm } from "react-hook-form";

//States aangemaakt om waardes in op te slaan voor de category, difficulty en errors.

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
  const {
    formState: { errors },
    register,
  } = useForm();

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
        <div className="settings">
          <span>Quiz Settings</span>
          {error && <ErrorMessage>Please Fill all the Fields</ErrorMessage>}
          <div className="settings-select">
            <p>User Name</p>
            <input
                type="Name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Username"
            />
            <h2>Select Category:</h2>
            <select
                id="category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}>
              <option>All</option>
              {Categories.map((cat) => (
                  <option value={cat.value} key={cat.category}>
                    {cat.category}
                  </option>
              ))}
            </select>
            <h2>Select Difficulty:</h2>
            <select
                id="difficulty"
                onChange={(e) => setDifficulty(e.target.value)}
                value={difficulty}>
              <option>All</option>
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
                  onClick={() => handleFavoriteSettingClick(favoriteSetting)}>
                {`Favorite ${index + 1}: ${getCategoryName(
                    favoriteSetting.category
                )} - ${favoriteSetting.difficulty}`}
              </button>
          ))}
        </div>
        <img src="/quiz.svg" className="banner" alt="quiz img" />
      </main>
  );
};

export default Home;
 