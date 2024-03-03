/** @format */

import "./Result.css";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Result = ({
                    name,
                    score,
                    addFavoriteSetting,
                    category,
                    difficulty,
                    isQuizStartedFromSettings,
                    setIsQuizStartedFromSettings,
                }) => {
    const history = useHistory();

    useEffect(() => {
        if (!name) {
            history.push("/quiz-settings");
        }
    }, [name, history]);

    const handleSaveToFavorites = () => {
        addFavoriteSetting({ category, difficulty }); // Sla de instellingen op als favorieten
        setIsQuizStartedFromSettings(false);
    };

    return (
        <div className="result">
            <span className="title">Final Score : {score}</span>
            <Link to="/quiz-settings">
                <button className="homepage-btn">Try a again</button>
            </Link>
            {isQuizStartedFromSettings && (
                <Link to="/quiz-settings">
                    <button onClick={handleSaveToFavorites} className="favorite-btn">
                        Save to Favorites
                    </button>
                </Link>
            )}
        </div>
    );
};

export default Result;