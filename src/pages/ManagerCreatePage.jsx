import { useState } from "react";
import { useCookies } from "react-cookie";
import "../assets/styles/manager.css";
import CustomSmpButton from "../components/Custom/CustomSmpBtn";
import useCustomFetcher from "../hooks/useCustomFetcher";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { URLBASE } from "../constants/applicationConstants";
import CustomPopup from "../components/Custom/CustomPopup";

function ManagerCreatePage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const [cookies] = useCookies(["tokens"]);
  const { t } = useTranslation();

  const [error, isLoading, fetcher] = useCustomFetcher();

  const createFilial = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("username", userName);
    formData.append("password", password);
    formData.append("first_name", name);
    formData.append("last_name", lastName);
    formData.append("phone_number", phone);
    formData.append("profile_image", image);

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
      body: formData,
    };

    fetcher(
      () => {
        error == 400
          ? alert(t("eror400"))
          : navigate("/manager/page/1", { replace: true });
      },
      `${URLBASE}/manager/`,
      requestOptions
    );
  };

  return (
    <>
      {error != 403 ? (
        <div style={{ padding: "20px" }}>
          <h1>{t("create_manager")}</h1>
          <form onSubmit={createFilial}>
            <div className="manager-flex">
              <div className="form-input">
                <p className="form-label">{t("username")}</p>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="form-input">
                <p className="form-label">{t("password")}</p>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-input">
                <p className="form-label">{t("first_name")}</p>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-input">
                <p className="form-label">{t("last_name")}</p>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="form-input">
                <p className="form-label">{t("phone")}</p>
                <input
                  className="form-control"
                  type="tel"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="form-input">
                <p className="form-label">{t("image")}</p>
                <input
                  className="form-control"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
              </div>
            </div>

            <div className="manager-flex flex-end">
              <CustomSmpButton
                type={"button"}
                text={t("cancel")}
                background={`#fff`}
                color={`#5664d2`}
                border={`1px solid #5664d2`}
                padding={`0.5rem 1.25rem`}
                fontWeight={`500`}
                lineHeight={`1.5`}
                textAlign={`center`}
                borderRadius={`4px`}
                func={() => navigate(-1)}
              />

              <CustomSmpButton
                type={"submit"}
                text={t("create")}
                color={`#fff`}
                background={`#5664d2`}
                border={`1px solid #5664d2`}
                padding={`0.5rem 1.25rem`}
                fontWeight={`500`}
                lineHeight={`1.5`}
                textAlign={`center`}
                borderRadius={`4px`}
                margin={"0 0 0 10px"}
              />
            </div>
          </form>
        </div>
      ) : (
        <CustomPopup showBtn={false} />
      )}
    </>
  );
}

export default ManagerCreatePage;
