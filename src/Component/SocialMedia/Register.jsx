import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

function Register({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center"></div>
  );
}

export default Register;
