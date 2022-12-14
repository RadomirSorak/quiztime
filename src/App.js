import {BrowserRouter, Route, Switch} from "react-router-dom";
import axios from "axios";
import Contact from "./Pages/Contact/Contact"
import Login from "./Pages/Login/Login";
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";
import {useState} from "react";
import React from "react";



function App() {

    const [name, setName] = useState("");
    const [questions, setQuestions] = useState("");
    const [score, setScore] = useState(0);
    const [passwordValue, setPasswordValue] = React.useState('');

    const fetchQuestions = async(category = "", difficulty = "") => {

        const {data} = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)
        setQuestions(data.results);
    };

    return (
        <BrowserRouter>
        <div className="App" style={{backgroundImage: "url(./background.jpg)"}}>
            <Header />
            <Switch>
                <Route path="/" exact>
                    <Contact name={name}
                    />
                </Route>
                <Route path="/login" exact>
                    <Login name={name}
                           password={passwordValue}
                    />
                </Route>
                <Route path="/quiz-settings" exact>
                    <Home name={name}
                      setName={setName}
                      fetchQuestions={fetchQuestions}
                    />
                </Route>
                <Route path="/quiz" exact>
                    <Quiz name={name}
                          questions={questions}
                          score={score}
                          setScore={setScore}
                          setQuestions={setQuestions}
                    />
                </Route>
                <Route path="/result" exact>
                    <Result name={name}
                            score={score} />
                </Route>
            </Switch>
        </div>
            <Footer />
        </BrowserRouter>
    );
}

export default App;