import React from "react";
import Meta from "@/components/Meta";
import { useState } from "react";
import Link from "next/link";
import { FaEye, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import cookie from "react-cookies";

function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();
    cookie.save("userId", data.token, { path: "/" });
    toast[data.type](data.message);
    if (data.type === "error") {
      setLoading(false);
      router.push("/login");
    } else {
      setLoading(false);
      router.push("/profile");
    }
  };

  return (
    <>
      <Meta title="Login" />
      {loading && <Spinner />}
      {!loading && (
        <div className="pageContainer">
          <header>
            <p className="pageHeader">Welcome Back!</p>
          </header>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              autoComplete="off"
              onChange={onChange}
            />
            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                className="passwordInput"
                placeholder="Password"
                id="password"
                value={password}
                autoComplete="off"
                onChange={onChange}
              />
              <FaEye
                className="showPassword"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>
            <Link href="/forgotPassword" className="forgotPasswordLink">
              Forgot Password
            </Link>
            <div className="signInBar">
              <p className="signInText">Log In</p>
              <button className="signInButton">
                <FaChevronRight
                  style={{ color: "white", width: "24px", height: "24px" }}
                />
              </button>
            </div>
          </form>
          <Link href="/signup" className="registerLink">
            Sign Up Instead
          </Link>
        </div>
      )}
    </>
  );
}

export default Login;
