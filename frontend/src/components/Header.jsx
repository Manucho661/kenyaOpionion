import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

function Header({ user }) {
  console.log(user);
  return (

    <header className="ko-header d-flex align-items-center justify-content-between">
      <div className="container d-flex align-items-center justify-content-between">
        <Link className="ko-brand text-dark" to="/">
          KenyaOpinion
        </Link>

        <div className="d-flex gap-2">
          {
            user ? (
              <>
                
                 <Link to="/" className="btn">
                  {user}
                </Link>
                <Link to="/login" className="btn ko-btn-outline">
                  Logout
                </Link>
              </>

            ) : (
              <>
                <Link to="/login" className="btn ko-btn-outline text-dark">
                  Login
                </Link>
                <Link to="/register" className="btn ko-btn-primary">
                  Register
                </Link>
              </>

            )
          }

        </div>
      </div>
    </header>

  );
}

export default Header;
