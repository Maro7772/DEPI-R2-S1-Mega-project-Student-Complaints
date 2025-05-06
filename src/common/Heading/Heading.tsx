import styles from "./styles.module.css";
const Heading = ({
  title,
  description
}: {
  title: string;
  description: string;
}) => {
  const { head, des } = styles;
  return (
    <>
      <h2 className={head}>{title}</h2>
      <p className={des}>{description}</p>
    </>
  );
};

export default Heading;
