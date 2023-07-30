import React, { useEffect, useState } from "react";
import Link from "next/link";
import Meta from "./Meta";
import { useRouter } from "next/router";
import { AiOutlineLogin } from "react-icons/ai";
import { IoMdPersonAdd } from "react-icons/io";
import { FaDoorClosed, FaHome } from "react-icons/fa";
import { MdOutlineCreate } from "react-icons/md";
import cookie from "react-cookies";

function SideNavbar(props) {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const pathMatchRoute = (route) => {
    if (route === router.pathname) {
      return true;
    }
  };
  return (
    <>
      <Meta title="houser" />
      {!show && (
        <div className="sideNavbar">
          <img src="/assets/svg/undraw_chore_list_re_2lq8.svg" />
          <ul>
            <li>
              <Link
                href="/sale"
                onClick={() => {
                  props.show(false);
                }}
                className={pathMatchRoute("/sale") ? "active" : ""}
              >
                <FaHome />
                Sale
              </Link>
            </li>
            <li>
              <Link
                href="/rent"
                onClick={() => {
                  props.show(false);
                }}
                className={pathMatchRoute("/rent") ? "active" : ""}
              >
                <FaDoorClosed />
                Rent
              </Link>
            </li>

            {cookie.load("userId") === undefined && (
              <li>
                <Link
                  href="/login"
                  onClick={() => {
                    props.show(false);
                  }}
                  className={pathMatchRoute("/login") ? "active" : ""}
                >
                  <AiOutlineLogin />
                  Log In
                </Link>
              </li>
            )}
            {cookie.load("userId") === undefined && (
              <li>
                <Link
                  href="/signup"
                  onClick={() => props.show(false)}
                  className={pathMatchRoute("/signup") ? "active" : ""}
                >
                  <IoMdPersonAdd />
                  Sign Up
                </Link>
              </li>
            )}
            {cookie.load("userId") !== undefined && (
              <li>
                <Link
                  href="/listing/new"
                  onClick={() => props.show(false)}
                  className={pathMatchRoute("/listing/new") ? "active" : ""}
                >
                  <MdOutlineCreate />
                  Create new listing
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default SideNavbar;
