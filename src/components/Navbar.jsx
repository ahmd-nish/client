/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();


  const logout = () => {
      navigate(`/`);
      localStorage.removeItem("token");
      localStorage.removeItem("accountType");
      localStorage.removeItem("username");
      
  }

  const login = () => {
    navigate(`/`);    
}

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  useEffect(() => {

      try{
        const token = localStorage.getItem('token');
        if (token !== null ) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      }catch(err){
        console.log(err);
      }
      
  }, []);

  return (
    <>
    {auth ? <>
    <header className="Header">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Android_O_Preview_Logo.png/1024px-Android_O_Preview_Logo.png" className="Logo" alt="logo" />
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          
          <button onClick={()=>logout()}>Logout</button>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        🍔
      </button>
    </header>
    </>: <>
    <header className="Header">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Android_O_Preview_Logo.png/1024px-Android_O_Preview_Logo.png" className="Logo" alt="logo" />
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          
          <button onClick={()=>login()}>Login</button>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        🍔
      </button>
    </header>
    
    </>}
    </>
  );
}
