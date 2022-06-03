import { useState } from "react";
import { useCookies } from "react-cookie";
import "../assets/styles/category.css";
import CustomSmpButton from "../components/Custom/CustomSmpBtn";
import useCustomFetcher from "../hooks/useCustomFetcher";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomPopup from "../components/Custom/CustomPopup";
import { URLBASE } from "../constants/applicationConstants";

function CategoryCreatePage() {
  const [uzText, setUzText] = useState("");
  const [enText, setEnText] = useState("");
  const [ruText, setRuText] = useState("");

  const navigate = useNavigate();
  const [cookies] = useCookies(["tokens"]);
  const { t } = useTranslation();

  const [error, loading, fetcher] = useCustomFetcher();

  const createFilial = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
      body: JSON.stringify({
        translations: {
          uz: { name: uzText },
          en: { name: enText },
          ru: { name: ruText },
        },
      }),
    };

    fetcher(() => {}, `${URLBASE}/category/process/`, requestOptions);
  };

  if (error == 200) {
    navigate("/category/page/1", { replace: true });
  }

  return (
    <>
      {error != 403 ? (
        <div style={{ padding: "20px" }}>
          <h1>{t("create_category")}</h1>
          <form onSubmit={createFilial}>
            <div className="category-flex">
              <div className="form-input">
                <p className="form-label">FR</p>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setUzText(e.target.value)}
                  required
                />
              </div>
              <div className="form-input">
                <p className="form-label">ENG</p>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setEnText(e.target.value)}
                  required
                />
              </div>
              <div className="form-input">
                <p className="form-label">RUS</p>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setRuText(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="category-flex flex-end">
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
        <CustomPopup showBtn={true} url={"/category/page/1"} />
      )}
    </>
  );
}

export default CategoryCreatePage;
