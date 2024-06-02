/** @format */

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import "./Quiz.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showButton, setShowButton] = useState(false);
  const { isAuth } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    // Fetch een random vraag van de opentrivia web.
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=1&type=multiple"
        );
        setQuestions(response.data.results);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, []); // Een lege afhankelijkheidsarray zorgt ervoor dat het effect slechts één keer wordt uitgevoerd bij het monteren van het component.

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowButton(true);
  };

  const goToQuiz = () => {
    history.push("/quiz-settings");
  };

  const goToRegister = () => {
    history.push("/contact");
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <main className="quiz-container">
      <h1>Question of the day</h1>
      <div className="question-container">
        <p
          dangerouslySetInnerHTML={{
            __html: questions[currentQuestion].question,
          }}
        />
        <div className="options-container">
          {shuffleOptions([
            ...questions[currentQuestion].incorrect_answers,
            questions[currentQuestion].correct_answer,
          ]).map((option) => (
            <button
              key={option}
              className={selectedOption === option ? "selected" : ""}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {showButton && (
        <div className="result-container">
          {isAuth ? (
            <>
              <p>Try to take another round of the quiz</p>
              <button onClick={goToQuiz}>Go to Quiz</button>
            </>
          ) : (
            <>
              <p>
                To see the answer of this question please Register or log in{" "}
              </p>
              <button onClick={goToRegister}>Register</button>
            </>
          )}
        </div>
      )}
    </main>
  );
};

// Hulpfunctie om een array door elkaar te schudden.
const shuffleOptions = (options) => {
  return options.sort(() => Math.random() - 0.5);
};

export default Quiz;
