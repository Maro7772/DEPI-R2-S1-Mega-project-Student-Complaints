import { Outlet } from "react-router-dom";
import { SideBar } from "@common/index";
import styles from "./styles.module.css";

const MainLayout = () => {
  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
