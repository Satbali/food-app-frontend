import { Route, Routes, Navigate } from "react-router-dom"
import SignupForm from "./components/SignupForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import { useAuthContext } from "./hooks/useAuthContext.js";


function App() {
  const { user } = useAuthContext()
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to={'/auth/user/login'} />} />
        <Route path="/auth/user/signup" element={!user ? <SignupForm /> : <Navigate to={'/'} />} />
        <Route path="/auth/user/login" element={!user ? <LoginForm /> : <Navigate to={'/'} />} />
      </Routes>
    </>
  );
}

export default App;
