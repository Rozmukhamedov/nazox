import "../assets/styles/login.css";
import { Link, Navigate } from "react-router-dom";
import Logo from "../assets/images/logoRestaurant.png";
import backgroundLogin from "../assets/images/authentication-bg.jpg";
import Ripples from "react-ripples";
import { RiUser2Line, RiLock2Line } from "react-icons/ri";
import { MdLock } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";

function LoginPage() {
  const { signIn, error } = useAuth();
  if (error == 500) {
    return <Navigate to="/sever-error" replace />;
  }
  return (
    <div className="login">
      <div className="login-left">
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={Logo} alt="logo" />
            <p className="logoText">Moveme Admin</p>
          </div>

          <div className="login-text">
            <h4>Welcome Back !</h4>
          </div>
        </div>

        <form onSubmit={signIn}>
          <div className="auth-form-group-custom">
            <RiUser2Line className="auti-custom-input-icon" />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Enter username"
            />
          </div>
          <div className="auth-form-group-custom">
            <RiLock2Line className="auti-custom-input-icon" />
            <label htmlFor="username">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter password"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Ripples>
              <button
                className="btn btn-primary w-md waves-effect waves-light"
                type="submit"
              >
                Log In
              </button>
            </Ripples>
            {/* 
            <Link className="forgot-password" to="/">
              <MdLock className="mdlock" /> Forgot your password?
            </Link> */}
          </div>
        </form>
      </div>
      <div
        className="login-right"
        style={{ backgroundImage: `url(${backgroundLogin})` }}
      ></div>
    </div>
  );
}

export default LoginPage;
