import "../assets/styles/login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo-dark.png";
import backgroundLogin from "../assets/images/authentication-bg.jpg";
import Ripples from "react-ripples";
import { RiUser2Line, RiLock2Line } from "react-icons/ri";
import { MdLock } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";

function ResetPage() {
  const { setIsLoggedIn, signIn } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const authrolithation = () => {
    navigate(location.state?.from?.pathname || "/", { replace: true });
    setIsLoggedIn(true);
    localStorage.setItem("isLogin", true);
  };

  return (
    <div className="login">
      <div className="login-left">
        <img src={Logo} alt="" />
        <div className="login-text">
          <h4>Welcome Back !</h4>
          <p>Sign in to continue to Nazox.</p>
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

            <Link className="forgot-password" to="/">
              <MdLock className="mdlock" /> Forgot your password?
            </Link>
          </div>
        </form>
        <Ripples>
          <button
            className="btn btn-primary w-md waves-effect waves-light"
            onClick={() => authrolithation()}
          >
            123
          </button>
        </Ripples>
      </div>
      <div
        className="login-right"
        style={{ backgroundImage: `url(${backgroundLogin})` }}
      ></div>
    </div>
  );
}

export default ResetPage;
