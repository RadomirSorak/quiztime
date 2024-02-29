import "./Login.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";

//Log in functie bevat eigenlijk een simpele functie om je ingevoerde waardes op te slaan en door te voeren en na te checken.

function LogIn() {
    const [errorMessage, setErrorMessage] = React.useState("");
    const [names, setNames] = React.useState("");
    const [passwordValue, setPasswordValue] = React.useState("");
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm();
    const { login } = useContext(AuthContext);

    const history = useHistory();
    //Async function handleSubmit om ingevoerde data door te voeren naar de backend.

    async function handleSubmitForm() {
        try {
            const result = await axios.post(
                "https://frontend-educational-backend.herokuapp.com/api/auth/signin",
                {
                    username: names,
                    password: passwordValue,
                    favorite: "none",
                }
            );
            history.push("/quiz-settings");
            console.log(result.data);
            login(result.data.accessToken);
            console.log(login);
        } catch (e) {
            console.log(e.code);
            if (e.code === "ERR_BAD_REQUEST") {
                setErrorMessage("Username or Password is incorrect");
            }
        }
    }

    return (
        <>
            <div className="form-setting">
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <fieldset className="fieldset">
                        <legend>Log In</legend>
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
                                <ErrorMessage>Please fill in your Username</ErrorMessage>
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
                        <button
                            className="register-btn"
                            disabled={!passwordValue && !names}
                            type="submit">
                            Log In
                        </button>
                        <p>{errorMessage}</p>
                    </fieldset>
                </form>
            </div>
        </>
    );
}
export default LogIn;
