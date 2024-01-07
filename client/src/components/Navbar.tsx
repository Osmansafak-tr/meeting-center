import React, { ChangeEvent, useState } from "react";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../hooks/AuthProvider";

type LinkProps = {
  text: string;
  link: string;
};

const Link = (props: LinkProps) => {
  const { text, link } = props;
  const { pathname } = window.location;

  if (pathname == link)
    return (
      <a className="nav-link active" href={link}>
        {text}
      </a>
    );

  return (
    <a className="nav-link" href={link}>
      {text}
    </a>
  );
};

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Meeting Center
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link text="Home" link="/" />
              </li>
              <li className="nav-item">
                <Link text="Join Meeting" link="/meeting/join" />
              </li>
              {isAuthenticated ? (
                <Link text="My Meetings" link="/myMeetings" />
              ) : null}
            </ul>
            <form className="d-flex">
              {isAuthenticated ? <LogoutButton /> : null}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
