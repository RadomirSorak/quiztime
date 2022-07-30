import "./Result.css"
import {useEffect} from "react";
import {useHistory} from "react-router-dom";


const Result = ({name, score}) => {

    const history = useHistory();

    useEffect(() => {
        if (!name) {
            history.push("/")
        }},[name, history]);


    return (
        <div className="result">
            <span className="title">Final Score : {score}</span>
            <button className="homepage-btn"
                    >Go To Homepage</button>

        </div>
    );
};

export default Result;