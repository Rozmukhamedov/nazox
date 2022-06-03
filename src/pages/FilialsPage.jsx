import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "../assets/styles/filials.css";
import CustomSmpButton from "../components/Custom/CustomSmpBtn";
import TableComponent from "../components/TableComponent";
import useCustomFetcher from "../hooks/useCustomFetcher";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomPopup from "../components/Custom/CustomPopup";
import { URLBASE } from "../constants/applicationConstants";
// import CustomPagination from "../components/Custom/CustomPagination";

function FilialsPage() {
  const navigate = useNavigate();
  const [filials, setFilials] = useState([]);
  const { t } = useTranslation();
  const [cookies] = useCookies(["tokens"]);
  const params = useLocation();

  const { idPage } = useParams();
  const [error, isLoding, fetcher] = useCustomFetcher();

  const editFilial = (id) => {
    navigate(`/filials/edit/${id}`);
  };

  const deleteFilial = (deleteId) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
    };
    fetcher(() => {}, `${URLBASE}/filials/${deleteId}`, requestOptions);
    deleteFilialState(deleteId);
    alert("deleted");
  };

  const deleteFilialState = (id) => {
    setFilials(filials.filter((obj) => obj.id != id));
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

  useEffect(() => {
    getFilials();
  }, []);

  if (error == 500) {
    return <Navigate to="/sever-error" replace />;
  }

  return (
    <>
      {error != 403 ? (
        <div style={{ padding: "20px" }}>
          <div className="aside-flex" style={{ marginBottom: "20px" }}>
            <label>
              {t("search")}:
              <input
                type="search"
                placeholder=""
                aria-controls="DataTables_Table_0"
              />
            </label>

            <Link to="/filials/create">
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

          {filials?.length != 0 ? (
            <TableComponent
              idName={"filials"}
              orders={filials}
              deleteFunc={deleteFilial}
              editFunc={editFilial}
            />
          ) : null}

          {/* {filials?.total_pages > 1 ? (
        <CustomPagination
          pages={filials.total_pages}
          idPage={idPage}
          pageName={filials}
        />
      ) : null} */}
        </div>
      ) : (
        <CustomPopup showBtn={true} url={"/filials"} />
      )}
    </>
  );
}

export default FilialsPage;
