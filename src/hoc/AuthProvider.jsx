import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { URLBASE } from "../constants/applicationConstants";
import useCustomFetcher from "../hooks/useCustomFetcher";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLogin") == null ? false : true
  );

  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["tokens"]);

  const [error, isLoading, fetch] = useCustomFetcher();

  const navigate = useNavigate();
  const location = useLocation();

  const signIn = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: e.target.username.value,
        password: e.target.password.value,
      }),
    };

    fetch(
      (response) => {
        if (response?.error) {
          alert(response.error);
          e.target.username.value = null;
          e.target.password.value = null;
        } else {
          setCookie("tokens", JSON.stringify(response), { path: "/" });
          setCookie("username", response.first_name, { path: "/" });

          navigate(location.state?.from?.pathname || "/", { replace: true });
          setIsLoggedIn(true);
          localStorage.setItem("isLogin", true);
        }
      },
      `${URLBASE}/login/manager/`,
      requestOptions
    );
  };

  const logoutUser = () => {
    removeCookie("tokens", { path: "/" });
    localStorage.removeItem("isLogin");
    setIsLoggedIn(false);
    navigate("/login", { replace: true });
  };

  const refreshToken = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: cookies?.tokens?.refresh,
      }),
    };

    if (cookies?.tokens) {
      fetch(
        (response) => {
          if (response?.detail != "Token is invalid or expired") {
            // save new token
            const newToken = Object.assign(response, {
              refresh: cookies?.tokens?.refresh,
            });

            setCookie("tokens", newToken, { path: "/" });

            // permission route
            localStorage.setItem("isLogin", true);

            // refresh token worked
            setLoading(false);
          } else {
            logoutUser();
          }
        },
        `${URLBASE}/token/refresh/`,
        requestOptions
      );
    } else {
      setLoading(false);
      logoutUser();
    }
  };

  useEffect(() => {
    if (loading) {
      refreshToken();
    }

    let Minutes = 1000 * 60 * 10;

    let interval = setInterval(() => {
      if (cookies) {
        refreshToken();
      }
    }, Minutes);
    return () => clearInterval(interval);
  }, [cookies, loading]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        setIsLoggedIn,
        isLoggedIn,
        logoutUser,
        refreshToken,
        error,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
