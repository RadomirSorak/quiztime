import "./Home.css";
import React from "react";
import {useState } from "react";
import {useHistory} from "react-router-dom";
import Categories from "../../Data/Categories";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";


const Home = ({ name, setName, fetchQuestions }) => {
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [error, setError] = useState(false);

    const history = useHistory();

    const handleSubmit = () => {
        if (!category || !difficulty || !name) {
            setError(true);

        } else {
            setError(false);
            fetchQuestions(category, difficulty);
            history.push("/quiz");
        }
    };


    return (
        <div className="content">
            <div className="settings">
                <span style={{fontSize: 30}}>Quiz Settings</span>
                {error && <ErrorMessage>Please Fill all the Fields</ErrorMessage>}
                <div className="settings-select">
                    <input type="Name" onChange={(e) => setName(e.target.value)}/>
                    <h2>Select Category:</h2>
                    <select id="category"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                    >
                        <option>All</option>
                        {Categories.map((cat) => (
                            <option value={cat.value} key={cat.category}>{cat.category}</option>
                        ))}
                    </select>
                    <h2>Select Difficulty:</h2>
                    <select id="difficulty"
                            onChange={(e) => setDifficulty(e.target.value)}
                            value={difficulty}
                    >
                        <option>All</option>
                        <option>easy</option>
                        <option>medium</option>
                        <option>hard</option>
                    </select>
                </div>
                <button onClick={handleSubmit} className="start-btn">Start Quiz</button>
            </div>
            <img src="/quiz.svg" className="banner" alt="quiz img"/>
        </div>
    )

}

export default Home;