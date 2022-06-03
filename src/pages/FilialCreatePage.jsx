import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomPopup from "../components/Custom/CustomPopup";
import { URLBASE } from "../constants/applicationConstants";

function FilialCreatePage() {
  const [name, setName] = useState("");
  const [address, setAdress] = useState("");
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [cookies] = useCookies(["tokens"]);
  const [positionClick, setPositionClick] = useState([-18.927881, 47.381072]);

  const [filialsError, filialsIsLoading, filialsFetcher] = useCustomFetcher();

  const createFilial = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.tokens?.access}`,
      },
      body: JSON.stringify({
        name: name,
        origin: address,
        origin_lon: positionClick.lat,
        origin_lat: positionClick.lng,
      }),
    };

    filialsFetcher(() => {}, `${URLBASE}/filials/`, requestOptions);
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

  if (filialsError == 201) return navigate(-1);

  return (
    <>
      {filialsError == 403 ? (
        <CustomPopup showBtn={true} url={"/filials/page/1"} />
      ) : (
        <div style={{ padding: "20px" }}>
          <form className="filials" onSubmit={createFilial}>
            <div className="filials-flex">
              <div>
                <p className="form-label">{t("title")}</p>
                <input
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                />
              </div>
              <div>
                <p className="form-label">{t("address")}</p>
                <input
                  className="form-control"
                  onChange={(e) => setAdress(e.target.value)}
                  type="text"
                  required
                />
              </div>
            </div>
            <MapContainer center={[-18.927881, 47.381072]} zoom={11}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker />
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
                text={t("create")}
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
      )}
    </>
  );
}

export default FilialCreatePage;
