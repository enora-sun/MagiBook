import React from "react";
import title from "../images/logo-MagiStory.png";
import logo from "../images/logo-book.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";

export default function Login() {
  return (
    <div className="login-wrapper">
      <div className="login-title">
        <img src={title} alt="MagiStory Logo" className="logo-title" />
      </div>
      <div className="login-title-image">
        <img src={logo} alt="Book Logo" className="logo-book" />
      </div>
      <div className="login-buttons">
        <button className="login-button facebook">
          <FontAwesomeIcon icon={faFacebook} /><span className="spacing"></span> Continue with Facebook
        </button>
        <button className="login-button google">
          <FontAwesomeIcon icon={faGoogle} /><span className="spacing"></span>  Continue with Google
        </button>
        <button className="login-button apple">
          <FontAwesomeIcon icon={faApple} /><span className="spacing"></span>  Continue with Apple
        </button>
      </div>
    </div>
  );
}