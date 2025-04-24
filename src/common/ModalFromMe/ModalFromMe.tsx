import { Fragment } from "react/jsx-runtime";
import styles from "./styles.module.css";

const ModalFromMe = ({ show, closeModal }: any) => {
  return (
    show && (
      <Fragment>
        <div className={styles.backDrop} onClick={closeModal}></div>
        <div className={styles.overlay}></div>
      </Fragment>
    )
  );
};

export default ModalFromMe;
