import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "./UiComponent/InputBox";
import Button from "./UiComponent/Button";

function Login({ setIsLogIn, isLoginPage = true }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState("hide");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
    setUsername("");
    setPassword("");
    setError("");
    setShowPassword("hide");
  }, [isLoginPage]);

  const handleSwitch = () => {
    navigate(isLoginPage ? "/register" : "/login");
  };

  const handleRegister = async (e) => {
    console.log("Handle Register");
    e.preventDefault();

    if (!username && !password) {
      setError("Please enter username and password");
      return;
    }

    if (password.length < 6) {
      setError("Password should be 6 character");
      return;
    }
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    setUsername("");
    setPassword("");
    console.log(res);
  };

  const handleLogin = async (e) => {
    console.log("Handle Login");
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setIsLogIn(true);
        navigate("/dashboard");
      } else {
        setError("Invalid data");
      }
    } catch (e) {
      setError("Server error. Try again later ⚠️");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center">
      <form
        onSubmit={isLoginPage ? handleLogin : handleRegister}
        className="flex flex-col bg-white p-8 rounded-xl shadow-lg gap-4 items-center w-80"
      >
        <h2 className="text-2xl font-bold text-slate-800">
          {isLoginPage ? <p>Account Login</p> : <p>Create Account </p>}
        </h2>

        <InputBox
          styles={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          type="text"
          placeholder="Username"
          value={username}
          changeHandler={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
        />
        <div className="w-full">
          <div className="relative">
            <InputBox
              styles={`w-full border border-gray-300 rounded-md px-3 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              changeHandler={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />

            <Button
              text={!showPassword ? "Hide" : "Show"}
              styles={`absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-500`}
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {error && (
            <p className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm w-full text-center mt-2">
              {error}
            </p>
          )}
        </div>

        <Button
          text={isLoginPage ? "Login" : "Register"}
          styles={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition`}
          type="submit"
        />
      </form>

      <div className="mt-4 flex flex-col gap-3 items-center sm:flex-row">
        <div className="text-xl">
          {isLoginPage ? (
            <h1>Don't have account?</h1>
          ) : (
            <h1>If already created </h1>
          )}
        </div>
        <Button
          text={isLoginPage ? "Register" : "Login"}
          onClick={handleSwitch}
          styles={`font-bold border-2 border-blue-400 px-4 py-2 rounded-md hover:bg-blue-400 hover:text-white transition`}
        />
      </div>
    </div>
  );
}

export default Login;
