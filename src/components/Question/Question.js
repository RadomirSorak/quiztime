/** @format */

import React, { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Link, useHistory } from "react-router-dom";
import he from "he";
import "./Question.css";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const handleSelect = (i) => {
    if (selected === i && selected === correct) {
      return "select";
    } else if (selected === i && selected !== correct) {
      return "wrong";
    } else if (i === correct) {
      return "select";
    }
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  };

  const history = useHistory();

  const handleNext = () => {
    if (currQues > 8) {
      history.push("/result");
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else {
      setError("Please select an option first");
    }
  };

  return (
    <section className="question">
      <h1>Question {currQues + 1}</h1>
      <div className="singleQuestion">
        <h2>
          {questions[currQues]?.question
            ? he.decode(questions[currQues].question)
            : "Loading question..."}
        </h2>
        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options &&
            options.map((i, index) => (
              <button
                onClick={() => handleCheck(i)}
                className={`singleOption ${selected && handleSelect(i)}`}
                key={index} // Consider using a more unique key if possible
                disabled={selected}>
                {i ? he.decode(i) : "Loading option..."}
              </button>
            ))}
        </div>
        <div className="controls">
          <Link to="/quiz-settings">
            <button className="quit-btn">Quit</button>
          </Link>
          <button className="next-question" onClick={handleNext}>
            Next Question
          </button>
        </div>
      </div>
    </section>
  );
};

export default Question;
