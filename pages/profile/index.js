import React, { useState, useEffect } from "react";
import Meta from "@/components/Meta";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import { FaChevronRight, FaHome } from "react-icons/fa";
import cookie from "react-cookies";

function Profile(props) {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [changeDetails, setChangeDetails] = useState(false);
  useEffect(() => {
    const getCall = async () => {
      const token = cookie.load("userId");
      const res = await fetch("/api/user/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.user) {
        setFormData({
          name: data.user.name,
          email: data.user.email,
        });
      }
      cookie.save("id", data.userId);
    };
    getCall();
  }, []);

  const { name, email } = formData;

  const onLogout = async () => {
    const res = await fetch("api/auth/logout");
    const data = await res.json();
    toast[data.type](data.message);
    cookie.remove("userId");
    cookie.remove("id");
    setFormData({
      name: "",
      email: "",
    });
    router.push("/");
  };

  const onsSubmit = async () => {
    const res = await fetch("api/user/updateUser", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    toast[data.type](data.message);
  };

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <Meta title="Profile" />
      {formData.name === "" && (
        <div className="pageContainer">
          <h1>Please login first or create a new account to contine</h1>

          <Link style={{ color: "blue" }} href="/login">
            Login
          </Link>
          <Link style={{ color: "blue" }} href="/signup">
            Register
          </Link>
        </div>
      )}
      {formData.name !== "" && (
        <div className="pageContainer">
          <div className="profile">
            <header className="profileHeader">
              <p className="pageHeader">My Profile</p>
              <button type="button" className="logOut" onClick={onLogout}>
                Logout
              </button>
            </header>
            <main>
              <div className="profileDetailsHeader">
                <p className="profileDetailsText">Personal Details</p>
                <p
                  className="changePersonalDetails"
                  onClick={() => {
                    changeDetails && onsSubmit();
                    setChangeDetails((prev) => !prev);
                  }}
                >
                  {changeDetails ? "done" : "change"}
                </p>
              </div>
              <div className="profileCard">
                <form>
                  <input
                    type="text"
                    id="name"
                    className={
                      !changeDetails ? "profileName" : "profileNameActive"
                    }
                    disabled={!changeDetails}
                    value={name}
                    onChange={onChange}
                    autoComplete="off"
                  />
                  <input
                    type="email"
                    id="email"
                    className="profileEmail"
                    disabled={!changeDetails}
                    value={email}
                    autoComplete="off"
                  />
                </form>
              </div>
              <Link className="createListing" href="/listing/new">
                <FaHome />
                <p>Sell or rent your home</p>
                <FaChevronRight />
              </Link>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
