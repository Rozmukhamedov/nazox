import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/styles/order.css";
import CustomSmpButton from "../components/Custom/CustomSmpBtn";
import OrderTableComponent from "../components/OrderTableComponent";
import { URLBASE } from "../constants/applicationConstants";
import useCustomFetcher from "../hooks/useCustomFetcher";

function OrdersPage() {
  const [order, setOrder] = useState([]);
  const { id, title } = useParams();
  const [cookies] = useCookies(["tokens"]);
  const [error, isLoading, fetcher] = useCustomFetcher();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
    };

    fetcher(
      (response) => {
        setOrder(response);
      },

      `${URLBASE}/restaurant/order/detail/${id}/?lan_code=${t("language")}`,
      requestOptions
    );
  }, [id, t]);

  const changeOrderRequested = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
    };

    fetcher(
      () => {
        navigate("/order/in_process/page/1", { replace: true });
      },

      `${URLBASE}/restaurant/order/detail/${id}/accept_order/`,
      requestOptions
    );
  };

  const changeOrderInProgress = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
    };

    fetcher(
      () => {
        navigate("/order/ready_for_shipment/page/1", { replace: true });
      },

      `${URLBASE}/restaurant/order/detail/${id}/ready_to_shipment/`,
      requestOptions
    );
  };

  if (isLoading) {
    <div>Loading ...</div>;
  }

  if (error == 500) return navigate("/");

  return (
    <div style={{ padding: "20px" }}>
      <div className="aside-flex">
        <h4>{t("order_detail")}</h4>
        {title == "requested" ? (
          <CustomSmpButton
            color={`#fff`}
            background={`#5664d2`}
            border={`1px solid #5664d2`}
            padding={`0.5rem 1rem`}
            fontWeight={`500`}
            lineHeight={`1.5`}
            text={`Accept`}
            textAlign={`center`}
            borderRadius={`4px`}
            func={() => changeOrderRequested()}
          />
        ) : null}
        {title == "in_process" ? (
          <CustomSmpButton
            color={`#fff`}
            background={`#5664d2`}
            border={`1px solid #5664d2`}
            padding={`0.5rem 1rem`}
            fontWeight={`500`}
            lineHeight={`1.5`}
            text={t("ready_for_shipment")}
            textAlign={`center`}
            borderRadius={`4px`}
            func={() => changeOrderInProgress()}
          />
        ) : null}
      </div>

      <OrderTableComponent order={order} />
    </div>
  );
}

export default OrdersPage;
