/** @format */

import React, { useEffect, useState } from "react";
import "./Quiz.css";
import Question from "../../components/Question/Question";

const Quiz = ({ name, score, questions, setScore }) => {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ])
    );
  }, [questions, currQues]);

  const handleShuffle = (option) => {
    return option.sort(() => Math.random() - 0.5);
  };

  return (
    <>
      <div className="quiz">
        <span className="subtitle">Welcome, {name}</span>
        <div className="quizInfo">
          <span>{questions[currQues]?.category}</span>
          <span>Score : {score}</span>
        </div>
        <Question
          currQues={currQues}
          setCurrQues={setCurrQues}
          questions={questions}
          options={options}
          correct={questions[currQues]?.correct_answer}
          score={score}
          setScore={setScore}
        />
      </div>
    </>
  );
};

export default Quiz;
