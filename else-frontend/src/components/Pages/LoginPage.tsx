import styles from "../../css/LoginPage.module.css";
import GetUsers from "../../services/UserService";

const LoginPage = () => {
  GetUsers();
  return (
    <section>
      <div>
        <h1>Login</h1>
      </div>
      <form>
        <label>Username</label>
        <input />
        <label>Password</label>
        <input />
        <button className={styles.loginButton}>Login</button>
      </form>
    </section>
  );
};
export default LoginPage;
