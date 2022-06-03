import "./header.css";
import { useEffect, useState } from "react";
import Ripples from "react-ripples";
import { RiMenu2Line, RiShutDownLine } from "react-icons/ri";
import UserHeader from "../../assets/images/users/avatar-2.jpg";
import { MdOutlineExpandMore } from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";
import LanguageComponents from "../LanguageComponents";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";

function HeaderComponent({ setInactive, inactive }) {
  const location = useLocation();
  const [dropdown, setDropdown] = useState(false);
  const [cookies] = useCookies(["username"]);

  const { logoutUser } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    setDropdown(false);
  }, [location.pathname]);

  return (
    <div className="header">
      <Ripples>
        <button
          onClick={() => setInactive(!inactive)}
          type="button"
          className="toggle-sidebar-btn"
        >
          <RiMenu2Line className="fa fa-menu-line" />
        </button>
      </Ripples>

      <div className="flex-end" style={{ display: "flex" }}>
        <LanguageComponents />
        <div className="profile-header">
          <Ripples>
            <button onClick={() => setDropdown(!dropdown)}>
              <img src={UserHeader} alt="user" />
              <span>{cookies?.username}</span>
              <MdOutlineExpandMore />
            </button>
          </Ripples>
          {dropdown ? (
            <div className="profile-items">
              <div className="profile-item" onClick={logoutUser}>
                <RiShutDownLine style={{ marginRight: "5px" }} /> {t("logout")}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
