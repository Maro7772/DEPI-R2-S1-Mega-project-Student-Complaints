import { Container } from "react-bootstrap";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";

const { loginRegister, login, register } = styles;
const LoginRegister = () => {
  return (
    <Container>
      <div className={loginRegister}>
        <NavLink className={login} to="login">
          Login
        </NavLink>
        <NavLink className={register} to="register">
          Register
        </NavLink>
      </div>
    </Container>
  );
};

export default LoginRegister;
