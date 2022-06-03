import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import CheckBox from "../Custom/CheckBox";

function ProductFormComponent({
  setProductNameUz,
  setProductDescriptionUz,
  setProductNameEn,
  setProductDescriptionRu,
  setProductNameRu,
  setProductDescriptionEn,
  setImage,
  setPreparingTime,
  setOnSale,
  onSale,
}) {
  const { t } = useTranslation();

  return (
    <div className="product_create_flex">
      <div className="form-input">
        <p className="form-label">{t("product_name")} (fr)</p>
        <input
          className="form-control"
          type="text"
          onChange={(e) => setProductNameUz(e.target.value)}
          required
        />
      </div>
      <div className="form-input">
        <p className="form-label">{t("product_description")} (fr)</p>
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
        <p className="form-label">
          {t("preparing_time")} ({t("minute")})
        </p>
        <input
          className="form-control"
          type="number"
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
          onSale={onSale}
        />
      </div>
    </div>
  );
}

export default ProductFormComponent;
