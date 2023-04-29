import React from "react";
import { Link } from "react-router-dom";
import { useLogOut } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Navbar() {
  const { user } = useAuthContext();

  const { logOut } = useLogOut();
  const handleClick = () => {
    logOut();
  };
  return (
    <nav>
      <Link to="/">Home</Link>
      {user && (
        <div className="userLogoutbtn">
          <span>welcome : {user?.email.split("@")[0]}</span>
          <button onClick={handleClick}>Logout</button>
        </div>
      )}
      {!user && (
        <div className="logsign">
          <Link to="/auth/user/signup">Signup</Link>
          <Link to="/auth/user/login">Login</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
