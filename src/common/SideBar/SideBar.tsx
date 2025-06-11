import { LoginRegister } from "../index";
import { NavLink } from "react-router-dom";
import { RiMenu2Fill } from "react-icons/ri";
import { MdOutlineDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { LuMessageCircleWarning } from "react-icons/lu";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import LogoutButton from "@/common/LogoutButton/LogoutButton";

const SideBar = () => {
  const { id } = useSelector((state: any) => state.user);

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
        {id ? <LogoutButton /> : <LoginRegister />}
      </div>
    </div>
  );
};

export default SideBar;
