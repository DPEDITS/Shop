import React, { useState, useEffect, useRef } from "react";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [compassRotation, setCompassRotation] = useState(0);
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const mousePos = useRef({ x: null, y: null });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const handleOrientation = (event) => {
      let alpha = event.alpha;
      if (alpha == null) return;

      const orientation = window.screen.orientation?.angle ?? window.orientation ?? 0;
      let compassHeading;
      switch (orientation) {
        case 0:
          compassHeading = alpha;
          break;
        case 90:
          compassHeading = alpha - 90;
          break;
        case 180:
          compassHeading = alpha - 180;
          break;
        case -90:
        case 270:
          compassHeading = alpha - 270;
          break;
        default:
          compassHeading = alpha;
      }
      if (compassHeading < 0) compassHeading += 360;
      if (compassHeading >= 360) compassHeading -= 360;

      setCompassRotation(360 - compassHeading);
    };

    const requestPermission = async () => {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        try {
          const response = await DeviceOrientationEvent.requestPermission();
          if (response === "granted") {
            window.addEventListener("deviceorientation", handleOrientation, true);
          }
        } catch (error) {
          console.error("Permission denied", error);
        }
      } else {
        window.addEventListener("deviceorientation", handleOrientation, true);
      }
    };

    requestPermission();
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [isMobile]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    const particlesCount = 80;
    const maxDistance = 150;

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = 2;
      }
      move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x <= 0 || this.x >= width) this.vx *= -1;
        if (this.y <= 0 || this.y >= height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0071e3";
        ctx.fill();
      }
    }

    const particles = Array.from({ length: particlesCount }, () => new Particle());

    const drawNetwork = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => p.draw());

      for (let i = 0; i < particlesCount; i++) {
        for (let j = i + 1; j < particlesCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDistance) {
            ctx.strokeStyle = `rgba(0,113,227,${(1 - dist / maxDistance) * 0.6})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      if (mousePos.current.x !== null && mousePos.current.y !== null) {
        particles.forEach((p) => {
          const dx = p.x - mousePos.current.x;
          const dy = p.y - mousePos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDistance) {
            ctx.strokeStyle = `rgba(255, 69, 0, ${(1 - dist / maxDistance) * 0.7})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mousePos.current.x, mousePos.current.y);
            ctx.stroke();
          }
        });
      }
    };

    const animate = () => {
      particles.forEach((p) => p.move());
      drawNetwork();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();
    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    mousePos.current.x = e.clientX - rect.left;
    mousePos.current.y = e.clientY - rect.top;
  };

  const handleMouseLeave = () => {
    mousePos.current.x = null;
    mousePos.current.y = null;
  };

  return (
    <>
      {/* Hero Section */}
      <div
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif',
          color: "white",
          background: "rgba(0, 0, 0, 0.39)",
          minHeight: isMobile ? "80vh" : "70vh",
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
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
              borderRadius: 50,
              pointerEvents: "none",
            }}
          />
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
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#005bb5")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0071e3")}
          >
            Buy Premium
          </button>
        </section>
      </div>

      {/* Compass Section (separate) */}
      {isMobile && (
        <div
          style={{
            marginTop: "10px",
            padding: "40px 0",
            background: "rgba(0, 0, 0, 0.39)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50px",
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              background: "rgba(255,255,255,0.05)",
              borderRadius: "50%",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 20px rgba(0,123,255,0.4)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "transform 0.3s ease-out",
              transform: `rotate(${compassRotation}deg)`,
            }}
          >
            <svg width="90" height="90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" stroke="#0071e3" strokeWidth="4" fill="none" />
              <polygon points="50,10 54,50 46,50" fill="#ff4d4d" />
              <polygon points="50,90 54,50 46,50" fill="#ffffff" />
              <circle cx="50" cy="50" r="4" fill="#fff" />
              <text x="50" y="20" textAnchor="middle" fontSize="10" fill="#ffffff" fontWeight="bold">N</text>
              <text x="50" y="95" textAnchor="middle" fontSize="10" fill="#ffffff" fontWeight="bold">S</text>
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
