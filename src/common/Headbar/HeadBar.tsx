import styles from "./styles.module.css";

<<<<<<< HEAD
const HeadBar = ({ title }: { title: string }) => {
  return (
    <div className={styles.headBar}>
      <span className={styles.headBarText + " " + styles.select}>{title}</span>
=======
const HeadBar = ({
  select,
  title
}: {
  select: boolean;
  title: string;
}) => {
  return (
    <div className={styles.headBar}>
      <span
        className={styles.headBarText + " " + (select ? styles.selected : "")}
      >
        {title}
      </span>
>>>>>>> main
    </div>
  );
};

export default HeadBar;
