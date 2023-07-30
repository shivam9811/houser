import React from "react";
import Meta from "@/components/Meta";
import { useState } from "react";
import Link from "next/link";
import { FaEye, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function Signup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFlag, setPasswordFlag] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    cpassword: "",
    name: "",
  });

  const { email, password, name, cpassword } = formData;

  const onChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const onBlur = () => {
    password !== cpassword ? setPasswordFlag(true) : setPasswordFlag(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    toast[data.type](data.message);
    if (data.type === "error") {
      router.push("/signup");
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      <Meta title="Signup" />
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Sign Up!</p>
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
          <input
            type="text"
            className="nameInput"
            placeholder="Name"
            id="name"
            value={name}
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
          <div className="passwordInputDiv">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="passwordInput"
              placeholder="Confirm Password"
              id="cpassword"
              value={cpassword}
              autoComplete="off"
              onChange={onChange}
              onBlur={onBlur}
            />
            <FaEye
              className="showPassword"
              onClick={() => setShowConfirmPassword((prevState) => !prevState)}
            />
          </div>

          {passwordFlag && (
            <div style={{ color: "red", textAlign: "center" }}>
              password doesn't match
            </div>
          )}

          <div className="signInBar">
            <p className="signInText">Sign Up</p>
            <button className="signInButton">
              <FaChevronRight
                style={{ color: "white", width: "24px", height: "24px" }}
              />
            </button>
          </div>
        </form>
        <Link href="/login" className="registerLink">
          Have an account? Log In instead
        </Link>
      </div>
    </>
  );
}

export default Signup;
