import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "../assets/styles/filials.css";
import CustomSmpButton from "../components/Custom/CustomSmpBtn";
import useCustomFetcher from "../hooks/useCustomFetcher";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomPopup from "../components/Custom/CustomPopup";
import { URLBASE } from "../constants/applicationConstants";

function FilialEditPage() {
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");

  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [cookies] = useCookies(["tokens"]);
  const [positionClick, setPositionClick] = useState([]);

  const [error, isLoading, fetcher] = useCustomFetcher();

  const editFilial = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
      body: JSON.stringify({
        name: name,
        origin: adress,
        origin_lon: positionClick?.lng,
        origin_lat: positionClick?.lat,
      }),
    };

    fetcher(
      (response) => {
        if (
          response.detail !=
          "У вас недостаточно прав для выполнения данного действия."
        ) {
          navigate("/filials/page/1", { replace: true });
        }
      },
      `${URLBASE}/filials/${id}/`,
      requestOptions
    );
  };

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setPositionClick(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        // map.locate();
      },
    });

    return (
      <Marker position={positionClick}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

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
        setName(response.name);
        setAdress(response.origin);
        setPositionClick([response.origin_lat, response.origin_lon]);
      },
      `${URLBASE}/filials/${id}`,
      requestOptions
    );
  }, [id]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      {error != 403 ? (
        <div style={{ padding: "20px" }}>
          <form onSubmit={editFilial} className="filials">
            <div className="filials-flex">
              <div>
                <p className="form-label">{t("title")}</p>
                <input
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  value={name}
                />
              </div>
              <div>
                <p className="form-label">{t("address")}</p>
                <input
                  className="form-control"
                  onChange={(e) => setAdress(e.target.value)}
                  type="text"
                  value={adress}
                />
              </div>
            </div>
            <MapContainer center={[-18.927881, 47.381072]} zoom={11}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {positionClick?.length == 0 ? null : <LocationMarker />}
            </MapContainer>
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
                func={() => navigate(-1)}
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
      ) : (
        <CustomPopup showBtn={true} url={"/filials/page/1"} />
      )}
    </>
  );
}

export default FilialEditPage;
