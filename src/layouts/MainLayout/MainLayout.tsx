import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SideBar } from "@common/index";
import styles from "./styles.module.css";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/users/userSlice";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // إذا عندك بيانات المستخدم متخزنة في localStorage، استرجعها كمان
        const userString = localStorage.getItem("user");
        if (userString) {
          const user = JSON.parse(userString);
          dispatch(setUser(user));
        }
      } catch (error) {
        console.error("Error restoring user from localStorage:", error);
      }
    } else {
      // مفيش توكن، رجعه على صفحة اللوجين
      navigate("/complaints");
    }
  }, [dispatch, navigate]);

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
