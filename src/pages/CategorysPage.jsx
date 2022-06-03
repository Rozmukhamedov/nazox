import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "../assets/styles/order.css";
import TableComponent from "../components/TableComponent";
import useCustomFetcher from "../hooks/useCustomFetcher";
import { useModal } from "react-hooks-use-modal";
import CustomSmpButton from "../components/Custom/CustomSmpBtn";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomPagination from "../components/Custom/CustomPagination";
import CustomPopup from "../components/Custom/CustomPopup";
import { URLBASE } from "../constants/applicationConstants";

function CategorysPage() {
  const [uzText, setUzText] = useState("");
  const [enText, setEnText] = useState("");
  const [ruText, setRuText] = useState("");

  const [cookies] = useCookies(["tokens"]);
  const { t } = useTranslation();

  const { idpage } = useParams();

  const [orders, setOrders] = useState([]);
  const [categoryPagingation, setCategoryPagingation] = useState();

  const [idCategory, setIdCategory] = useState(null);

  const [error, loading, fetcher] = useCustomFetcher();

  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  const deleteCategoryState = (id) => {
    setOrders(orders.filter((obj) => obj.id != id));
  };

  const deleteCategory = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
    };

    fetcher(() => {}, `${URLBASE}/category/process/${id}`, requestOptions);
    deleteCategoryState(id);
  };

  const editCategoryId = (id) => {
    open();
    setIdCategory(id);

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
    };

    fetcher(
      (response) => {
        setRuText(response.translations.ru.name);
        setEnText(response.translations.en.name);
        setUzText(response.translations.uz.name);
      },
      `${URLBASE}/category/process/${id}`,
      requestOptions
    );
  };

  const editCategory = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "PATCH",
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

    fetcher(
      (response) => {
        if (
          response.detail !=
          "У вас недостаточно прав для выполнения данного действия."
        ) {
          setUzText("");
          setEnText("");
          setRuText("");
          getCategory();
        }
      },
      `${URLBASE}/category/process/${idCategory}/`,
      requestOptions
    );
  };

  const getCategory = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
    };

    fetcher(
      (response) => {
        setCategoryPagingation(response);
        setOrders(response.results);
      },
      `${URLBASE}/rest-categorys/?lan_code=${t("language")}&page=${idpage}`,
      requestOptions
    );
  };

  useEffect(() => {
    getCategory();
  }, [idpage]);

  return (
    <>
      {error != 403 ? (
        <div style={{ padding: "20px" }}>
          {error == 403 ? null : (
            <Modal>
              <div className="modal">
                <div className="category-edit">
                  <form onSubmit={editCategory}>
                    <div>
                      <p className="form-label">Eng</p>
                      <input
                        className="form-control"
                        type="text"
                        onChange={(e) => setEnText(e.target.value)}
                        value={enText}
                      />
                    </div>
                    <div>
                      <p className="form-label">Rus</p>
                      <input
                        className="form-control"
                        type="text"
                        onChange={(e) => setRuText(e.target.value)}
                        value={ruText}
                      />
                    </div>
                    <div>
                      <p className="form-label">Uzb</p>
                      <input
                        className="form-control"
                        type="text"
                        onChange={(e) => setUzText(e.target.value)}
                        value={uzText}
                      />
                    </div>

                    <div className="flex-end">
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
                        func={close}
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
              </div>
            </Modal>
          )}

          <div className="aside-flex">
            <h1>{t("categories")}</h1>
            <Link to="/category/create">
              <CustomSmpButton
                color={`#fff`}
                background={`#5664d2`}
                border={`1px solid #5664d2`}
                padding={`0.5rem 0.75rem`}
                fontWeight={`500`}
                lineHeight={`1.5`}
                text={t("create")}
                textAlign={`center`}
                borderRadius={`4px`}
              />
            </Link>
          </div>

          {orders?.length != 0 ? (
            <TableComponent
              idName={"category"}
              orders={orders}
              editFunc={editCategoryId}
              deleteFunc={deleteCategory}
            />
          ) : null}

          {categoryPagingation?.total_pages > 1 ? (
            <CustomPagination
              pages={categoryPagingation.total_pages}
              idPage={idpage}
              pageName={"category"}
            />
          ) : null}
        </div>
      ) : (
        <CustomPopup showBtn={true} url={"/category"} />
      )}
    </>
  );
}

export default CategorysPage;
