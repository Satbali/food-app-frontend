import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, loding } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, email, password);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="container allForm">
        <div>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            name="name"
            placeholder="coco"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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

      {error && <div>{error}</div>}
      {loding && <div>{loding}</div>}
    </>
  );
}

export default SignupForm;
