import { useEffect, useState } from "react";
import "../assets/styles/restaurants.css";
import DefaultImage from "../assets/images/defaultimage.jpg";
import useCustomFetcher from "../hooks/useCustomFetcher";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import Loader from "../components/Custom/Loader";
import { URLBASE } from "../constants/applicationConstants";

function RestourantPage() {
  const [restaurant, setRestaurant] = useState([]);
  const { t } = useTranslation();
  const [cookies] = useCookies(["tokens"]);

  const [error, isLoding, fetcher] = useCustomFetcher();

  const getRestaurant = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
    };

    fetcher(
      (response) => {
        setRestaurant(response);
      },
      `${URLBASE}/restaurant/detail`,
      requestOptions
    );
  };

  useEffect(() => {
    getRestaurant();
  }, []);

  if (isLoding) return <Loader />;

  if (error == "401") return <h1>Unauthorized</h1>;
  if (error == "500") return <h1>Server error</h1>;

  return (
    <div className="restaurant">
      <div className="restaurant-flex">
        <div className="restaurant-left">
          <img
            src={
              restaurant.image
                ? `http://159.223.28.79${restaurant.image}`
                : DefaultImage
            }
            alt="restourant image"
          />
        </div>
        <div className="restaurant-right">
          <h4>
            {t("restaurant")}:<span> {restaurant.name}</span>
          </h4>
          <h4>
            {t("owner")}:<span> {restaurant.owner}</span>
          </h4>
          <h4>
            {t("total_amount")}
            <span> ${restaurant.total_amount}</span>
          </h4>
          <h4>
            {t("online_amount")}
            <span> ${restaurant.online_amount}</span>
          </h4>
        </div>
      </div>
      <div className="restaurant-table">
        <table>
          <tbody>
            <tr key="1" className="tr">
              <td className="td">{t("manager")}</td>
              <td>{restaurant.managers}</td>
            </tr>
            <tr key="2" className="tr">
              <td className="td">{t("menus")}</td>
              <td>{restaurant.menus}</td>
            </tr>
            <tr key="3" className="tr">
              <td className="td">{t("succes_delivered_orders")}</td>
              <td>{restaurant.succes_delivered_orders}</td>
            </tr>
            <tr key="4" className="tr">
              <td className="td">{t("description")}</td>
              <td>{restaurant.description}</td>
            </tr>
            <tr key="5" className="tr">
              <td className="td">{t("start_work_time")}</td>
              <td>
                {restaurant.start_work_time ? restaurant.start_work_time : 0}
              </td>
            </tr>
            <tr key="6" className="tr">
              <td className="td">{t("end_work_time")}</td>
              <td>{restaurant.end_work_time ? restaurant.end_work_time : 0}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RestourantPage;
