/** @format */

import React from "react";
import { useForm } from "react-hook-form";
import "./Contact.css";
import { Link, useHistory } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import axios from "axios";

// Dit is de Home Pagina van de app.

function Contact() {
  //States aangemaakt om de data op te slaan van de gebruiker

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  const [messageValue, setMessageValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const [numberValue, setNumberValue] = React.useState("");
  const [reviewValue, setReviewValue] = React.useState("");
  const [checkedTerms, toggleCheckedTerms] = React.useState(false);
  const [names, setNames] = React.useState("");
  const [mail, setMail] = React.useState("");

  const history = useHistory();

  //Async function aangemaakt met een try en catch blok om de data van de gebruiker door te sturen naar de backend.
  //HandleSubmitForm functie aangemaakt om functies te checken en door te voeren naar de SubmitButton.

  async function handleSubmitForm(e) {
    e.preventDefault();
    try {
      const result = await axios.post(
        "https://frontend-educational-backend.herokuapp.com/api/auth/signup",
        {
          username: names,
          email: mail,
          password: passwordValue,
          role: ["user"],
        }
      );
      history.push("/login");
    } catch (e) {
    }
  }

  return (
    <>
      <main className="form-setting">
        <h1>Dear Quizer,</h1>
        <p>
          Nice to have you here! Do you want to know how high you can score?
          Then first create an account! If you have been here before, you can of
          course log in again with your username and password. Select the
          category you want to Quiz about or try several to broaden your
          knowledge on the various topics. To keep challenging yourself, you can
          choose from different levels of difficulty. Your Final Score indicates
          whether you have managed to achieve the highest score or whether you
          can improve yourself. Knowledge is power! QUIZ TIME…
        </p>
        <p>
          You can also <Link to="/login">log in</Link> or scroll down to
          register if you don't have an account yet.
        </p>

        <form onSubmit={handleSubmitForm}>
          <fieldset className="fieldset">
            <legend>Form</legend>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                placeholder="Username"
                id="username"
                type="username"
                {...register("name", { required: true })}
                value={names}
                onChange={(e) => setNames(e.target.value)}
              />
              {errors.name && (
                <ErrorMessage>Please fill in your Name</ErrorMessage>
              )}

              <label htmlFor="user-email">E-mail</label>
              <input
                placeholder="E-mail"
                id="user-email"
                type="email"
                {...register("email", { required: true })}
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
              {errors.mail && (
                <ErrorMessage>Please fill in your Name</ErrorMessage>
              )}

              <label htmlFor="user-password">Password</label>
              <input
                placeholder="Password"
                id="user-password"
                type="password"
                {...register("user-password")}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
              {errors.password && (
                <ErrorMessage>Please fill in your Password</ErrorMessage>
              )}
            </div>
            <br />
            <legend>Where did you find out about us?</legend>
            <label htmlFor="review"></label>
            <textarea
              {...register("review", { maxLength: 100 })}
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
              disabled={
                !checkedTerms &&
                !passwordValue &&
                !names &&
                !mail &&
                !setNumberValue &&
                !setMessageValue
              }
              type="submit">
              Register
            </button>
          </fieldset>
        </form>
      </main>
    </>
  );
}

export default Contact;
