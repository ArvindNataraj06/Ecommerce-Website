import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterCard.css";
import axios from "../../axios";

const RegisterCard = () => {
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (e) => {
    setError(null);
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", {
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password,
      });
      if (res.data === "USEREXISTS") return setError("USEREXISTS");
      console.log(res);
      navigate("/account/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register__card__container">
      <div className="register__card">
        <div className="register__header">
          <h1>Create Account</h1>
        </div>
        <div className="register__inputs">
          <div className="fname__input__container reg__input__container">
            <label className="fname__label input__label">Name</label>
            <input
              name="name"
              value={data.name}
              onChange={handleChange}
              type="text"
              className="fname__input register__input"
            />
          </div>
          <div className="lname__input__container reg__input__container">
            <label className="lname__label input__label">Phone</label>
            <input
              name="phone"
              value={data.phone}
              onChange={handleChange}
              type="text"
              className="lname__input register__input"
            />
          </div>
          <div className="email__input__container reg__input__container">
            <label className="email__label input__label">Email</label>
            <input
              name="email"
              value={data.email}
              onChange={handleChange}
              type="email"
              className="email__input register__input"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="password__input__container reg__input__container">
            <label className="password__label input__label">Password</label>
            <input
              name="password"
              value={data.password}
              onChange={handleChange}
              type="password"
              className="password__input register__input"
            />
          </div>
          {error ? (
            <p style={{ color: "red" }}>Account already Exists</p>
          ) : null}
          <div className="register__button__container">
            <button className="register__button" onClick={handleSubmit}>
              Create Account
            </button>
          </div>
        </div>
        <div className="register__other__actions">
          <div className="register__login__account">
            Already have account? <Link to="/account/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
