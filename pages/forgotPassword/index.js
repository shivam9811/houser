import { useState } from "react";
import Meta from "@/components/Meta";
import { toast } from "react-toastify";
import { FaAngleRight } from "react-icons/fa";
import Link from "next/link";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/forgot", {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();

    toast[data.type](data.message);
  };
  return (
    <>
      <Meta title="Forgot Password" />
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Forgot Password</p>
        </header>
        <main>
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
            <Link className="forgotPasswordLink" href="/login">
              Log In
            </Link>
            <div className="signInBar">
              <div className="signInText">Send Reset Link</div>
              <button className="signInButton">
                <FaAngleRight fill="white" width="54px" heigth="34px" />
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default ForgotPassword;
