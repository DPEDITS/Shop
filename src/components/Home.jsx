import React, { useState, useEffect, useRef } from "react";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [compassRotation, setCompassRotation] = useState(0);
  const [rockHammerRotation, setRockHammerRotation] = useState(0);
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const mousePos = useRef({ x: null, y: null });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Device Orientation Compass Logic (only on mobile)
  useEffect(() => {
    if (!isMobile) return;

    const handleOrientation = (event) => {
      const alpha = event.alpha;
      if (alpha != null) {
        setCompassRotation(360 - alpha);
      }
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
          console.error("Device orientation permission denied", error);
        }
      } else {
        window.addEventListener("deviceorientation", handleOrientation, true);
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [isMobile]);

  // Particle Network for ALL screens
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

    const particles = [];
    for (let i = 0; i < particlesCount; i++) {
      particles.push(new Particle());
    }

    const drawNetwork = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => p.draw());

      for (let i = 0; i < particlesCount; i++) {
        for (let j = i + 1; j < particlesCount; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = 1 - dist / maxDistance;
            ctx.strokeStyle = `rgba(0, 113, 227, ${alpha * 0.6})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
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
            const alpha = 1 - dist / maxDistance;
            ctx.strokeStyle = `rgba(255, 69, 0, ${alpha * 0.7})`;
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

  // Handle mouse move on rock hammer (desktop)
  const rockHammerRef = useRef(null);
  const handleRockHammerMouseMove = (e) => {
    if (isMobile) return;
    const rect = rockHammerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    setRockHammerRotation(angle);
  };

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mousePos.current.x = e.clientX - rect.left;
    mousePos.current.y = e.clientY - rect.top;
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
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
          onMouseMove={(e) => {
            handleMouseMove(e);
            if (!isMobile) handleRockHammerMouseMove(e);
          }}
          onMouseLeave={() => {
            handleMouseLeave();
            setRockHammerRotation(0);
          }}
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
          {/* Canvas rendered on both desktop and mobile */}
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
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#005bb5")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#0071e3")
            }
          >
            Buy Premium
          </button>
        </section>

        {isMobile?(<div
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
          {/* Show compass on mobile, else show rock hammer on desktop */}
          {isMobile ? (
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
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  stroke="#0071e3"
                  strokeWidth="4"
                  fill="none"
                />
                <polygon
                  points="50,10 54,50 46,50"
                  fill="#ff4d4d"
                  style={{ transition: "all 0.3s ease" }}
                />
                <polygon
                  points="50,90 54,50 46,50"
                  fill="#ffffff"
                  style={{ transition: "all 0.3s ease" }}
                />
                <circle cx="50" cy="50" r="4" fill="#fff" />
                <text
                  x="50"
                  y="20"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#ffffff"
                  fontWeight="bold"
                >
                  N
                </text>
                <text
                  x="50"
                  y="95"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#ffffff"
                  fontWeight="bold"
                >
                  S
                </text>
              </svg>
            </div>
          ) : (null
          )}
        </div>):(null)}
      </div>

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

        .glowing-circle {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: linear-gradient(270deg, #0071e3, #00c6ff, #005bb5);
          background-size: 600% 600%;
          animation: gradientGlow 8s ease infinite;
          box-shadow: 0 0 30px #0071e3, 0 0 60px #00c6ff, 0 0 90px #005bb5;
          filter: drop-shadow(0 0 10px #0071e3);
        }

        @keyframes gradientGlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
};

export default Home;
