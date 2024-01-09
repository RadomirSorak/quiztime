/** @format */

import "./Home.css";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Categories from "../../Data/Categories";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useForm } from "react-hook-form";

//States aangemaakt om waardes in op te slaan voor de category, difficulty en errors.

const Home = ({ name, setName, fetchQuestions, score }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);
  const [topScore, setTopScore] = useState(score);
  const {
    formState: { errors },
    register,
  } = useForm();

  //History state met useHistory gemaakt om na gecheckte functie door te pushen naar de aangewezen pagina.

  const history = useHistory();

  //HandleSubmit functie om waardes na te checken voordat je gepusht wordt naar de volgende pagina.

  const handleSubmit = () => {
    if (!name || !category || !difficulty) {
      setError(true);
    } else {
      setError(false);
      setTopScore(score);
      fetchQuestions(category, difficulty);
      history.push("/quiz");
    }
  };

  return (
    <div className="content">
      <div className="settings">
        <span style={{ fontSize: 30 }}>Quiz Settings</span>
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
      </div>
      <img src="/quiz.svg" className="banner" alt="quiz img" />
    </div>
  );
};

export default Home;
