/** @format */
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import Contact from "./Pages/Contact/Contact";
import Login from "./Pages/Login/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";
import React, { useEffect, useState } from "react";
import DayQuiz from "./Pages/DayQuiz/DayQuiz";

function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [currQues, setCurrQues] = useState(0);
  const [score, setScore] = useState(0);
  const [passwordValue, setPasswordValue] = React.useState("");
  const [isQuizStartedFromSettings, setIsQuizStartedFromSettings] =
      useState(false);
  const [favoriteSettings, setFavoriteSettings] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavoriteSettings(JSON.parse(storedFavorites));
    }
    setIsQuizStartedFromSettings(false); // Reset when navigating to other pages
  }, []);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
    );
    setQuestions(data.results);
  };
  const addFavoriteSetting = (favoriteSetting) => {
    const updatedFavorites = [...favoriteSettings, favoriteSetting];
    setFavoriteSettings(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/" exact>
              <DayQuiz name={name} />
            </Route>
            <Route path="/contact" exact>
              <Contact name={name} />
            </Route>
            <Route path="/login" exact>
              <Login name={name} password={passwordValue} />
            </Route>
            <Route path="/quiz-settings" exact>
              <Home
                  name={name}
                  setName={setName}
                  fetchQuestions={fetchQuestions}
                  score={score}
                  favoriteSettings={favoriteSettings}
                  setFavoriteSettings={setFavoriteSettings}
                  category={category}
                  setCategory={setCategory}
                  difficulty={difficulty}
                  setDifficulty={setDifficulty}
                  questions={questions}
                  currQues={currQues}
                  setCurrQues={setCurrQues}
                  setIsQuizStartedFromSettings={setIsQuizStartedFromSettings}
              />
            </Route>
            <Route path="/quiz" exact>
              <Quiz
                  name={name}
                  questions={questions}
                  score={score}
                  setScore={setScore}
                  setQuestions={setQuestions}
                  currQues={currQues}
                  setCurrQues={setCurrQues}
              />
            </Route>
            <Route path="/result" exact>
              <Result
                  name={name}
                  score={score}
                  addFavoriteSetting={addFavoriteSetting}
                  category={category}
                  difficulty={difficulty}
                  setIsQuizStartedFromSettings={setIsQuizStartedFromSettings}
                  isQuizStartedFromSettings={isQuizStartedFromSettings}
              />
            </Route>
          </Switch>
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
  );
}

export default App;