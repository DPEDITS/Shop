import React, { useState, useEffect } from "react";

const plans = [
  {
    name: "Individual",
    monthly: 50,
    yearly: 540, // 10% discount yearly
    description: "1 user, access to all features",
    features: ["Feature A", "Feature B", "Feature C", "Feature D"],
  },
  {
    name: "Geo-Company",
    monthly: 40,
    yearly: 432,
    description: "Up to 6 users, shared access",
    features: ["Feature A", "Feature B", "Feature C", "Feature D"],
  },
  {
    name: "Student",
    monthly: 30,
    yearly: 324,
    description: "Discounted plan for students",
    features: ["Feature A", "Feature B", "Feature C", "Feature D"],
  },
];

const Subscription = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [btnHoverIndex, setBtnHoverIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [gradientStyle, setGradientStyle] = useState({ opacity: 0 });

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

  const styles = {
    backgroundContainer: {
      minHeight: "100vh",
      background: "black",
      borderRadius: 50,
      marginTop: 10,
      position: "relative",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif',
      padding: "1rem",
      overflow: "hidden",
    },
    subscriptionContainer: {
      maxWidth: 900,
      margin: "0 auto",
      padding: "3rem 1rem",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      color: "#fff",
      textAlign: "center",
      position: "relative",
      zIndex: 1,
    },
    title: {
      fontSize: "3.2rem",
      fontWeight: 600,
      marginBottom: "0.3rem",
      letterSpacing: "0.03em",
      color: "#0071e3",
    },
    subtitle: {
      fontSize: "1.3rem",
      color: "#b0b0b0",
      marginBottom: "2.5rem",
      fontWeight: 400,
    },
    toggleContainer: {
      marginBottom: "2rem",
      display: "inline-flex",
      borderRadius: "20px",
      background: "rgba(229, 229, 231, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      overflow: "hidden",
      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.3)",
      userSelect: "none",
    },
    toggleBtn: (active) => ({
      padding: "0.6rem 1.5rem",
      cursor: "pointer",
      fontWeight: active ? "700" : "400",
      color: active ? "#0071e3" : "#ccc",
      backgroundColor: active ? "rgba(255, 255, 255, 0.9)" : "transparent",
      borderRadius: "20px",
      transition: "all 0.3s ease",
      border: "none",
      outline: "none",
      fontSize: "1rem",
      boxShadow: active ? "0 2px 8px rgba(0, 113, 227, 0.3)" : "none",
    }),
    plans: {
      display: "flex",
      gap: "2rem",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    planCard: {
      background: "rgba(255, 255, 255, 0.95)",
      borderRadius: 18,
      boxShadow: "0 15px 30px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.1)",
      padding: "2.5rem 2rem 3rem",
      flex: "1 1 280px",
      maxWidth: 320,
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.35s ease, box-shadow 0.35s ease",
      cursor: "pointer",
      position: "relative",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    planCardHover: {
      transform: "translateY(-12px) scale(1.03)",
      boxShadow: "0 30px 60px rgba(0,0,0,0.3), 0 10px 20px rgba(0,113,227,0.2)",
    },
    saveBadge: {
      position: "absolute",
      top: 12,
      right: 16,
      backgroundColor: "#0071e3",
      color: "white",
      fontSize: "0.75rem",
      fontWeight: 700,
      padding: "0.25rem 0.7rem",
      borderRadius: "12px",
      userSelect: "none",
      letterSpacing: "0.05em",
    },
    planName: {
      fontSize: "1.75rem",
      fontWeight: 700,
      marginBottom: "0.5rem",
      color: "#222",
    },
    price: {
      fontSize: "2.3rem",
      fontWeight: 700,
      margin: "0.2rem 0 0.8rem",
      color: "#0071e3",
    },
    priceSuffix: {
      fontWeight: 400,
      fontSize: "1rem",
      color: "#555",
    },
    description: {
      color: "#666",
      marginBottom: "1.5rem",
      fontSize: "1rem",
      minHeight: 50,
      lineHeight: 1.3,
    },
    featuresList: {
      textAlign: "left",
      marginBottom: "2rem",
      fontSize: "1rem",
      color: "#444",
      listStyle: "none",
      padding: 0,
    },
    featureItem: {
      marginBottom: "0.7rem",
      fontWeight: 500,
      borderBottom: "1px solid #eee",
      paddingBottom: "0.4rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    bulletPoint: {
      width: "6px",
      height: "6px",
      backgroundColor: "#0071e3",
      borderRadius: "50%",
      flexShrink: 0,
    },
    crossIcon: {
      color: "#e74c3c",
      fontSize: "14px",
      fontWeight: "bold",
      flexShrink: 0,
      width: "14px",
      textAlign: "center",
    },
    subscribeBtn: (hovered) => ({
      backgroundColor: hovered ? "#005bb5" : "#0071e3",
      color: "white",
      fontWeight: 600,
      border: "none",
      borderRadius: 12,
      padding: "0.85rem 1.25rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease, box-shadow 0.3s ease",
      fontSize: "1.1rem",
      boxShadow: hovered
        ? "0 6px 14px rgba(0, 91, 181, 0.7)"
        : "0 4px 8px rgba(0, 113, 227, 0.4)",
    }),
  };

  const renderFeatureIcon = (planName, feature) => {
    if (planName === "Student" && (feature === "Feature C" || feature === "Feature D")) {
      return <span style={styles.crossIcon}>×</span>;
    }
    return <div style={styles.bulletPoint}></div>;
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={styles.backgroundContainer}
    >
      <div style={gradientStyle} />
      
      <div style={styles.subscriptionContainer}>
        <h1 style={styles.title}>Choose Your Plan</h1>
        <p style={styles.subtitle}>
          Select the subscription plan that fits your needs.
        </p>

        <div style={styles.toggleContainer}>
          <button
            style={styles.toggleBtn(billingPeriod === "monthly")}
            onClick={() => setBillingPeriod("monthly")}
            aria-pressed={billingPeriod === "monthly"}
          >
            Monthly
          </button>
          <button
            style={styles.toggleBtn(billingPeriod === "yearly")}
            onClick={() => setBillingPeriod("yearly")}
            aria-pressed={billingPeriod === "yearly"}
          >
            Yearly
          </button>
        </div>

        <div style={styles.plans}>
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              style={{
                ...styles.planCard,
                ...(hoveredIndex === index ? styles.planCardHover : {}),
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {billingPeriod === "yearly" && (
                <div style={styles.saveBadge}>Save 10%</div>
              )}
              <div style={styles.planName}>{plan.name}</div>
              <div style={styles.price}>
                ₹{billingPeriod === "monthly" ? plan.monthly : plan.yearly}
                <span style={styles.priceSuffix}>
                  /{billingPeriod === "monthly" ? "month" : "year"}
                </span>
              </div>
              <div style={styles.description}>{plan.description}</div>
              <ul style={styles.featuresList}>
                {plan.features.map((feature) => (
                  <li key={feature} style={styles.featureItem}>
                    {renderFeatureIcon(plan.name, feature)}
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                style={styles.subscribeBtn(btnHoverIndex === index)}
                onMouseEnter={() => setBtnHoverIndex(index)}
                onMouseLeave={() => setBtnHoverIndex(null)}
              >
                Subscribe
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function App() {
  return <Subscription />;
}

export default App;