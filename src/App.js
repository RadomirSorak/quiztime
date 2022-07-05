import "./App.css";
import React, {useState, useEffect} from 'react';
import axios from 'axios';


function App() {

    // const [data, setData] = useState(null);
    // const [category, setCategory] = useState(null);
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([]);
    const [rightAnswer, setRightAnswer] = useState('');
    const [hasClicked, setHasClicked] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        setHasClicked(false)

        async function openTrivia() {

            try {

                const result = await axios.get('https://opentdb.com/api.php?amount=10');
                const correctAnswers = result.data.results[0].correct_answer
                const incorrectAnswers = result.data.results[0].incorrect_answers

                setRightAnswer(correctAnswers)
                // setAnswers([correctAnswers,...incorrectAnswers])
                setQuestion(result.data.results[0].question);

                const allAnswers = [correctAnswers, ...incorrectAnswers]

                const answerContainer = allAnswers.map((item) => {
                    return {
                        answer: item,
                        isCorrect: item === correctAnswers
                    }
                })
                setAnswers(answerContainer);

            } catch (e) {
                console.error(e);
            }
        }

        openTrivia();
    }, [shouldRender])


    function getCategory(e) {

        
        if (e.target.value === "entertainment") {

        }
        if (e.target.value === "general knowledge") {

        }
        if (e.target.value === "history") {

        }
    }

    function onButtonClick(value) {
        // value === rightAnswer ? console.log(true) : console.log(false)

        setHasClicked(true)
        setTimeout(() => {
            setShouldRender(!shouldRender)
        }, "1500")

    }

    return (
        <div className="App">

            <h1 id="head-title">Quiz Time</h1>

            <select name="" id="category" onChange={getCategory}>
                <option value="entertainment">Entertainment</option>
                <option value="general knowledge">General Knowledge</option>
                <option value="history">History</option>
            </select>

            <select name="" id="difficulty">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

            <p id="questions">{question}</p>


            <div id="answer-container">
                {answers.map((item) => {
                        return (
                            <button
                                id="answ-btn"
                                className={`
                                ${(hasClicked && item.isCorrect ? "correct-answer" : "")}
                                ${(hasClicked && !item.isCorrect ? "incorrect-answer" : "")}`
                                }
                                key={item.answer}
                                onClick={() => onButtonClick(item.answer)}
                                >{item.answer}</button>)
                    })

                }
            </div>

        </div>
    );
}

export default App;
