import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <form className="container allForm" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email : </label>
        <input
          type="email"
          name="email"
          placeholder="coco@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">Password : </label>

        <input
          type="password"
          name="password"
          placeholder="Coco123!"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button>Submit</button>
    </form>
  );
}

export default LoginForm;
