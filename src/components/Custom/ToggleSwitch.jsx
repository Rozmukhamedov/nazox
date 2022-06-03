import React, { useState } from "react";
import { useCookies } from "react-cookie";
import useCustomFetcher from "../../hooks/useCustomFetcher";
import CustomPopup from "./CustomPopup";
import "./toggleswitch.css";
import { URLBASE } from "../../constants/applicationConstants";

const ToggleSwitch = ({ toggleID, onSale }) => {
  const [isToggled, setIsToggled] = useState(onSale);
  const [cookies] = useCookies(["tokens"]);
  const [error, isLoading, fetcher] = useCustomFetcher();

  const editSale = () => {
    setIsToggled(!isToggled);
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
      body: JSON.stringify({
        on_sale: !isToggled,
      }),
    };

    fetcher(
      () => {},
      `${URLBASE}/product/${toggleID}/?lan_code=uz`,
      requestOptions
    );
  };

  return (
    <>
      <label className="toggle-switch">
        <input type="checkbox" checked={isToggled} onChange={editSale} />
        <span className="switch" />
      </label>
      {error == 403 ? (
        <CustomPopup showBtn={true} url={"/category/page/1"} />
      ) : null}
    </>
  );
};

export default ToggleSwitch;
