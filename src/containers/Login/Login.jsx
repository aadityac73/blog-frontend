import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import api from "../../main-app/http/api";
import styles from './Login.module.css'

const Login = () => {
  const [state, setState] = useState({ username: "", password: "" });
  const { setUser } = useAuth();

  const handleUsernameChange = (e) => {
    setState((prev) => ({ ...prev, username: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setState((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleFormSubmit = () => async (e) => {
    e.preventDefault();
    const body = {
      username: state.username,
      password: state.password,
    };
    const res = await api.login({ body });
    const { token, ...rest } = res.getValue();
    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify({ ...rest }));
    setState({ username: "", password: "" });
    setUser({ ...rest });
  };
  return (
    <div className={`container ${styles.formContainer}`}>
      <div className={styles.card}>
        <h2 className={styles.h2}>Sign In</h2>
        <div className={styles.form}>
          <form onSubmit={handleFormSubmit()}>
            <div className={styles.formControl}>
              <label className={styles.label} htmlFor="username">
                Username
              </label>
              <input
                required
                className={styles.input}
                type="text"
                value={state.username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className={styles.formControl}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <input
                required
                className={styles.input}
                type="password"
                value={state.password}
                onChange={handlePasswordChange}
              />
            </div>
            <button className={styles.button} type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
