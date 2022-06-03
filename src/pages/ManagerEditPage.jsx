import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "../assets/styles/manager.css";
import CustomSmpButton from "../components/Custom/CustomSmpBtn";
import useCustomFetcher from "../hooks/useCustomFetcher";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { URLBASE } from "../constants/applicationConstants";
import CustomPopup from "../components/Custom/CustomPopup";

function ManagerEditPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const [cookies] = useCookies(["tokens"]);
  const { id } = useParams();
  const { t } = useTranslation();

  const [error, isLoading, fetcher] = useCustomFetcher();

  const editManager = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("username", userName);
    formData.append("password", password);
    formData.append("first_name", name);
    formData.append("last_name", lastName);
    formData.append("phone_number", phone);
    formData.append("profile_image", image);

    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
      body: formData,
    };

    fetcher(
      () => {
        navigate("/manager/page/1", { replace: true });
      },
      `${URLBASE}/manager/${id}/`,
      requestOptions
    );
  };

  const getManager = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
    };

    fetcher(
      (response) => {
        setName(response.first_name);
        setLastName(response.last_name);
        setPassword(response.password);
        setPhone(response.phone_number);
        setUserName(response.username);
      },
      `${URLBASE}/manager/${id}`,
      requestOptions
    );
  };

  useEffect(() => {
    getManager();
  }, [id]);

  return (
    <>
      {error != 403 ? (
        <div style={{ padding: "20px" }}>
          <h1>
            {t("edit_manager")} {id}
          </h1>
          <form onSubmit={editManager}>
            <div className="manager-flex">
              <div className="form-input">
                <p className="form-label">{t("username")}</p>
                <input
                  value={userName}
                  className="form-control"
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="form-input">
                <p className="form-label">{t("password")}</p>
                <input
                  className="form-control"
                  value={password}
                  type="text"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-input">
                <p className="form-label">{t("first_name")}</p>
                <input
                  value={name}
                  className="form-control"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-input">
                <p className="form-label">{t("last_name")}</p>
                <input
                  value={lastName}
                  className="form-control"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-input">
                <p className="form-label">{t("phone")}</p>
                <input
                  className="form-control"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-input">
                <p className="form-label">{t("image")}</p>
                <input
                  className="form-control"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
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
                text={t("edit")}
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

export default ManagerEditPage;
