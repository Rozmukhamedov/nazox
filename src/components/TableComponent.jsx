import "../assets/styles/table.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ToggleSwitch from "./Custom/ToggleSwitch";
import { useTranslation } from "react-i18next";

function TableComponent({ idName, orders, deleteFunc, editFunc, nameOrder }) {
  const { t } = useTranslation();
  const [mockData, setMockData] = useState(orders);
  const [orderFilter, setOrderFilter] = useState("ASC");

  useEffect(() => {
    setMockData(orders);
  }, [orders]);

  const sorting = (col) => {
    if (orderFilter === "ASC" || mockData != null) {
      const sorted = [...mockData].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setMockData(sorted);
      setOrderFilter("DSC");
    }
    if (orderFilter === "DSC" || mockData != null) {
      const sorted = [...mockData].sort((a, b) =>
        b[col].toLowerCase() > a[col].toLowerCase() ? 1 : -1
      );
      setMockData(sorted);
      setOrderFilter("ASC");
    }
  };

  return (
    <div className="table">
      <table>
        <thead>
          {idName == "filials" ? (
            <tr>
              <th onClick={() => sorting(`id`)} className="id">
                {t("id")}
              </th>
              <th>{t("name")}</th>
              <th>{t("origin")}</th>
            </tr>
          ) : idName == "products" ? (
            <tr>
              <th className="id">{t("id")}</th>
              <th>{t("image")}</th>
              <th>{t("on_sale")}</th>
              <th>{t("product_name")}</th>
              <th>{t("product_description")}</th>
              <th>{t("default_price")}</th>
            </tr>
          ) : idName == "managers" ? (
            <tr>
              <th onClick={() => sorting(`id`)} className="id">
                {t("id")}
              </th>
              <th onClick={() => sorting(`username`)}>{t("username")}</th>
              <th onClick={() => sorting(`password`)}>{t("password")}</th>
              <th onClick={() => sorting(`first_name`)}>{t("first_name")}</th>
              <th onClick={() => sorting(`last_name`)}>{t("last_name")}</th>
              <th onClick={() => sorting(`phone_number`)}>
                {t("phone_number")}
              </th>
            </tr>
          ) : idName == "category" ? (
            <tr>
              <th onClick={() => sorting(`id`)} className="id">
                {t("id")}
              </th>
              <th onClick={() => sorting(`name`)}>{t("name")}</th>
              <th onClick={() => sorting(`items`)}>{t("items")}</th>
            </tr>
          ) : (
            <tr>
              <th onClick={() => sorting(`id`)} className="id">
                {t("id")}
              </th>
              <th onClick={() => sorting(`customer`)}>{t("customer")}</th>
              <th onClick={() => sorting(`pree_order_time`)}>
                {t("pree_order_time")}
              </th>
              <th onClick={() => sorting(`delivery_type`)}>
                {t("delivery_type")}
              </th>
              <th onClick={() => sorting(`items`)}>{t("items")}</th>
              <th onClick={() => sorting(`requested_at`)}>
                {t("requested_at")}
              </th>
              <th onClick={() => sorting(`status`)}>{t("order_status")}</th>
            </tr>
          )}
        </thead>
        <tbody>
          {mockData?.map((td, id) => (
            <tr key={id + 400}>
              {Object.keys(td).map((key, index) => {
                if (key == "image" && idName == "products") {
                  return (
                    <td key={td[key]} className="image">
                      <img src={`${td[key]}`} alt={td[key]} />
                    </td>
                  );
                }
                if (key == "image") {
                  return (
                    <td key={td[key]} className="image">
                      <img
                        src={`http://159.223.28.79${td[key]}`}
                        alt={td[key]}
                      />
                    </td>
                  );
                }
                if (key == "profile_image") {
                  return null;
                }
                if (key == "on_sale") {
                  return (
                    <td key={td[key]}>
                      <ToggleSwitch toggleID={td.id} onSale={td[key]} />
                    </td>
                  );
                }

                if (key == "product_description") {
                  return (
                    <td key={td[key]}>
                      <p className="description_text">{td[key]}</p>
                    </td>
                  );
                }

                if (key == "order_status") {
                  return (
                    <td key={td[key]}>
                      <div className={td[key]}>{td[key]}</div>
                    </td>
                  );
                }

                if (key == "created_at") {
                  return null;
                }
                if (key == "pree_order_time") {
                  return (
                    <td key={td[key]}>
                      {td[key] == "None" ? (
                        <div className={td[key]} style={{ fontSize: "24px" }}>
                          -
                        </div>
                      ) : (
                        <div className={td[key]} style={{ fontSize: "13px" }}>
                          {td[key]}
                        </div>
                      )}
                    </td>
                  );
                }
                if (key == "origin_lon" || key == "origin_lat") {
                  return null;
                }
                if (key == "id" && idName == "filials") {
                  return (
                    <td className="id" key={td[key]}>
                      <Link to={`/filials/detail/${td[key]}/`}>
                        <div>#{td[key]}</div>
                      </Link>
                    </td>
                  );
                }
                if (key == "id" && idName == "products") {
                  return (
                    <td className="id" key={td[key]}>
                      <Link to={`/product/detail/${td[key]}/`}>
                        <div>#{td[key]}</div>
                      </Link>
                    </td>
                  );
                }
                if (key == "id" && idName == "category") {
                  return (
                    <td className="id" key={td[key]}>
                      <Link to={`/product/${td[key]}/page/1`}>
                        <div>#{td[key]}</div>
                      </Link>
                    </td>
                  );
                }
                if (key == "id" && nameOrder == "orders") {
                  return (
                    <td className="id" key={td[key]}>
                      <Link to={`/order/${idName}/detail/${td[key]}`}>
                        <div>#{td[key]}</div>
                      </Link>
                    </td>
                  );
                }
                if (key == "id" && idName == "managers") {
                  return (
                    <td className="id" key={td[key]}>
                      <Link to={`/manager/detail/${td[key]}`}>
                        <div>#{td[key]}</div>
                      </Link>
                    </td>
                  );
                }

                if (key == "id") {
                  return (
                    <td className="id" key={td[key]}>
                      <Link to={`${idName}/detail/${td[key]}`}>
                        <div>#{td[key]}</div>
                      </Link>
                    </td>
                  );
                } else {
                  return <td key={td[key] + index}>{td[key]}</td>;
                }
              })}
              {idName == "category" ||
              idName == "filials" ||
              idName == "products" ||
              idName == "managers" ? (
                <>
                  <td key={id + 450}>
                    <button
                      className="delete"
                      onClick={() => deleteFunc(td.id)}
                    >
                      {t("delete")}
                    </button>
                  </td>
                  <td key={id + 500}>
                    <button className="edit" onClick={() => editFunc(td.id)}>
                      {t("edit")}
                    </button>
                  </td>
                </>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;
