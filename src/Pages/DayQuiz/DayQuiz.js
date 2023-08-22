import React, {useEffect, useState } from 'react';
import axios from "axios";

const DayQuiz = () => {

    const [dayQuiz, setDayQuiz] = useState([])
    const url = 'https://opentdb.com/api.php?amount=1'
    useEffect(()=> {
        axios.get(url).then((response) => {
            setDayQuiz(response.data.results["0"].question)
            console.log(response.data.results["0"])
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <div className="result">
Hier zet je je quiz van de dag
            <p>{dayQuiz}</p>


        </div>
    );
};


export default DayQuiz;