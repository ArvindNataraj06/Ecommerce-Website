import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginCard.css";
import axios from "../../axios";
import ContextProvider from "../../Context/ContextProvider";

const LoginCard = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState();

  function handleChange(e) {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const [{ user, isFetching }, dispatch] = useContext(ContextProvider);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setError(null);
    e.preventDefault();
    dispatch({
      type: "LOGIN_START",
      isFetching: true,
    });
    console.log("clicked");
    try {
      const res = await axios.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      if (res.data === "WRONG_PASSWORD") {
        dispatch({
          type: "LOGIN_START",
          isFetching: false,
        });
        return setError("WRONG_PASSWORD");
      }
      console.log(res);
      dispatch({
        type: "SET_USER",
        user: res.data,
        isFetching: false,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login__card__container">
      <div className="login__card">
        <div className="login__header">
          <h1>Login</h1>
        </div>
        <div className="login__inputs">
          <div className="email__input__container input__container">
            <label className="email__label input__label">Email</label>
            <input
              type="email"
              className="email__input login__input"
              placeholder="example@gmail.com"
              value={data.email}
              onChange={handleChange}
              name="email"
            />
          </div>
          <div className="password__input__container input__container">
            <label className="password__label input__label">Password</label>
            <input
              type="password"
              className="password__input login__input"
              placeholder="**********"
              value={data.password}
              onChange={handleChange}
              name="password"
            />
          </div>
          {error === "WRONG_PASSWORD" ? (
            <p style={{ color: "red", marginBottom: 0 }}>
              Invalid Email or Password
            </p>
          ) : null}
          <div className="login__button__container">
            <button
              onClick={handleSubmit}
              disabled={isFetching}
              className="login__button"
            >
              LOGIN
            </button>
          </div>
        </div>
        <div className="login__other__actions">
          <div className="login__forgot__password">Forgot password?</div>
          <div className="login__new__account">
            Don't have account?{" "}
            <Link to="/account/register">Create account</Link>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
