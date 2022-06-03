import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../assets/styles/category.css";
import CustomPaginationProduct from "../components/Custom/CustomPaginationProduct";
import CustomPopup from "../components/Custom/CustomPopup";
import CustomSmpButton from "../components/Custom/CustomSmpBtn";
import TableComponent from "../components/TableComponent";
import { URLBASE } from "../constants/applicationConstants";
import useCustomFetcher from "../hooks/useCustomFetcher";

function CategoryPage() {
  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);
  const [cookies] = useCookies(["tokens"]);
  const { id, idpage } = useParams();
  const navigate = useNavigate();
  const [error, isLoading, fetcher] = useCustomFetcher();
  const { t } = useTranslation();

  const editProduct = (id) => {
    navigate(`/product/edit/${id}`);
  };

  const deleteProductSate = (id) => {
    setProducts(products.filter((obj) => obj.id != id));
  };

  const deletePrdouct = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
    };

    fetcher(
      (res) => {
        if (
          res.detail ==
          "У вас недостаточно прав для выполнения данного действия."
        ) {
          console.log(res);
        } else {
          deleteProductSate(id);
        }
      },
      `${URLBASE}/product/${id}/?lan_code=${t("language")}`,
      requestOptions
    );
  };

  const getProducts = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
    };

    fetcher(
      (response) => {
        setData(response);
        setProducts(response.results);
      },
      `${URLBASE}/product/?category_id=${id}&lan_code=${t(
        "language"
      )}&page=${idpage}`,
      requestOptions
    );
  };

  useEffect(() => {
    getProducts();
  }, [id, idpage]);

  if (error == 401) return <h3>Unauthorized</h3>;

  return (
    <div style={{ padding: "20px" }}>
      {error == 403 ? (
        <CustomPopup showBtn={true} url={"/category/page/1"} />
      ) : (
        <>
          <div className="aside-flex">
            <h1>
              {t("category")} {id}
            </h1>

            <Link to={`/product/create/${id}`}>
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
          {products?.length != 0 ? (
            <TableComponent
              idName={"products"}
              orders={products}
              deleteFunc={deletePrdouct}
              editFunc={editProduct}
            />
          ) : (
            <h1>Not products</h1>
          )}

          {data != null ? (
            <CustomPaginationProduct
              pages={data.total_pages}
              idPage={idpage}
              pageName={"product"}
              idCategory={id}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default CategoryPage;
