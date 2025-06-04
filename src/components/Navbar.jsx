import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // Apply saved theme on load
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    const storedUser = localStorage.getItem("FormData");
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        if (userObj.name) setUsername(userObj.name);
        else setUsername(null);
      } catch {
        setUsername(null);
      }
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light-mode");
      setIsDarkMode(false);
    } else {
      document.body.classList.add("dark-mode");
      setIsDarkMode(true);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTheme = () => {
    const isDark = !isDarkMode;
    setIsDarkMode(isDark);
    document.body.classList.toggle("dark-mode", isDark);
    document.body.classList.toggle("light-mode", !isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const navLinks = [
    { name: "DipCalculator" },
    { name: "StrikeCalculator" },
    { name: "Merchandise" },
    { name: "Support", route:"/support" },
    ...(username
      ? [{ name: `Hii ${username}` }]
      : [{ name: "LogIn", route: "/login" }]),
  ];

  const handleLinkClick = (link) => {
    if (link.route) navigate(link.route);
    setMenuOpen(false);
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        width: "100%",
        background: "rgba(0, 0, 0, 0.39)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "0 1px 10px rgba(232, 0, 0, 0.1)",
        borderRadius: 50,
        zIndex: 9999,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif',
        userSelect: "none",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              fontSize: 28,
              cursor: "pointer",
              color: "#fff",
              padding: 0,
              marginRight: 20,
            }}
          >
            {menuOpen ? (
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        )}

        {/* Logo */}
        <div
          style={{
            fontWeight: "600",
            fontSize: 20,
            letterSpacing: "-0.04em",
            color: "white",
            flexGrow: isMobile ? 1 : 0,
            textAlign: isMobile ? "center" : "left",
            fontFamily: "'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          }}
        >
          Geo-Tools
        </div>

        {/* Desktop Nav Links */}
        {!isMobile && (
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              gap: 30,
              marginLeft: 40,
              marginRight: 40,
              padding: 0,
              fontWeight: 500,
              fontSize: 15,
              color: "white",
              userSelect: "none",
            }}
          >
            {navLinks.map((link) => (
              <li
                key={link.name}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  paddingBottom: 6,
                  borderBottom: "2px solid transparent",
                  transition: "border-color 0.3s ease, color 0.3s ease",
                }}
                onClick={() => handleLinkClick(link)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottomColor = "#0071e3";
                  e.currentTarget.style.color = "#0071e3";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottomColor = "transparent";
                  e.currentTarget.style.color = "white";
                }}
              >
                {link.name}
              </li>
            ))}
          </ul>
        )}

        {/* Search Icon + Theme Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          {!isMobile && (
            <button
              aria-label="Search"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "white",
                fontSize: 20,
                padding: 0,
                userSelect: "none",
              }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          )}

          {/* Theme Toggle Button */}
<div className="glass-toggle" onClick={toggleTheme}>
  <div className={`toggle-thumb ${isDarkMode ? "dark" : "light"}`}>
    {isDarkMode ? "🌙" : "☀️"}
  </div>
</div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <div
          style={{
            background: "rgba(0, 0, 0, 0.69)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            width: "89%",
            position: "absolute",
            top: 65,
            left: 0,
            zIndex: 999,
            padding: "20px 20px",
            borderRadius: 50,
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 18,
              fontWeight: 600,
              fontSize: 18,
              color: "white",
              userSelect: "none",
            }}
          >
            {navLinks.map((link) => (
              <li
                key={link.name}
                style={{ cursor: "pointer" }}
                onClick={() => handleLinkClick(link)}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0071e3")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
              >
                {link.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
