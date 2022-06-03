import { useEffect, useState } from "react";
import "../assets/styles/restaurants.css";
import { useTranslation } from "react-i18next";
import DefaultImage from "../assets/images/defaultimage.jpg";
import useCustomFetcher from "../hooks/useCustomFetcher";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
import { URLBASE } from "../constants/applicationConstants";

function ProductPage() {
  const [restaurant, setRestaurant] = useState([]);
  const { t } = useTranslation();
  const { id } = useParams();

  const [error, isLoading, fetcher] = useCustomFetcher();
  const [cookies] = useCookies(["tokens"]);

  const getProduct = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
    };
    fetcher(
      (response) => {
        setRestaurant(response);
      },
      `${URLBASE}/product/${id}/?lan_code=${t("language")}`,
      requestOptions
    );
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <div className="restaurant">
      <div className="restaurant-flex">
        <div className="restaurant-left">
          <img
            src={restaurant?.image ? restaurant?.image : DefaultImage}
            alt=""
          />
        </div>
        <div className="restaurant-right">
          <h4>
            Name:
            <span> {restaurant?.translations?.en?.product_name}</span>
          </h4>
          <h4>
            Description:
            <span> {restaurant?.translations?.en?.product_description}</span>
          </h4>
          <h4>
            Price
            <span> ${restaurant.default_price}</span>
          </h4>
          <h4>
            Preparing Time (Minute):
            <span> {restaurant.preparing_time}</span>
          </h4>
        </div>
      </div>
      <div className="restaurant-table">
        <table>
          <tbody>
            <tr className="tr">
              <td className="td">{t("filials")}</td>
              <td>
                {restaurant?.filials?.map((res, index) => {
                  return (
                    <Link
                      style={{ marginRight: "10px" }}
                      key={index}
                      to={`/filials/detail/${res.id}`}
                    >
                      {res.name}
                    </Link>
                  );
                })}
              </td>
            </tr>
            <tr className="tr">
              <td className="td">{t("on_sale")}</td>
              <td>{restaurant?.on_sale ? "access" : "not access"}</td>
            </tr>
            <tr className="tr">
              <td className="td">Name (en)</td>
              <td>{restaurant?.translations?.en?.product_name}</td>
            </tr>
            <tr className="tr">
              <td className="td">Description (ru)</td>
              <td>{restaurant?.translations?.ru?.product_description}</td>
            </tr>
            <tr className="tr">
              <td className="td">Name (ru)</td>
              <td>{restaurant?.translations?.ru?.product_name}</td>
            </tr>
            <tr className="tr">
              <td className="td">Description (en)</td>
              <td>{restaurant?.translations?.en?.product_description}</td>
            </tr>
            <tr className="tr">
              <td className="td">Name (fr)</td>
              <td>{restaurant?.translations?.uz?.product_name}</td>
            </tr>
            <tr className="tr">
              <td className="td">Description (fr)</td>
              <td>{restaurant?.translations?.uz?.product_description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductPage;
