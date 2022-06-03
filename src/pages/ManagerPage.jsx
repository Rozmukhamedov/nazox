import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import "../assets/styles/manager.css";
import DefaultImage from "../assets/images/defaultimage.jpg";
import useCustomFetcher from "../hooks/useCustomFetcher";
import { useTranslation } from "react-i18next";
import Loader from "../components/Custom/Loader";
import CustomPopup from "../components/Custom/CustomPopup";
import { URLBASE } from "../constants/applicationConstants";
import CustomSmpButton from "../components/Custom/CustomSmpBtn";
import { useModal } from "react-hooks-use-modal";
import CheckBox from "../components/Custom/CheckBox";

function ManagerPage() {
  const [manager, setManager] = useState([]);
  const [filials, setFilials] = useState(null);
  const [productFilials, setProductFilials] = useState([]);

  const [userCreate, setUserCreate] = useState(false);
  const [menuCreateEdit, setMenuCreateEdit] = useState(false);
  const [productPern, setProductPern] = useState(false);
  const [allProcess, setAllProcess] = useState(false);

  const [cookies] = useCookies(["tokens"]);
  const { id } = useParams();
  const { t } = useTranslation();
  const [error, isLoading, fetcher] = useCustomFetcher();
  const navigate = useNavigate();

  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  const addFilialId = (id) => {
    setProductFilials([...productFilials, id]);
  };

  const getManager = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
    };

    fetcher(
      (response) => {
        setManager(response);
        setUserCreate(response?.permissions?.user_create_perm);
        setMenuCreateEdit(response?.permissions?.menu_create_edit_perm);
        setProductPern(response?.permissions?.product_perm);
        setAllProcess(response?.permissions?.all_process);
      },
      `${URLBASE}/manager/${id}`,
      requestOptions
    );
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

  const editPermissionManager = () => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
      body: JSON.stringify({
        filial: productFilials,
        user_create_perm: userCreate,
        menu_create_edit_perm: menuCreateEdit,
        product_perm: productPern,
        all_process: allProcess,
      }),
    };
    fetcher(
      () => {
        navigate("/manager/page/1");
      },
      `${URLBASE}/manager/permission/${manager?.permissions?.id}/`,
      requestOptions
    );
  };

  useEffect(() => {
    getManager();
    getFilials();
  }, [id]);

  if (isLoading) return <Loader />;
  if (error == 500) {
    return <Navigate to="/sever-error" replace />;
  }

  return (
    <>
      {error != 403 ? (
        <div className="manager_info">
          <div className="manager_info-flex">
            <div className="manager_info-left">
              <img
                src={
                  manager?.profile_image ? manager.profile_image : DefaultImage
                }
                alt="logo manager"
              />
            </div>
            <div className="manager_info-right">
              <h4>
                {t("first_name")}:<span> {manager.first_name}</span>
              </h4>
              <h4>
                {t("last_name")}:<span> {manager.last_name}</span>
              </h4>
              <h4>
                {t("username")}:<span> {manager.username}</span>
              </h4>
              <h4>
                {t("phone_number")}:<span> {manager.phone_number}</span>
              </h4>
              <h4>
                {t("password")}:<span> {manager.password}</span>
              </h4>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginRight: "20px",
            }}
          >
            <CustomSmpButton
              color={`#fff`}
              background={`#ffa500`}
              border={`1px solid #ffa500`}
              padding={`0.5rem 1rem`}
              fontWeight={`500`}
              lineHeight={`1.5`}
              text={t("edit_permission")}
              textAlign={`center`}
              borderRadius={`4px`}
              fontSize={`18px`}
              func={open}
            />
          </div>

          <Modal>
            <div className="modal">
              <div className="category-edit">
                <form onSubmit={editPermissionManager}>
                  <div className="edit_permission">
                    <div className="permission_left">
                      <CheckBox
                        label={"User Create"}
                        onSale={userCreate}
                        setOnSale={setUserCreate}
                        onChange={() => console.log("")}
                      />
                      <CheckBox
                        label={"Menu"}
                        onSale={menuCreateEdit}
                        setOnSale={setMenuCreateEdit}
                        onChange={() => console.log("")}
                      />
                      <CheckBox
                        label={"Product Pern"}
                        onSale={productPern}
                        setOnSale={setProductPern}
                        onChange={() => console.log("")}
                      />
                      <CheckBox
                        label={"All Process"}
                        onSale={allProcess}
                        setOnSale={setAllProcess}
                        onChange={() => console.log("")}
                      />
                    </div>
                    <div className="permission_right">
                      {filials?.map((filial, index) => {
                        return (
                          <CheckBox
                            key={index}
                            label={filial.name}
                            id={filial.id}
                            className={"product_checkbox"}
                            onChange={addFilialId}
                          />
                        );
                      })}
                    </div>
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

          <div className="manager_info-table">
            <table>
              <thead>
                <tr key="1" className="tr">
                  <td className="td">{t("filials")}</td>
                  <td>
                    {manager?.permissions?.filial?.map((res, index) => {
                      return (
                        <Link
                          style={{ marginRight: "10px" }}
                          key={index}
                          to={`/filials/detail/${res.id}`}
                        >
                          {res.name},
                        </Link>
                      );
                    })}
                  </td>
                </tr>
                <tr key="100" className="tr">
                  <td className="td">{t("all_process")}</td>
                  <td>
                    {manager?.permissions?.all_process
                      ? t("access")
                      : t("not_access")}
                  </td>
                </tr>
                <tr key="101" className="tr">
                  <td className="td">{t("menu_createe_dit_perm")}</td>
                  <td>
                    {manager?.permissions?.menu_create_edit_perm
                      ? t("access")
                      : t("not_access")}
                  </td>
                </tr>
                <tr key="102" className="tr">
                  <td className="td">{t("product_perm")}</td>
                  <td>
                    {manager?.permissions?.product_perm
                      ? t("access")
                      : t("not_access")}
                  </td>
                </tr>
                <tr key="103" className="tr">
                  <td className="td">{t("user_create_perm")}</td>
                  <td>
                    {manager?.permissions?.user_create_perm
                      ? t("access")
                      : t("not_access")}
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ) : (
        <CustomPopup showBtn={false} />
      )}
    </>
  );
}

export default ManagerPage;
