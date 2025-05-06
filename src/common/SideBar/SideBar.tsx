import { LoginRegister } from "../index";
import { NavLink } from "react-router-dom";
import { RiMenu2Fill } from "react-icons/ri";
import { MdOutlineDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { LuMessageCircleWarning } from "react-icons/lu";
import styles from "./styles.module.css";

const SideBar = () => {
  return (
    <div className={styles.left}>
      <div className={styles.top}>
        <div className={styles.menu}>
          <RiMenu2Fill className={styles.menuIcon} />
          <div className={styles.menuText}>MENU</div>
        </div>
        <div className={styles.menuItems}>
          <NavLink className={styles.bullets} to="dashboard">
            <MdOutlineDashboard className={styles.icon} />
            <div className={styles.dashboardText}>Dashboard</div>
          </NavLink>
          <NavLink className={styles.bullets} to="complaints">
            <LuMessageCircleWarning className={styles.icon} />
            <div className={styles.complaintsText}>Complaints</div>
          </NavLink>
          <NavLink className={styles.bullets} to="settings">
            <IoSettingsOutline className={styles.icon} />
            <div className={styles.settingsText}>Settings</div>
          </NavLink>
        </div>
      </div>
      <div className={styles.bottom}>
        <LoginRegister />
      </div>
    </div>
  );
};
export default SideBar;
