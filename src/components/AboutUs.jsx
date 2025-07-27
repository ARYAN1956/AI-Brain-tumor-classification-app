import React from "react";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import AppNavbar from "../components/AppNavbar";

const AboutUs = () => {
  return (
    <>
      <AppNavbar />
      <div style={styles.pageWrapper}>
        <header style={styles.header}>
          <motion.h1
            style={styles.heading}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Welcome to <span style={{ color: "#FF6F61" }}>TumorDetect AI</span>
          </motion.h1>
          <ReactTyped
            strings={["AI-Powered Diagnosis", "3D MRI Scan Analysis", "Early Tumor Detection"]}
            typeSpeed={50}
            backSpeed={30}
            loop
            style={styles.typedText}
          />
        </header>

        <div style={styles.contentWrapper}>
          <div style={styles.mainContent}>
            <motion.p
              style={styles.intro}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              TumorDetect AI is a cutting-edge platform that leverages deep learning to assist in the early detection and diagnosis of brain tumors through MRI scan analysis. Our system is engineered for speed, precision, and clinical reliability.
            </motion.p>

            <div style={styles.timelineWrapper}>
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  style={styles.timelineItem}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div style={styles.timelineIcon}>{item.icon}</div>
                  <div>
                    <h3 style={styles.cardTitle}>{item.title}</h3>
                    <p style={styles.cardText}>{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          style={styles.credits}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h4>📍 Developed By:</h4>
          <p>SRM Institute of Science & Technology (KTR) — Final Year In-House Project Team</p>
          <p style={{ fontSize: "13px", color: "#777" }}>Project Guide: Dr. A. Sharma | Team: Aryan & Co.</p>
          <a
            href="https://docs.google.com/document/d/1aTD5hqJCHgYGkptZstw-DnYLAawGpcAr/edit?usp=sharing&ouid=100919272392595438158&rtpof=true&sd=true"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.button}
          >
            📄 View Project Report
          </a>
        </motion.div>
      </div>
    </>
  );
};

const timeline = [
  {
    title: "Our Mission",
    text: "To empower radiologists with intelligent tools for faster, more reliable brain tumor diagnosis.",
    icon: "🎯",
  },
  {
    title: "Innovative Technology",
    text: "We use Attention U-Net++, BiLSTM, and ensemble learning in IntelliCrux-Net++ for top-tier accuracy.",
    icon: "🧠",
  },
  {
    title: "Real-Time Insights",
    text: "Our models predict brain tumor types instantly with high confidence on a user-friendly dashboard.",
    icon: "⚡",
  },
  {
    title: "Secure Patient Data",
    text: "We prioritize HIPAA-compliant, encrypted data handling to ensure patient confidentiality.",
    icon: "🔒",
  },
  {
    title: "Accessible Interface",
    text: "Clean UI, mobile-friendly, and cross-browser compatible for seamless clinical adoption.",
    icon: "📱",
  }
];

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    background: "#f4f4f4",
    padding: "4rem 1.5rem",
    fontFamily: "'Segoe UI', sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  heading: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#222",
    marginBottom: "1rem",
  },
  typedText: {
    fontSize: "1.3rem",
    color: "#333",
    marginBottom: "2.5rem",
    fontWeight: "500",
  },
  contentWrapper: {
    display: "flex",
    justifyContent: "space-between",
    gap: "2rem",
  },
  mainContent: {
    flex: 3,
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
  },
  intro: {
    fontSize: "1.1rem",
    color: "#444",
    lineHeight: "1.6",
    marginBottom: "2rem",
  },
  timelineWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
  timelineItem: {
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start",
    padding: "1.2rem",
    borderRadius: "12px",
    background: "#f9fbff",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  },
  timelineIcon: {
    fontSize: "2rem",
    color: "#000053",
  },
  cardTitle: {
    fontSize: "1.4rem",
    marginBottom: "0.6rem",
    color: "#000053",
  },
  cardText: {
    fontSize: "15px",
    color: "#333",
    lineHeight: "1.6",
  },
  credits: {
    marginTop: "4rem",
    paddingTop: "1.5rem",
    borderTop: "1px solid #ddd",
    textAlign: "center",
    fontSize: "15px",
    color: "#444",
  },
  button: {
    display: "inline-block",
    marginTop: "1.2rem",
    padding: "0.8rem 1.6rem",
    backgroundColor: "#000053",
    color: "#fff",
    fontWeight: "600",
    borderRadius: "10px",
    textDecoration: "none",
    boxShadow: "0 6px 16px rgba(0,0,83,0.25)",
    transition: "all 0.3s ease-in-out",
  },
};

export default AboutUs;
