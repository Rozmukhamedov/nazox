import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import "../assets/styles/filial.css";
import useCustomFetcher from "../hooks/useCustomFetcher";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { URLBASE } from "../constants/applicationConstants";
import { useTranslation } from "react-i18next";

function FilialPage() {
  const [filial, setFilial] = useState([]);
  const [cookies] = useCookies(["tokens"]);
  const { id } = useParams();
  const [error, isLoading, fetcher] = useCustomFetcher();
  const { t } = useTranslation();

  const position = [
    filial.origin_lon ? filial.origin_lon : -19.05808190708751,
    filial.origin_lat ? filial.origin_lat : 47.088775634765625,
  ];

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
        setFilial(response);
      },
      `${URLBASE}/filials/${id}`,
      requestOptions
    );
  }, [id]);

  if (isLoading) {
    <div>Loading ...</div>;
  }
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex" }}>
        <h3 style={{ width: "70px" }}>ID:</h3>
        <h3>{filial.id}</h3>
      </div>
      <div style={{ display: "flex" }}>
        <h3 style={{ width: "70px" }}>{t("name")}:</h3>
        <h3>{filial.name}</h3>
      </div>

      <div style={{ display: "flex" }}>
        <h3 style={{ width: "70px" }}>{t("street")}:</h3>
        <h3>{filial.origin}</h3>
      </div>

      <MapContainer center={position} zoom={4}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default FilialPage;
