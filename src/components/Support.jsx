import React, { useState } from "react";

const helpTopics = [
  {
    title: "Support On Using Geo-Tools",
    description: "Get help with Tools",
    icon: "📱",
  },
  {
    title: "Geo-Tools ID & Password",
    description: "Manage your Geo-Tools ID, passwords, and security.",
    icon: "🔐",
  },
  {
    title: "Billing & Subscriptions",
    description: "Questions about your purchases and subscriptions.",
    icon: "💳",
  },
  {
    title: "Developers",
    description: "Provide Fundings For Development Of Website",
    icon: "🛠️",
  },
];

const Support = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("message", form.message);
    formData.append("access_key", "788c55f7-9965-44ab-92da-b039b1ad9b61");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        setForm({ name: "", email: "", message: "" });
        setSubmitted(true);
      } else {
        setResult(data.message || "Something went wrong!");
        console.error("Web3Forms error:", data);
      }
    } catch (error) {
      setResult("Submission failed. Try again.");
      console.error("Fetch error:", error);
    }
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = "#0071e3";
    e.target.style.boxShadow = "0 0 0 3px rgba(0,113,227,0.3)";
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = "#d2d2d7";
    e.target.style.boxShadow = "inset 0 1px 2px rgb(0 0 0 / 0.1)";
  };

  return (
    <main
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
        padding: "3rem 2rem",
        maxWidth: 980,
        margin: "auto",
        color: "#1d1d1f",
        minHeight: "100vh",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 style={{ fontWeight: 600, fontSize: "3rem", marginBottom: "0.5rem", color: "grey" }}>
          How can we help you?
        </h1>
        <p style={{ color: "#6e6e73", fontSize: "1.25rem", maxWidth: 480, margin: "auto" }}>
          Find answers, contact Apple Support, or get help with your products and services.
        </p>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "2.5rem",
          marginBottom: "5rem",
        }}
      >
        {helpTopics.map(({ title, description, icon }) => (
          <article
            key={title}
            tabIndex={0}
            style={{
              backgroundColor: "#fff",
              padding: "2rem 2.5rem",
              borderRadius: 16,
              boxShadow: "0 8px 15px rgba(0, 0, 0, 0.07), 0 2px 6px rgba(0, 0, 0, 0.04)",
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 15px 25px rgba(0, 0, 0, 0.12), 0 5px 10px rgba(0, 0, 0, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 15px rgba(0, 0, 0, 0.07), 0 2px 6px rgba(0, 0, 0, 0.04)";
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = "2px solid #0071e3";
              e.currentTarget.style.outlineOffset = "4px";
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = "none";
              e.currentTarget.style.outlineOffset = "0";
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1.25rem" }}>{icon}</div>
            <h3 style={{ fontWeight: 700, marginBottom: "0.75rem", fontSize: "1.5rem" }}>{title}</h3>
            <p style={{ color: "#6e6e73", fontSize: "1.125rem", lineHeight: 1.5 }}>{description}</p>
          </article>
        ))}
      </section>

      <section
        style={{
          backgroundColor: "#fff",
          padding: "3rem 3.5rem",
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          maxWidth: 600,
          margin: "auto",
        }}
      >
        <h2
          style={{
            fontWeight: 700,
            fontSize: "2rem",
            marginBottom: "2rem",
            textAlign: "center",
            color: "#1d1d1f",
          }}
        >
          Contact Developer
        </h2>

        {result &&(
          <p
            role="alert"
            style={{
              backgroundColor: "#dff6dd",
              color: "#1d7a17",
              padding: "1.25rem 1rem",
              borderRadius: 8,
              marginBottom: "1.75rem",
              textAlign: "center",
              fontWeight: 700,
            }}
          >{result}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {["name", "email", "message"].map((field) => (
            <div key={field} style={{ marginBottom: field === "message" ? "2rem" : "1.75rem" }}>
              <label
                htmlFor={field}
                style={{ display: "block", fontWeight: 600, marginBottom: 8 }}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field === "message" ? (
                <textarea
                  id={field}
                  name={field}
                  rows={5}
                  placeholder="How can we assist you?"
                  value={form[field]}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                  style={inputStyle}
                />
              ) : (
                <input
                  id={field}
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  placeholder={field === "email" ? "your.email@example.com" : "Your Name"}
                  value={form[field]}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                  style={inputStyle}
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#005bb5";
              e.target.style.boxShadow = "0 8px 20px rgba(0, 91, 181, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#0071e3";
              e.target.style.boxShadow = "0 5px 15px rgba(0, 113, 227, 0.4)";
            }}
            style={{
              width: "100%",
              padding: "0.9rem 1.25rem",
              fontSize: "1.1rem",
              borderRadius: 16,
              border: "1.5px solid #d2d2d7",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
              color: "#fff",
              backgroundColor: "#0071e3",
              fontWeight: 600,
              cursor: "pointer",
              transition: "border-color 0.25s ease, box-shadow 0.25s ease",
            }}
          >
            Submit
          </button>

        </form>
      </section>
    </main>
  );
};

const inputStyle = {
  width: "100%",
  padding: "0.9rem 1.25rem",
  fontSize: "1.1rem",
  borderRadius: 16,
  border: "1.5px solid #d2d2d7",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  color: "#1d1d1f",
  boxShadow: "inset 0 1px 2px rgb(0 0 0 / 0.1)",
  outlineOffset: "3px",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
  resize: "vertical",
};

export default Support;
