import styles from "./styles.module.css";

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
    </div>
  );
};

export default HeadBar;
