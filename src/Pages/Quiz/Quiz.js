/** @format */

import React, { useEffect, useState } from "react";
import "./Quiz.css";
import Question from "../../components/Question/Question";

const Quiz = ({ name, score, questions, setScore, currQues, setCurrQues }) => {
  const [options, setOptions] = useState();

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
    <main className="quiz">
      <h2 className="subtitle">Welcome, {name}</h2>
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
    </main>
  );
};

export default Quiz;
