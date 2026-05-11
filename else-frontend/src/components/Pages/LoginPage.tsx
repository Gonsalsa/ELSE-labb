import { useState } from "react";
import type { User } from "../../types/Type";
import styles from "../../css/LoginPage.module.css";
import GetUsers from "../../services/UserService";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLoging = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const users = await GetUsers();

    const foundUser = users.find(
      (user: User) => user.username === username && user.password === password,
    );
    if (foundUser) {
      setMessage("login successful");
    } else {
      setMessage("wrong username or password");
    }
  };

  return (
    <section>
      <div>
        <h1>Login</h1>
      </div>
      <form onSubmit={handleLoging}>
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
        <p>{message}</p>
      </form>
    </section>
  );
};
export default LoginPage;
