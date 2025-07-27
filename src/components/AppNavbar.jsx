import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AppNavbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav style={styles.navbar}>
      {/* Left Nav (Desktop only) */}
      {!isMobile && (
        <div style={styles.navSide}>
          <NavItem to="/" label="Home" />
          <NavItem to="/upload" label="Upload Scan" />
          <NavItem to="/result" label="Analysis" />
          <NavItem to="/history" label="Patient History" />
        </div>
      )}

      {/* Center Logo */}
      <div style={styles.center}>
        <img
          src={process.env.PUBLIC_URL + "/assets/logo.png"}
          alt="Logo"
          style={styles.logo}
        />
        <span style={styles.brand}>IntelliCrux-Net++: Smart AI Diagnosis Tool</span>
      </div>

      {/* Right Nav (Desktop only) */}
      {!isMobile && (
        <div style={styles.navSide}>
          <NavItem to="/about" label="About" />
          <NavItem to="/contact" label="Contact" />
          
        </div>
      )}

      {/* Hamburger Menu (Mobile only) */}
      {isMobile && (
        <div onClick={() => setMenuOpen(!menuOpen)} style={styles.menuBtn}>
          ☰
        </div>
      )}

      {/* Sidebar (Mobile only) */}
      {isMobile && menuOpen && (
        <div style={styles.sidebar}>
          <NavItem to="/" label="Home" onClick={() => setMenuOpen(false)} />
          <NavItem to="/upload" label="Upload Scan" onClick={() => setMenuOpen(false)} />
          <NavItem to="/result" label="Analysis" onClick={() => setMenuOpen(false)} />
          <NavItem to="/history" label="Patient History" onClick={() => setMenuOpen(false)} />
          <NavItem to="/about" label="About" onClick={() => setMenuOpen(false)} />
          <NavItem to="/contact" label="Contact" onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ to, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    style={styles.navItem}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = "#c7421dff";
      e.currentTarget.style.color = "#fff";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "#1a2b3d";
      e.currentTarget.style.color = "#ccc";
    }}
  >
    {label}
  </Link>
);

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.6rem 1.2rem",
    backgroundColor: "#000035",
    borderBottom: "1px solid #000021",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    flexWrap: "wrap",
  },
  navSide: {
    display: "flex",
    gap: "0.8rem",
    alignItems: "center",
    flexWrap: "wrap",
  },
  center: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    justifyContent: "center",
  },
  logo: {
    width: "37px",
    height: "37px",
    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))",
  },
  brand: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  navItem: {
    fontSize: "12.5px",
    textDecoration: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    color: "#ccc",
    backgroundColor: "#1a2b3d",
    transition: "all 0.2s ease-in-out",
    fontWeight: 500,
  },
  menuBtn: {
    fontSize: "1.6rem",
    cursor: "pointer",
    color: "#fff",
    marginLeft: "auto",
  },
  sidebar: {
    position: "absolute",
    top: "60px",
    right: "10px",
    backgroundColor: "#131f2f",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    zIndex: 9999,
    width: "70vw",
    animation: "slideIn 0.3s ease-in-out",
  },
};

export default AppNavbar;
