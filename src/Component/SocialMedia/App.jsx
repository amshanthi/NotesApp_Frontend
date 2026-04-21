import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import NewPost from "./NewPost";
import Notes from "./notes";

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
        <Route
          path="register"
          element={<Login isLoginPage={false} setIsLogIn={setIsLogIn} />}
        />

        <Route
          path="login"
          element={<Login isLoginPage={true} setIsLogIn={setIsLogIn} />}
        />

        <Route
          path="/dashboard"
          element={
            isLogIn ? (
              <NewPost isLoginPage={true} setIsLogIn={setIsLogIn} />
            ) : (
              <Login isLoginPage={true} setIsLogIn={setIsLogIn} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
