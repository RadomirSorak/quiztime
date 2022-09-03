import React from 'react'
import { useForm } from 'react-hook-form';
import './Contact.css';
import {Link, useHistory} from 'react-router-dom';
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import axios from "axios";

// Dit is de Home Pagina van de app.

function Contact() {

    //States aangemaakt om de data op te slaan van de gebruiker

    const { handleSubmit, formState: { errors }, register } = useForm();
    const [messageValue, setMessageValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');
    const [numberValue, setNumberValue] = React.useState('');
    const [reviewValue, setReviewValue] = React.useState('')
    const [checkedTerms, toggleCheckedTerms] = React.useState(false);
    const [names, setNames] = React.useState('');
    const [mail, setMail] = React.useState('');

    const history = useHistory();


    //Async function aangemaakt met een try en catch blok om de data van de gebruiker door te sturen naar de backend

    async function handleSubmitForm(e) {
        e.preventDefault();
        try {
           const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                "username": names,
                "email": mail,
                "password": passwordValue,
                "role": ["user"]
            })
            history.push("/login")
            console.log(result.data);
        }
        catch (e) {

            console.log(e)
        }
    }



    return (
        <>
            <h1>Beste Quizer,</h1>
                    <p>Leuk dat je er bent!
                    Wil je weten hoe hoog jij kan scoren? Maak dan eerst even een account aan!
                    Ben je hier al eerder geweest dan kun je uiteraard gewoon weer inloggen met je username en password.
                    Selecteer de categorie waarover jij wilt Quizen of probeer er meerdere om je kennis te verbreden over de diverse onderwerpen.
                    Om jezelf te blijven uitdagen kun je kiezen uit verschillende levels van moeilijkheid.
                    Jouw Final Score geeft aan of je de hoogste score hebt weten te behalen of dat je jezelf kan verbeteren.
                    Knowledge is power!
                        QUIZ TIME…</p>
            <p>Je kunt ook <Link to="/login">inloggen</Link> of scroll naar beneden om jezelf te registeren als je nog geen
                account hebt.</p>
                <div className="form-setting">
                <form onSubmit={handleSubmitForm}>
                    <fieldset className="fieldset">
                        <legend>Form</legend>
                            <div className="input-group">
                        <label htmlFor="username">
                            Username</label>
                            <input
                                placeholder="Username"
                                id="username"
                                type="username"
                                {...register("name", {required: true,})}
                                value={names}
                                onChange={(e) => setNames(e.target.value)}
                            />
                            {errors.name && <ErrorMessage>Please fill in your Name</ErrorMessage>}


                        <label htmlFor="user-email">
                            E-mail</label>
                            <input
                                placeholder="E-mail"
                                id="user-email"
                                type="email"
                                {...register("email", {required: true,})}
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                            />
                            {errors.mail && <ErrorMessage>Please fill in your Name</ErrorMessage>}

                        <label htmlFor="user-password">
                            Password</label>
                            <input
                                placeholder="Password"
                                id="user-password"
                                type="password"
                                {...register("user-password")}
                                value={passwordValue}
                                onChange={(e) => setPasswordValue(e.target.value)}
                            />
                            {errors.password && <ErrorMessage>Please fill in your Password</ErrorMessage>}

                            </div>
                        <br/>
                        <legend>Where did you find out about us?</legend>
                        <label htmlFor="review"></label>
                            <textarea
                                {...register("review", {maxLength: 100,})}
                                id="review"
                                cols="45"
                                rows="5"
                                placeholder="Place your comment here."
                                value={reviewValue}
                                onChange={(e) => setReviewValue(e.target.value)}
                            />

                        <label htmlFor="terms-and-conditions">
                            <input
                                type="checkbox"
                                {...register("terms-and-conditions")}
                                checked={checkedTerms}
                                onChange={() => toggleCheckedTerms(!checkedTerms)}
                            />
                            I agree to the Terms and Conditions
                        </label>

                        <button
                            className="register-btn"
                            disabled={!checkedTerms && !passwordValue && !names && !mail && !setNumberValue && !setMessageValue}
                            type='submit'
                        >
                            Register
                        </button>
                    </fieldset>
                </form>
            </div>
        </>
    )
}

export default Contact;