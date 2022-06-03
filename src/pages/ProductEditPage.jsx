import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "../assets/styles/product.css";
import CustomSmpButton from "../components/Custom/CustomSmpBtn";
import useCustomFetcher from "../hooks/useCustomFetcher";
import { useNavigate, useParams } from "react-router-dom";
import CheckBox from "../components/Custom/CheckBox";
import { useTranslation } from "react-i18next";
import CustomPopup from "../components/Custom/CustomPopup";
import { URLBASE } from "../constants/applicationConstants";

function ProductEditPage() {
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
  const { id } = useParams();
  const { t } = useTranslation();

  const [error, isLoading, fetcher] = useCustomFetcher();

  const addFilialId = (id) => {
    setProductFilials([...productFilials, id]);
  };

  const func = (index) => {
    console.log(index);
  };

  const getProduct = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
    };

    fetcher(
      (response) => {
        setPreparingTime(response.preparing_time);
        setOnSale(response.on_sale);
        setProductNameUz(response.translations.uz.product_name);
        setProductDescriptionUz(response.translations.uz.product_description);
        setProductNameRu(response.translations.ru.product_name);
        setProductDescriptionRu(response.translations.ru.product_description);
        setProductNameEn(response.translations.en.product_name);
        setProductDescriptionEn(response.translations.en.product_description);
        setProductFilials(response.filials);
        setImage(response.image);
        setDefaultPrice(response.default_price);
      },
      `${URLBASE}/product/${id}/?lan_code=${t("language")}`,
      requestOptions
    );
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

  const uploadImage = (index) => {
    const formData = new FormData();
    formData.append("product_id", index);
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
        navigate(`/product/detail/${id}/`, { replace: true });
      },
      `${URLBASE}/product-image/`,
      requestOptions
    );
  };

  const editProduct = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
      body: JSON.stringify({
        category: 1,
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
      `${URLBASE}/product/${id}/`,
      requestOptions
    );
  };

  useEffect(() => {
    getProduct();
    getFilials();
  }, [id]);

  return (
    <>
      {error != 403 ? (
        <div style={{ padding: "20px" }}>
          <h1>{t("edit_product")}</h1>{" "}
          <form onSubmit={editProduct}>
            <div className="product_create_flex">
              <div className="form-input">
                <p className="form-label">{t("product_name")} (fr)</p>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setProductNameUz(e.target.value)}
                  value={productNameUz}
                />
              </div>
              <div className="form-input">
                <p className="form-label">{t("product_description")} (fr)</p>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setProductDescriptionUz(e.target.value)}
                  value={productDescriptionUz}
                />
              </div>

              <div className="form-input">
                <p className="form-label">{t("product_name")} (Ru)</p>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setProductNameRu(e.target.value)}
                  value={productNameRu}
                />
              </div>
              <div className="form-input">
                <p className="form-label">{t("product_description")} (Ru)</p>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setProductDescriptionRu(e.target.value)}
                  value={productDescriptionRu}
                />
              </div>
              <div className="form-input">
                <p className="form-label">{t("product_name")} (En)</p>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setProductNameEn(e.target.value)}
                  value={productNameEn}
                />
              </div>
              <div className="form-input">
                <p className="form-label">{t("product_description")} (En)</p>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setProductDescriptionEn(e.target.value)}
                  value={productDescriptionEn}
                />
              </div>

              <div className="form-input">
                <p className="form-label">
                  {t("preparing_time")} ({t("minute")})
                </p>
                <input
                  className="form-control"
                  type="number"
                  onChange={(e) => setPreparingTime(e.target.value)}
                  value={preparingTime}
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
                  setOnSale={setOnSale}
                  onSale={onSale}
                  onChange={func}
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
        <CustomPopup showBtn={true} url={"/category/page/1"} />
      )}
    </>
  );
}

export default ProductEditPage;
