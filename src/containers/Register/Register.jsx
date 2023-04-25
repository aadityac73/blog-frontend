import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import api from "../../main-app/http/api";
import styles from './Register.module.css'

const Register = () => {
  const defaultState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
  };
  const [state, setState] = useState(defaultState);
  const [redirect, setRedirect] = useState(false);
  const location = useLocation();
  const handleChange = (key) => (e) => {
    setState((prev) => ({ ...prev, [key]: e.target.value }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await api.register({ body: state });
    if (!res.isError) {
      setState(defaultState);
      setRedirect(true);
    }
  };
  return (
    <div className={`container ${styles.formContainer}`}>
      {redirect && (
        <Navigate to="/sign-in" state={{ from: location }} replace />
      )}
      <div className={styles.card}>
        <h2 className={styles.h2}>Sign In</h2>
        <div className={styles.form}>
          <form onSubmit={handleFormSubmit}>
            <div className={styles.formControl}>
              <label className={styles.label} htmlFor="firstName">
                First Name
              </label>
              <input
                required
                className={styles.input}
                type="text"
                value={state.firstName}
                onChange={handleChange("firstName")}
              />
            </div>
            <div className={styles.formControl}>
              <label className={styles.label} htmlFor="lastName">
                Last Name
              </label>
              <input
                required
                className={styles.input}
                type="text"
                value={state.lastName}
                onChange={handleChange("lastName")}
              />
            </div>
            <div className={styles.formControl}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                required
                className={styles.input}
                type="text"
                value={state.email}
                onChange={handleChange("email")}
              />
            </div>
            <div className={styles.formControl}>
              <label className={styles.label} htmlFor="mobileNumber">
                Mobile Number
              </label>
              <input
                required
                className={styles.input}
                type="text"
                value={state.mobileNumber}
                onChange={handleChange("mobileNumber")}
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
                onChange={handleChange("password")}
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

export default Register;
