import "./sidebar.css";
import LogoMobile from "../../assets/images/logoRestaurant.png";
import {
  RiRestaurantFill,
  RiUserStarFill,
  RiShoppingBag3Fill,
  RiTeamFill,
  RiFunctionFill,
} from "react-icons/ri";
import SiderbarItem from "./SiderbarItemComponent";
import { useTranslation } from "react-i18next";

function SidebarComponent({ inactive, setInactive }) {
  const { t } = useTranslation();

  return (
    <div className={`side-menu ${inactive ? "inactive" : ""} `}>
      <div className={`top-section ${inactive ? "mobile" : ""}`}>
        <div className={inactive ? `logo-mobile` : `logo`}>
          {inactive ? (
            <img style={{ width: "25px" }} src={LogoMobile} alt="webscript" />
          ) : (
            <div style={{ display: "flex", alignContent: "center" }}>
              <img src={LogoMobile} alt="webscript" />
              <p style={{ fontSize: "20px" }}>Moveme Admin</p>
            </div>
          )}
        </div>

        <div className="main-menu">
          <ul>
            <SiderbarItem
              inactive={inactive}
              setInactive={setInactive}
              name={t("orders")}
              subMenus={[
                {
                  name: t("new_orders"),
                  path: "order/requested/page/1",
                },
                {
                  name: t("in_process"),
                  path: "order/in_process/page/1",
                },
                {
                  name: t("ready_for_shipment"),
                  path: "order/ready_for_shipment/page/1",
                },
                {
                  name: t("on_the_way"),
                  path: "order/on_the_way/page/1",
                },
                {
                  name: t("delivired"),
                  path: "order/delivered/page/1",
                },
                {
                  name: t("all"),
                  path: "order/all/page/1",
                },
              ]}
              icon={<RiShoppingBag3Fill />}
            />
            <SiderbarItem
              name={t("restaurant_detail")}
              icon={<RiRestaurantFill />}
              path="restaurants-detail/"
            />

            <SiderbarItem
              name={t("category")}
              icon={<RiFunctionFill />}
              path="category/page/1"
            />
            <SiderbarItem
              name={t("managers")}
              icon={<RiTeamFill />}
              path="manager/page/1"
            />
            <SiderbarItem
              name={t("filials")}
              icon={<RiUserStarFill />}
              path="filials/page/1"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SidebarComponent;
