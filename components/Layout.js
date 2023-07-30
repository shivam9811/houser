import Link from "next/link";
import { useRouter } from "next/router";
import { FaCompass, FaTags, FaUser, FaBars } from "react-icons/fa";
import SideNavbar from "./SideNavbar";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

const Layout = (props) => {
  const router = useRouter();
  const [showNavbar, setShowNavbar] = useState(false);

  const pathMatchRoute = (route) => {
    if (route === router.pathname) {
      return true;
    }
  };
  const showData = (val) => {
    setShowNavbar(val);
  };
  return (
    <>
      <div className="top">
        <Link href="/" style={{ cursor: "pointer" }}>
          Houser
          <img src="/assets/jpg/icons8-home-48.png" />
        </Link>
        {!showNavbar && (
          <FaBars
            className="visible"
            style={{
              cursor: "pointer",
              color: "#2c2c2c",
              width: "44px",
              height: "44px",
            }}
            onClick={() => setShowNavbar((prev) => !prev)}
          />
        )}
        {showNavbar && (
          <RxCross1
            className="visible"
            style={{
              cursor: "pointer",
              color: "#2c2c2c",
              width: "44px",
              height: "44px",
            }}
            onClick={() => setShowNavbar((prev) => !prev)}
          />
        )}
      </div>
      {showNavbar && <SideNavbar show={showData} />}
      {!showNavbar && props.children}

      <footer className="navbar">
        <nav className="navbarNav">
          <ul className="navbarListItems">
            <li className="navbarListItem">
              <Link
                href="/"
                className="navbarListItem"
                onClick={() => showData()}
              >
                <FaCompass
                  style={{
                    color: `${pathMatchRoute("/") ? "#2c2c2c" : "#8f8f8f"}`,
                    height: "30px",
                    width: "30px",
                  }}
                />
                <p
                  className={
                    pathMatchRoute("/")
                      ? "navbarListItemNameActive"
                      : "navbarListItemName"
                  }
                >
                  Explore
                </p>
              </Link>
            </li>
            <li className="navbarListItem" onClick={() => showData()}>
              <Link href="/offers" className="navbarListItem">
                <FaTags
                  style={{
                    color: `${
                      pathMatchRoute("/offers") ? "#2c2c2c" : "#8f8f8f"
                    }`,
                    height: "30px",
                    width: "30px",
                  }}
                />
                <p
                  className={
                    pathMatchRoute("/offers")
                      ? "navbarListItemNameActive"
                      : "navbarListItemName"
                  }
                >
                  Offers
                </p>
              </Link>
            </li>
            <li className="navbarListItem">
              <Link
                href="/profile"
                className="navbarListItem"
                onClick={() => showData()}
              >
                <FaUser
                  style={{
                    color: `${
                      pathMatchRoute("/profile") ? "#2c2c2c" : "#8f8f8f"
                    }`,
                    height: "30px",
                    width: "30px",
                  }}
                />
                <p
                  className={
                    pathMatchRoute("/profile")
                      ? "navbarListItemNameActive"
                      : "navbarListItemName"
                  }
                >
                  profile
                </p>
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
};

export default Layout;
