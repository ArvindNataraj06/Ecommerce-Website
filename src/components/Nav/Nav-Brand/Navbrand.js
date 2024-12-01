import "./NavBrand.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import ContextProvider from "../../Context/ContextProvider";

const NavBrand = () => {
  const [{ user }] = useContext(ContextProvider);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div href="#home" className="navbrand__container">
        <h1 className="navbrand">
          <Link to="/" style={{ fontSize: 32, paddingTop: 10 }}>
            Shop
          </Link>
        </h1>
      </div>
      <p>Hello {user ? user.name : "user"}</p>
    </div>
  );
};

export default NavBrand;
