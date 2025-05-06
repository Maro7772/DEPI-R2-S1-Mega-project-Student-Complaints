import styles from "./styles.module.css";

const HeadBar = ({ title }: { title: string }) => {
  return (
    <div className={styles.headBar}>
      <span className={styles.headBarText + " " + styles.select}>{title}</span>
    </div>
  );
};

export default HeadBar;
