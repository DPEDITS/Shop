import React, { useState, useEffect } from "react";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [gradientStyle, setGradientStyle] = useState({ opacity: 0 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setGradientStyle({
      opacity: 1,
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(0, 123, 255, 0.6), transparent 150px)`,
      transition: "background 0.2s, opacity 0.5s",
    });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setGradientStyle({
      opacity: 0,
      transition: "opacity 1s",
    });
  };

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif',
        color: "white",
        background: "rgba(0, 0, 0, 0.39)",
        minHeight: "100vh",
        borderRadius: 50,
        marginTop: 10,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <section
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 20px",
          userSelect: "none",
          position: "relative",
          borderRadius: 50,
          overflow: "hidden",
          background: "rgba(0, 0, 0, 0.39)",
        }}
      >
        {/* Desktop Mouse Gradient Effect */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              ...gradientStyle,
            }}
          />
        )}

        {/* Mobile Drifting Blobs */}
        {isMobile && (
          <>
            <div className="blob blob1" />
            <div className="blob blob2" />
            <div className="blob blob3" />
          </>
        )}

        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            textShadow: "0 2px 8px rgba(0,0,0,0.7)",
            marginBottom: 20,
            position: "relative",
            zIndex: 1,
          }}
        >
          Welcome to Geo-Tools
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            fontWeight: "400",
            maxWidth: 600,
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            position: "relative",
            zIndex: 1,
          }}
        >
          Discover the latest technology and accessories from Geo-Tools
        </p>
        <button
          style={{
            marginTop: 30,
            padding: "12px 30px",
            fontSize: "1rem",
            fontWeight: "600",
            borderRadius: 30,
            border: "none",
            backgroundColor: "#0071e3",
            color: "white",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            userSelect: "none",
            position: "relative",
            zIndex: 1,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#005bb5")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#0071e3")
          }
        >
          Buy Premium
        </button>

        <style>{`
          .blob {
            position: absolute;
            border-radius: 50%;
            opacity: 0.6;
            filter: blur(60px);
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }

          .blob1 {
            width: 150px;
            height: 150px;
            background: #0071e3;
            top: 10%;
            left: 15%;
            animation-name: drift1;
            animation-duration: 12s;
          }

          .blob2 {
            width: 200px;
            height: 200px;
            background: #00c6ff;
            top: 50%;
            left: 65%;
            animation-name: drift2;
            animation-duration: 15s;
          }

          .blob3 {
            width: 120px;
            height: 120px;
            background: #005bb5;
            top: 75%;
            left: 30%;
            animation-name: drift3;
            animation-duration: 10s;
          }

          @keyframes drift1 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(20px, 30px); }
          }

          @keyframes drift2 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-25px, 20px); }
          }

          @keyframes drift3 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(15px, -20px); }
          }
        `}</style>
      </section>
    </div>
  );
};

export default Home;
