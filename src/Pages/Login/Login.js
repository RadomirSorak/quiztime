import "./Login.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";

// Log in functie bevat eigenlijk een simpele functie om je ingevoerde waardes op te slaan en door te voeren en na te checken.

function LogIn({ name, setName, passwordValue, setPasswordValue }) {
    const [errorMessage, setErrorMessage] = React.useState("");
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm();
    const { login } = useContext(AuthContext);

    const history = useHistory();
    // Async function handleSubmit om ingevoerde data door te voeren naar de backend.

    async function handleSubmitForm() {
        try {
            const result = await axios.post(
                "https://frontend-educational-backend.herokuapp.com/api/auth/signin",
                {
                    username: name,
                    password: passwordValue,
                    favorite: "none",
                }
            );
            history.push("/quiz-settings");
            login(result.data.accessToken);
        } catch (e) {
            if (e.code === "ERR_BAD_REQUEST") {
                setErrorMessage("Username or Password is incorrect");
            }
        }
    }

    return (
        <main className="form-setting">
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <fieldset className="fieldset">
                    <legend>Log In</legend>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            placeholder="Username"
                            id="username"
                            type="text"
                            {...register("name", { required: true })}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && (
                            <ErrorMessage>Please fill in your Username</ErrorMessage>
                        )}

                        <label htmlFor="user-password">Password</label>
                        <input
                            placeholder="Password"
                            id="user-password"
                            type="password"
                            {...register("password", { required: true })}
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                        />
                        {errors.password && (
                            <ErrorMessage>Please fill in your Password</ErrorMessage>
                        )}
                    </div>
                    <button
                        className="register-btn"
                        disabled={!passwordValue || !name}
                        type="submit"
                    >
                        Log In
                    </button>
                    <p>{errorMessage}</p>
                </fieldset>
            </form>
        </main>
    );
}

export default LogIn;
