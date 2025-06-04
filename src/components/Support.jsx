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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
    };

    // Inline focus/blur handlers for inputs
    const handleFocus = (e) => {
        e.target.style.borderColor = "#0071e3";
        e.target.style.boxShadow = "0 0 0 3px rgba(0,113,227,0.3)";
    };
    const handleBlur = (e) => {
        e.target.style.borderColor = "#d2d2d7";
        e.target.style.boxShadow = "inset 0 1px 2px rgb(0 0 0 / 0.1)";
    };

    // Button hover handlers
    const handleButtonMouseEnter = (e) => {
        e.target.style.backgroundColor = "#005bb5";
        e.target.style.boxShadow = "0 8px 20px rgba(0, 91, 181, 0.6)";
    };
    const handleButtonMouseLeave = (e) => {
        e.target.style.backgroundColor = "#0071e3";
        e.target.style.boxShadow = "0 5px 15px rgba(0, 113, 227, 0.4)";
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
                <h1
                    style={{
                        fontWeight: 600,
                        fontSize: "3rem",
                        marginBottom: "0.5rem",
                        lineHeight: 1.1,
                        color: "white",
                    }}
                >
                    How can we help you?
                </h1>
                <p
                    style={{
                        color: "#6e6e73",
                        fontSize: "1.25rem",
                        maxWidth: 480,
                        margin: "auto",
                    }}
                >
                    Find answers, contact Apple Support, or get help with your products and
                    services.
                </p>
            </header>

            {/* Help topics in 2-column grid on large screens */}
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
                            boxShadow:
                                "0 8px 15px rgba(0, 0, 0, 0.07), 0 2px 6px rgba(0, 0, 0, 0.04)",
                            cursor: "pointer",
                            userSelect: "none",
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
                        <div
                            style={{
                                fontSize: "3rem",
                                marginBottom: "1.25rem",
                                userSelect: "none",
                            }}
                            aria-hidden="true"
                        >
                            {icon}
                        </div>
                        <h3
                            style={{
                                fontWeight: 700,
                                marginBottom: "0.75rem",
                                fontSize: "1.5rem",
                                color: "#1d1d1f",
                            }}
                        >
                            {title}
                        </h3>
                        <p
                            style={{
                                color: "#6e6e73",
                                fontSize: "1.125rem",
                                lineHeight: 1.5,
                            }}
                        >
                            {description}
                        </p>
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

                {submitted && (
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
                    >
                        Thank you for reaching out! We'll get back to you shortly.
                    </p>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <label
                        htmlFor="name"
                        style={{ display: "block", fontWeight: 600, marginBottom: 8 }}
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                        style={{
                            width: "100%",
                            padding: "0.9rem 1.25rem",
                            marginBottom: "1.75rem",
                            fontSize: "1.1rem",
                            borderRadius: 16,
                            border: "1.5px solid #d2d2d7",
                            fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                            color: "#1d1d1f",
                            boxShadow: "inset 0 1px 2px rgb(0 0 0 / 0.1)",
                            outlineOffset: "3px",
                            transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                        }}
                    />

                    <label
                        htmlFor="email"
                        style={{ display: "block", fontWeight: 600, marginBottom: 8 }}
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={form.email}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                        style={{
                            width: "100%",
                            padding: "0.9rem 1.25rem",
                            marginBottom: "1.75rem",
                            fontSize: "1.1rem",
                            borderRadius: 16,
                            border: "1.5px solid #d2d2d7",
                            fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                            color: "#1d1d1f",
                            boxShadow: "inset 0 1px 2px rgb(0 0 0 / 0.1)",
                            outlineOffset: "3px",
                            transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                        }}
                    />

                    <label
                        htmlFor="message"
                        style={{ display: "block", fontWeight: 600, marginBottom: 8 }}
                    >
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="How can we assist you?"
                        value={form.message}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                        style={{
                            width: "100%",
                            padding: "0.9rem 1.25rem",
                            marginBottom: "2rem",
                            fontSize: "1.1rem",
                            borderRadius: 16,
                            border: "1.5px solid #d2d2d7",
                            fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                            color: "#1d1d1f",
                            boxShadow: "inset 0 1px 2px rgb(0 0 0 / 0.1)",
                            outlineOffset: "3px",
                            resize: "vertical",
                            transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                        }}
                    />

<button
  type="submit"
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#0071e3";
    e.target.style.boxShadow = "0 0 0 3px rgba(0,113,227,0.3)";
  }}
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#d2d2d7";
    e.target.style.boxShadow = "inset 0 1px 2px rgb(0 0 0 / 0.1)";
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
    boxShadow: "inset 0 1px 2px rgb(0 0 0 / 0.1)",
    outlineOffset: "3px",
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

export default Support;
