import { useState } from "react";
import "./popup.css";
import { ImInfo, ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import CustomSmpButton from "./CustomSmpBtn";
import { useTranslation } from "react-i18next";

const CustomPopup = ({ showBtn, url }) => {
  const [isPopup, setIsPopup] = useState(true);
  const { t } = useTranslation();

  return (
    <div>
      {isPopup ? (
        <div className="popup">
          <div className="popup_top">
            <ImInfo />
            <div className="popup_close">
              {showBtn ? (
                <Link to={url}>
                  <ImCross />
                </Link>
              ) : null}
            </div>
          </div>
          <div className="popup_bottom">
            <h1>Ooops!</h1>
            <p>You do not have access</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default CustomPopup;
