import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {AuthContext} from "../../context/AuthContext";
import { useHistory } from 'react-router-dom';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState("blabla");
    const [score, setScore] = useState(0);
    const { isAuth } = useContext(AuthContext);
    console.log(selectedOption)
    const history = useHistory();

    useEffect(() => {
        // Fetch een random vraag van de opentrivia web.
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(
                    'https://opentdb.com/api.php?amount=1&type=multiple'
                );
                setQuestions(response.data.results);
            } catch (error) {
                console.error('Error fetching question:', error);
            }
        };

        fetchQuestion();
    }, []); // Empty dependency array ensures the effect runs only once on component mount

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const goToQuiz = () => {
        history.push("/quiz-settings")
    };

    const goToRegister = () => {
        history.push("/contact")
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="quiz-container">
            <h1>Quiz App</h1>
            <div className="question-container">
                <p dangerouslySetInnerHTML={{ __html: questions[currentQuestion].question }} />
                <div className="options-container">
                    {shuffleOptions([
                        ...questions[currentQuestion].incorrect_answers,
                        questions[currentQuestion].correct_answer,
                    ]).map((option) => (
                        <button
                            key={option}
                            className={selectedOption === option ? 'selected' : ''}
                            onClick={() => handleOptionSelect(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
            {isAuth && selectedOption === selectedOption ? <button onClick={goToQuiz}>Go to Quiz</button> : <button onClick={goToRegister}>Register</button>}

        </div>
    );
};

// Helper function to shuffle an array
const shuffleOptions = (options) => {
    return options.sort(() => Math.random() - 0.5);
};

function App() {
    return (
        <div className="App">
            <Quiz />
        </div>
    );
}

export default App;

