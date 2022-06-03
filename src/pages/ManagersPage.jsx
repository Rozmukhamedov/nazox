import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import CustomPagination from "../components/Custom/CustomPagination";
import CustomPopup from "../components/Custom/CustomPopup";
import CustomSmpButton from "../components/Custom/CustomSmpBtn";
import TableComponent from "../components/TableComponent";
import { URLBASE } from "../constants/applicationConstants";
import useCustomFetcher from "../hooks/useCustomFetcher";

function ManagersPage() {
  const navigate = useNavigate();
  const [managers, setManagers] = useState([]);
  const [cookies] = useCookies(["tokens"]);
  const { t } = useTranslation();
  const { idPage } = useParams();

  const [error, isLoading, fetcher] = useCustomFetcher();

  const editManager = (id) => {
    navigate(`/manager/edit/${id}`);
  };

  const deleteMangerState = (id) => {
    setManagers(managers?.filter((obj) => obj.id != id));
  };

  const deleteManager = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
    };

    fetcher(() => {}, `${URLBASE}/manager/${id}`, requestOptions);
    deleteMangerState(id);
  };

  const getManagers = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
    };
    fetcher(
      (response) => {
        setManagers(response);
      },
      `${URLBASE}/manager/`,
      requestOptions
    );
  };

  useEffect(() => {
    getManagers();
  }, []);

  if (error == 500) {
    return <Navigate to="/sever-error" replace />;
  }

  return (
    <>
      {error != 403 ? (
        <div style={{ padding: "30px" }}>
          <div className="aside-flex">
            <h1>{t("managers")}</h1>
            <Link to="/manager/create">
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
          {managers?.length >= 2 ? (
            <TableComponent
              idName={"managers"}
              orders={managers}
              deleteFunc={deleteManager}
              editFunc={editManager}
            />
          ) : null}

          {managers?.total_pages > 1 ? (
            <CustomPagination pages={managers?.total_pages} idPage={idPage} />
          ) : null}
        </div>
      ) : (
        <CustomPopup showBtn={false} />
      )}
    </>
  );
}

export default ManagersPage;
