import { useState } from "react";
import { useTranslation } from "react-i18next";
import ru from "../assets/images/flags/russia.jpg";
import en from "../assets/images/flags/us.jpg";
import fr from "../assets/images/flags/french.jpg";

function LanguageComponents() {
  const [isActive, setIsActive] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div
      style={{
        position: "relative",
        margin: "6px 10px 0 0",
      }}
    >
      <div onClick={(e) => setIsActive(!isActive)}>
        {t("language") == "ru" ? (
          <img
            src={ru}
            alt="ru"
            style={{
              width: "40px",
              height: "30px",
              borderRadius: "0",
              marginTop: "9px",
            }}
          />
        ) : t("language") == "en" ? (
          <img
            src={en}
            alt={t("en")}
            style={{
              width: "40px",
              height: "30px",
              borderRadius: "0",
              marginTop: "9px",
            }}
          />
        ) : (
          <img
            src={fr}
            alt="fr"
            style={{
              width: "40px",
              height: "30px",
              borderRadius: "0",
              marginTop: "9px",
            }}
          />
        )}
      </div>

      {isActive && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "-24%",
            background: "#fff",
            borderRadius: "5px",
            fontWeight: "500",
            color: "#333",
            zIndex: "3",
            padding: "0 10px",
          }}
        >
          {t("language") != "en" ? (
            <div
              style={{
                transition: "all 0.2s",
                background: "#fff",
              }}
              onClick={() => changeLanguage("en")}
            >
              <img
                src={en}
                alt={"en"}
                style={{
                  width: "40px",
                  height: "30px",
                  borderRadius: "0",
                }}
              />
            </div>
          ) : (
            <></>
          )}
          {t("language") != "ru" ? (
            <div
              style={{
                transition: "all 0.2s",
                background: "#fff",
              }}
              onClick={() => changeLanguage("ru")}
            >
              <img
                src={ru}
                alt={"ru"}
                style={{
                  width: "40px",
                  height: "30px",
                  borderRadius: "0",
                }}
              />
            </div>
          ) : (
            <></>
          )}
          {t("language") != "fr" ? (
            <div
              style={{
                transition: "all 0.2s",
                background: "#fff",
              }}
              onClick={() => changeLanguage("uz")}
            >
              <img
                src={fr}
                alt={"fr"}
                style={{
                  width: "40px",
                  height: "30px",
                  borderRadius: "0",
                }}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}

export default LanguageComponents;
