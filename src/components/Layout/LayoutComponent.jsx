import { Outlet } from "react-router-dom";
import HeaderComponent from "../Header/HeaderComponent";
import SidebarComponent from "../Sidebar/SidebarComponent";
import "./layout.css";

function LayoutComponent() {
  return (
    <>
      <SidebarComponent />
      <div className="main">
        <HeaderComponent />
        <div className="aside">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default LayoutComponent;
