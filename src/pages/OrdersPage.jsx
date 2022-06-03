import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import "../assets/styles/order.css";
import CustomPaginationOrder from "../components/Custom/CustomPaginationOrder";
import CustomPopup from "../components/Custom/CustomPopup";
import TableComponent from "../components/TableComponent";
import { URLBASE } from "../constants/applicationConstants";
import useCustomFetcher from "../hooks/useCustomFetcher";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { title, idpage } = useParams();
  const [cookies] = useCookies(["tokens"]);
  const { t } = useTranslation();

  const [error, isLoding, fetcher] = useCustomFetcher();

  const lastNumber = orders?.next?.slice(-1);

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
        setOrders(response);
      },
      `${URLBASE}/main/restaurant/orders?action=${title}&page=${idpage}`,
      requestOptions
    );
  }, [title, idpage]);

  if (isLoding) {
    <div>Loading ...</div>;
  }

  if (error == 500) {
    return <Navigate to="/sever-error" replace />;
  }
  return (
    <div style={{ padding: "20px" }}>
      {error == 403 ? (
        <CustomPopup />
      ) : (
        <>
          <div className="aside-flex">
            {title == "delivered" ? (
              <h1>{t("delivired")}</h1>
            ) : title == "requested" ? (
              <h1>{t("new_orders")}</h1>
            ) : title == "in_process" ? (
              <h1>{t("in_process")}</h1>
            ) : title == "on_the_way" ? (
              <h1>{t("on_the_way")}</h1>
            ) : (
              <h1>{t("all")}</h1>
            )}

            <label>
              {t("search")}:
              <input
                type="search"
                placeholder=""
                aria-controls="DataTables_Table_0"
              />
            </label>
          </div>
          {orders?.results?.length != 0 ? (
            <TableComponent
              nameOrder={"orders"}
              idName={title}
              orders={orders.results}
              pathDetail={`order/${title}/detail`}
            />
          ) : (
            <h3>{t("not_have")}</h3>
          )}

          {orders?.count >= 11 ? (
            <CustomPaginationOrder
              pages={1}
              idPage={idpage}
              pageName={title}
              numberPage={lastNumber}
            />
          ) : null}
        </>
      )}
    </div>
  );
}

export default OrdersPage;
