import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "../assets/styles/product.css";
import CustomSmpButton from "../components/Custom/CustomSmpBtn";
import useCustomFetcher from "../hooks/useCustomFetcher";
import { useNavigate, useParams } from "react-router-dom";
import CheckBox from "../components/Custom/CheckBox";
import { useTranslation } from "react-i18next";
import CustomPopup from "../components/Custom/CustomPopup";
import { URLBASE } from "../constants/applicationConstants";

function ProductCreatePage() {
  const [productNameUz, setProductNameUz] = useState("");
  const [productDescriptionUz, setProductDescriptionUz] = useState("");
  const [productNameRu, setProductNameRu] = useState("");
  const [productDescriptionRu, setProductDescriptionRu] = useState("");
  const [productNameEn, setProductNameEn] = useState("");
  const [productDescriptionEn, setProductDescriptionEn] = useState("");
  const [preparingTime, setPreparingTime] = useState("");
  const [defaultPrice, setDefaultPrice] = useState("");

  const [onSale, setOnSale] = useState(false);

  const [image, setImage] = useState(null);

  const [filials, setFilials] = useState([]);
  const [productFilials, setProductFilials] = useState([]);

  const navigate = useNavigate();
  const [cookies] = useCookies(["tokens"]);
  const { idcategory } = useParams();
  const { t } = useTranslation();

  const [error, isLoading, fetcher] = useCustomFetcher();

  const addFilialId = (id) => {
    setProductFilials([...productFilials, id]);
  };

  const getFilials = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
    };

    fetcher(
      (response) => {
        setFilials(response);
      },
      `${URLBASE}/filials/`,
      requestOptions
    );
  };

  const uploadImage = (id) => {
    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("image", image);

    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
      body: formData,
    };

    fetcher(
      () => {
        navigate(`/product/${idcategory}/page/1`, { replace: true });
      },
      `${URLBASE}/product-image`,
      requestOptions
    );
  };

  const createProduct = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
      body: JSON.stringify({
        category: idcategory,
        default_price: defaultPrice,
        on_sale: onSale,
        filials: productFilials,
        translations: {
          uz: {
            product_name: productNameUz,
            product_description: productDescriptionUz,
          },
          en: {
            product_name: productNameEn,
            product_description: productDescriptionEn,
          },
          ru: {
            product_name: productNameRu,
            product_description: productDescriptionRu,
          },
        },
        preparing_time: preparingTime,
      }),
    };

    fetcher(
      (response) => {
        if (
          response.detail !=
          "У вас недостаточно прав для выполнения данного действия."
        ) {
          uploadImage(response.id);
        }
      },
      `${URLBASE}/product/`,
      requestOptions
    );
  };

  useEffect(() => {
    getFilials();
  }, []);

  return (
    <>
      {error != 403 ? (
        <div style={{ padding: "20px" }}>
          <h1>{t("create_product")}</h1>
          <form onSubmit={createProduct}>
            <div className="product_create_flex">
              <div className="form-input">
                <p className="form-label">{t("product_name")} (Uz)</p>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setProductNameUz(e.target.value)}
                  required
                />
              </div>
              <div className="form-input">
                <p className="form-label">{t("product_description")} (uz)</p>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setProductDescriptionUz(e.target.value)}
                  required
                />
              </div>

              <div className="form-input">
                <p className="form-label">{t("product_name")} (Ru)</p>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setProductNameRu(e.target.value)}
                  required
                />
              </div>
              <div className="form-input">
                <p className="form-label">{t("product_description")} (Ru)</p>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setProductDescriptionRu(e.target.value)}
                  required
                />
              </div>
              <div className="form-input">
                <p className="form-label">{t("product_name")} (En)</p>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setProductNameEn(e.target.value)}
                  required
                />
              </div>
              <div className="form-input">
                <p className="form-label">{t("product_description")} (En)</p>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setProductDescriptionEn(e.target.value)}
                  required
                />
              </div>

              <div className="form-input">
                <p className="form-label">{t("default_price")}</p>
                <input
                  className="form-control"
                  type="number"
                  onChange={(e) => setDefaultPrice(e.target.value)}
                  value={defaultPrice}
                />
              </div>

              <div className="form-input">
                <p className="form-label">
                  {t("preparing_time")} ({t("minute")})
                </p>
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  onChange={(e) => setPreparingTime(e.target.value)}
                  required
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
              <div style={{ marginTop: "25px" }}>
                <CheckBox
                  label={t("on_sale")}
                  id={!onSale}
                  className={"product_checkbox"}
                  onChange={setOnSale}
                />
              </div>
            </div>
            <div className="product-box">
              <h5>{t("filials")}</h5>
              <div className="product_create_flex">
                {filials.map((filial, index) => {
                  return (
                    <CheckBox
                      key={index}
                      label={filial.name}
                      id={filial.id}
                      className={"product_checkbox"}
                      onChange={addFilialId}
                    />
                  );
                })}
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
        <CustomPopup showBtn={true} url={`/product/${idcategory}/page/1`} />
      )}
    </>
  );
}

export default ProductCreatePage;
