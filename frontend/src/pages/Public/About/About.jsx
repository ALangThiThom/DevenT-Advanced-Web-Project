import NavBar from "../../../components/Layout/NavBar/NavBar";

const values = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    name: "Community",
    desc: "We prioritize collective growth and human connection above all else, ensuring every voice in the ecosystem feels heard and valued.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
      </svg>
    ),
    name: "Innovation",
    desc: "We relentlessly pursue modern solutions to age-old organizational challenges, pushing the boundaries of what an event platform can achieve.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    name: "Professionalism",
    desc: "Reliability and precision are our hallmarks. We provide institutional-grade tools with a sophisticated, intuitive user experience.",
  },
];

const stats = [
  { number: "500k+", label: "Global Users" },
  { number: "12k+", label: "Events Hosted" },
  { number: "45+", label: "Countries" },
  { number: "99.9%", label: "Uptime Rate" },
];

export default function About() {
  return (
    <div style={{ background: "var(--color-background-primary)", minHeight: "100vh" }}>
      <NavBar />

      <section
        style={{
          background: "#0b4a3a",
          padding: "5rem 2rem 4rem",
          textAlign: "center",
          position: "relative",
        }}
      >

        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            color: "#e8f5f1",
            lineHeight: 1.2,
            margin: "0 auto 1.25rem",
            maxWidth: 640,
            fontWeight: 400,
          }}
        >
          Connecting communities through{" "}
          <em style={{ fontStyle: "italic", color: "#5dcaa5" }}>
            live experiences
          </em>
        </h1>

        <p
          style={{
            fontSize: 16,
            color: "#9fdbca",
            maxWidth: 520,
            margin: "0 auto",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          We believe the most meaningful connections happen in person. Our
          platform is dedicated to bridging the gap between organizers and
          attendees to foster lasting community bonds.
        </p>

        <div
          style={{
            position: "absolute",
            bottom: -1,
            left: 0,
            right: 0,
            height: 48,
            background: "var(--color-background-primary)",
            clipPath: "ellipse(55% 100% at 50% 100%)",
          }}
        />
      </section>

      <section
        style={{
          padding: "4rem 2rem",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        <p
          style={{
            fontSize: 12,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#0b4a3a",
            fontWeight: 500,
            marginBottom: "0.5rem",
          }}
        >
          Our Story
        </p>
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            margin: "0 0 1.5rem",
            lineHeight: 1.3,
            fontWeight: 400,
          }}
        >
          Where it all began
        </h2>
        <div
          style={{
            fontSize: 15,
            lineHeight: 1.8,
            color: "var(--color-text-secondary)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <p style={{ margin: 0 }}>
            Founded in 2021, DevenT began with a simple observation: despite
            living in a hyper-connected digital age, people were feeling more
            isolated than ever. We saw an opportunity to use technology not to
            replace human interaction, but to facilitate it.
          </p>
          <p style={{ margin: 0 }}>
            What started as a small tool for local community organizers has
            evolved into a comprehensive event management ecosystem. We've spent
            years refining our interface to prioritize the ease of gathering,
            ensuring that the focus remains on the experience itself rather than
            the logistics.
          </p>
          <p style={{ margin: 0 }}>
            Today, DevenT powers thousands of events monthly, from intimate
            workshops to large-scale festivals, always maintaining our
            commitment to organic, professional, and reliable community
            building.
          </p>
        </div>
      </section>

      <div
        style={{
          height: "0.5px",
          background: "var(--color-border-tertiary)",
          margin: "0 2rem",
        }}
      />

      <section
        style={{
          padding: "4rem 2rem",
          background: "var(--color-background-secondary)",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p
              style={{
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#0b4a3a",
                fontWeight: 500,
                marginBottom: "0.5rem",
              }}
            >
              The Values We Live By
            </p>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                margin: "0 0 0.5rem",
                fontWeight: 400,
              }}
            >
              What drives every decision
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "var(--color-text-secondary)",
                maxWidth: 420,
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Built on a foundation of trust and innovation, our core values
              guide every feature we build and every community we support.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
            }}
          >
            {values.map((v) => (
              <div
                key={v.name}
                style={{
                  background: "var(--color-background-primary)",
                  border: "1px solid #d1e8e2",
                  borderRadius: 12,
                  padding: "1.5rem 1.25rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "#e1f5ee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem",
                    fontSize: 20,
                    color: "#0b4a3a",
                  }}
                >
                {v.icon}
                </div>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    margin: "0 0 0.5rem",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {v.name}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#0b4a3a", padding: "3rem 2rem" }}>
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                textAlign: "center",
                padding: "1rem",
                borderLeft: i > 0 ? "0.5px solid #1f6b5a" : "none",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "2rem",
                  color: "#e8f5f1",
                  display: "block",
                  marginBottom: 4,
                  fontWeight: 400,
                }}
              >
                {s.number}
              </span>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#9fdbca",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}