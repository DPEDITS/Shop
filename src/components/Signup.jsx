import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [gradientStyle, setGradientStyle] = useState({ opacity: 0 });
  const [showPassword, setShowPassword] = useState(false);

  const isMobile = windowWidth < 480;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setGradientStyle({
      opacity: 1,
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(0, 123, 255, 0.5), transparent 150px)`,
      transition: "background 0.2s, opacity 0.5s",
      pointerEvents: "none",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: 50,
      zIndex: 0,
    });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setGradientStyle(prev => ({
      ...prev,
      opacity: 0,
      transition: "opacity 1s",
    }));
  };
  const API_URL = import.meta.env.VITE_API_URL;

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.name || !formData.email || !formData.password) {
    setError("Please fill in all fields.");
    return;
  }
  setError("");

  try {
    const res = await axios.post(`${API_URL}/api/auth/register`, {
      fullName: formData.name,
      email: formData.email,
      password: formData.password,
    });

    // Save token and user info
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    navigate("/");
  } catch (err) {
    setError(
      err.response?.data?.msg || "Registration failed. Try again."
    );
  }
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formWidth = isMobile ? "90vw" : 360;
  const formPadding = isMobile ? "2rem 1.5rem" : "3rem 2.5rem";

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        minHeight: "85vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        marginTop: 10,
        position: "relative",
        background: "black",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif',
        padding: "1rem",
        overflow: "hidden",
      }}
    >
      <div style={gradientStyle} />

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: formPadding,
          borderRadius: 24,
          width: formWidth,
          maxWidth: 400,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h1 style={{ fontWeight: 600, fontSize: 32, marginBottom: 24, color: "#1d1d1f" }}>
          Sign Up
        </h1>

        {error && (
          <p style={{ color: "#ff3b30", marginBottom: 20, fontWeight: 500, fontSize: 14 }}>
            {error}
          </p>
        )}

        <label htmlFor="name" style={labelStyle}>
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#0071e3")}
          onBlur={(e) => (e.target.style.borderColor = "#d2d2d7")}
          required
          autoComplete="name"
        />

        <label htmlFor="email" style={labelStyle}>
          Email Id
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@example.com"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#0071e3")}
          onBlur={(e) => (e.target.style.borderColor = "#d2d2d7")}
          required
          autoComplete="email"
        />

        <label htmlFor="password" style={labelStyle}>
          Password
        </label>
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            style={{ ...inputStyle, paddingRight: "44px" }}
            onFocus={(e) => (e.target.style.borderColor = "#0071e3")}
            onBlur={(e) => (e.target.style.borderColor = "#d2d2d7")}
            required
            autoComplete="new-password"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: "absolute",
              top: "34%",
              right: "14px",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "20px",
              color: "#555",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "24px",
              height: "24px",
              lineHeight: 1,
            }}
            title={showPassword ? "Hide password" : "Show password"}
          >
            <span
              key={showPassword ? "hide" : "show"}
              style={{
                opacity: 1,
                animation: "fadeIcon 0.3s ease-in-out",
                display: "inline-block",
                lineHeight: 1,
                verticalAlign: "middle",
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </span>
        </div>

        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#005bb5")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0071e3")}
        >
          Register
        </button>

        <p style={{ marginTop: 24, fontSize: 13, color: "#6e6e73" }}>
          Already have an Account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "#0071e3",
              textDecoration: "none",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Log In
          </span>
        </p>
      </form>
    </div>
  );
};

// Reusable styles (same as Login)
const labelStyle = {
  display: "block",
  textAlign: "left",
  marginBottom: 8,
  fontWeight: 600,
  fontSize: 14,
  color: "black",
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  marginBottom: 24,
  fontSize: 16,
  borderRadius: 12,
  border: "1.5px solid #d2d2d7",
  outline: "none",
  transition: "border-color 0.3s ease",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "14px 0",
  backgroundColor: "#0071e3",
  color: "white",
  fontWeight: 700,
  fontSize: 17,
  borderRadius: 12,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 8px 15px rgba(0, 113, 227, 0.3)",
  transition: "background-color 0.3s ease",
};

export default Signup;
