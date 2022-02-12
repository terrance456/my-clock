import React from "react";
import "./sidebar.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { useThemeContext } from "../../context/ThemeContext";

export const Sidebar = () => {
  const { theme } = useThemeContext();
  const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <GiHamburgerMenu />
      </div>
      <div
        className={`sidebar-content ${openSidebar ? "open-sidebar" : ""} ${
          theme.bgBody
        }`}
      >
        asdasd
      </div>
    </div>
  );
};

export default Sidebar;
