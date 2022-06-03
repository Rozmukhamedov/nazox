import "../assets/styles/ordertable.css";
import DefaultImage from "../assets/images/defaultimage.jpg";
import { useTranslation } from "react-i18next";

function OrderTableComponent({ order }) {
  console.log(order);
  const { t } = useTranslation();
  return (
    <>
      <table className="table">
        <thead>
          <tr className="bg-light">
            <th className="text-center">{t("product")}</th>
            <th className="text-center">{t("product_name")}</th>
            <th className="text-center">{t("price")}</th>
            <th className="text-center">{t("quantity")}</th>
            <th className="text-center">{t("total")}</th>
          </tr>

          {order?.items?.map((item, key) => (
            <tr key={key} style={{ borderBottom: "2px solid #eff2f7" }}>
              <td className="text-center">
                <img
                  src={
                    item?.product?.image == null
                      ? DefaultImage
                      : `http://159.223.28.79${item?.product?.image}`
                  }
                  alt={`image-${item?.id}`}
                />
              </td>
              <td className="text-center">{item?.product?.product_name}</td>
              <td className="text-center">$ {item?.product?.default_price}</td>
              <td className="text-center">{item?.quantitiy}</td>
              <td className="text-center">$ {item?.total_price}</td>
            </tr>
          ))}
        </thead>
      </table>
      <table className="order_table_infomation">
        <tbody>
          <tr>
            <td className="td">{t("order_total_price")}:</td>
            <td className="td">{order?.total_price}</td>
          </tr>
          <tr>
            <td className="td">{t("requested_time")} :</td>
            <td className="td">
              {order?.requested_time ? order?.requested_time : "null"}
            </td>
          </tr>
          <tr>
            <td className="td">{t("restaurant")} :</td>
            <td className="td">{order?.restaurant}</td>
          </tr>
          <tr>
            <td className="td">{t("payment_type")} :</td>
            <td className="td">{order?.payment_type}</td>
          </tr>
          <tr>
            <td className="td">{t("order_status")} :</td>
            <td className="td">{order?.order_status}</td>
          </tr>
          <tr>
            <td className="td">{t("delivery_address")} :</td>
            <td className="td">{order?.delivery_address}</td>
          </tr>

          <tr>
            <td className="td">{t("total")} :</td>
            <td className="td">{order?.total_price}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default OrderTableComponent;
