import { useEffect, useState } from "react";
import { MdOutlineExpandMore } from "react-icons/md";
import { Link } from "react-router-dom";

function SiderbarItem({ name, subMenus, icon, setInactive, path, inactive }) {
  const [dropdownItem, setDropdownItem] = useState(false);
  const drop = () => {
    setDropdownItem(!dropdownItem);
    if (inactive) {
      setInactive(false);
    }
  };

  useEffect(() => {
    if (inactive == true) {
      setDropdownItem(false);
    }
  }, [inactive]);

  return (
    <>
      <li onClick={() => drop()}>
        <div className="menu-item" href="#">
          <div className="menu-icon">{icon}</div>
          <span>
            {subMenus && subMenus.length > 0 ? (
              <>
                {name}
                <MdOutlineExpandMore
                  style={{ marginLeft: "10px", marginBottom: "-3px" }}
                />
              </>
            ) : (
              <Link style={{ color: "#8590a5" }} to={path}>
                {name}
              </Link>
            )}
          </span>
        </div>

        {dropdownItem ? (
          <div>
            {subMenus && subMenus.length > 0 ? (
              <ul className="sub-menu">
                {subMenus.map((menu, index) => (
                  <li key={index}>
                    <Link className="sub-link" to={menu.path}>
                      {menu.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </li>
    </>
  );
}

export default SiderbarItem;
