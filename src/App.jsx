import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewPost from "./pages/NewPost";
import Button from "./Component/Button";
import { AppContext } from "./Context/AppContext";

function App() {
  const [isLogIn, setIsLogIn] = useState(false);

  // check token on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLogIn(false);
      return;
    }

    fetch("http://localhost:5000/profile", {
      //fetch("https://notesapp-backend-bntk.onrender.com/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then((data) => {
        console.log("Data " + data);
        setIsLogIn(true);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setIsLogIn(false);
      });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/register"
          element={<Login isLoginPage={false} setIsLogIn={setIsLogIn} />}
        />

        <Route
          path="/login"
          element={<Login isLoginPage={true} setIsLogIn={setIsLogIn} />}
        />

        <Route
          path="/dashboard"
          element={
            isLogIn ? (
              <NewPost isLoginPage={true} setIsLogIn={setIsLogIn} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
