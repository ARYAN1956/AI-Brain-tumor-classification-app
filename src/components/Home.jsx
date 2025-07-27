import React from "react";
import { Link } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";

const featuresData = [
  {
    title: "AI Precision",
    description: "Leveraging cutting-edge deep learning, our model achieves exceptional accuracy in tumor detection.",
    points: [
      "Deep learning powered algorithms",
      "98.9% accuracy validated on diverse MRI scans",
      "Significantly reduces false positives and negatives",
    ],
  },
  {
    title: "Instant Analysis",
    description: "Get critical insights within seconds, accelerating diagnosis and treatment planning.",
    points: [
      "Comprehensive results in mere seconds",
      "Automated, detailed report generation",
      "Direct image-based diagnosis",
    ],
  },
  {
    title: "Comprehensive Reports",
    description: "Receive detailed, easy-to-understand reports with actionable insights and recommendations.",
    points: [
      "Full PDF export support for seamless sharing",
      "Includes clear, expert-level interpretations of findings",
      "Provides personalized follow-up recommendations",
    ],
  },
  {
    title: "Privacy First",
    description: "Your data remains secure with client-side processing, ensuring complete confidentiality.",
    points: [
      "No external data uploads; client-side processing",
      "Processing happens securely on your local device",
      "Designed with HIPAA-compliant principles",
    ],
  },
];

const Home = () => {
  return (
    <div>
      <AppNavbar />

      {/* Hero Section */}
      <section style={styles.hero}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/hero-banner.png`}
          alt="Brain Scan"
          style={styles.heroImage}
        />
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroText}>
          <h1 style={styles.heroTitle}>
            <span className="typewriter-text-loop-no-cursor">
              IntelliCrux-Net++
              <br />
              Real-time Brain Tumor Classification Model
            </span>
          </h1>
          <p style={styles.heroSubtitle}>
            Revolutionizing medical diagnostics with advanced AI.
          </p>
        </div>
      </section>

      {/* Features Section with Flip Cards */}
      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Why IntelliCrux-Net++ Is the Smarter Diagnostic Choice ?</h2>
        <p style={styles.sectionDescription}>
          Discover the core advantages that make our AI model stand out for reliable and efficient brain tumor classification.
        </p>
        <div style={styles.flipCardsContainer}>
          {featuresData.map((item, i) => (
            <div className="flip-card-wrapper" key={i}>
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="flip-card-back">
                    <h4>Key Highlights</h4>
                    <ul>
                      {item.points.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow Section with Visual Cues */}
      <section style={styles.workflowSection}>
        <h2 style={styles.sectionTitle}>Our Seamless AI-Powered Workflow</h2>
        <p style={styles.sectionDescription}>
          Experience a streamlined process from image upload to comprehensive diagnostic results.
        </p>
        <div style={styles.workflowBox}>
          {[
            {
              step: 1,
              title: "Secure Upload",
              icon: "upload",
              text: "Simply upload your MRI scan. All processing is handled locally on your device, ensuring maximum data privacy and security.",
            },
            {
              step: 2,
              title: "Intelligent Processing",
              icon: "cpu",
              text: "Our advanced AI model instantly processes the image through sophisticated enhancement, segmentation, and classification algorithms.",
            },
            {
              step: 3,
              title: "Actionable Results",
              icon: "report",
              text: "Receive immediate diagnostic results with clear interpretations and downloadable PDF reports, guiding your next steps.",
            },
          ].map((item, i) => (
            <div className="workflow-card-item" key={i}>
              <div style={styles.workflowCard}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/icons/${item.icon}.png`}
                  alt={`${item.title} Icon`}
                  style={styles.workflowIcon}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/80";
                  }}
                />
                <h3>Step {item.step}: {item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2025 IntelliCrux-Net++. All rights reserved.</p>
        <div>
          <a href="#" style={styles.footerLink}>Privacy Policy</a> |{" "}
          <a href="#" style={styles.footerLink}>Terms of Service</a> |{" "}
          <Link to="/contact" style={styles.footerLink}>Contact Us</Link>
        </div>
      </footer>

      {/* Styles */}
      <style>
        {`
          .flip-card-wrapper {
            flex: 0 0 auto;
            width: 280px;
            height: 220px;
            margin: 1rem;
            perspective: 1000px;
            transition: transform 0.3s ease-out;
          }

          .flip-card-wrapper:hover {
            transform: scale(1.03);
          }

          .flip-card {
            width: 100%;
            height: 100%;
          }

          .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.8s ease;
            transform-style: preserve-3d;
            border-radius: 15px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          }

          .flip-card-wrapper:hover .flip-card-inner {
            transform: rotateY(180deg);
          }

          .flip-card-front,
          .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            box-sizing: border-box;
          }

          .flip-card-front {
            background: linear-gradient(135deg, #ffffff, #f0f4f8);
            color: #2c3e50;
            border: 1px solid #e0e6ec;
          }

          .flip-card-front h3 {
            font-size: 1.6rem;
            margin-bottom: 0.8rem;
            color: #000053;
          }

          .flip-card-back {
            transform: rotateY(180deg);
            background: linear-gradient(135deg, #010127, #000053);
            color: #e6f0ff;
            padding: 1rem;
            text-align: left;
          }

          .flip-card-back h4 {
            font-size: 1.2rem;
            margin-bottom: 0.6rem;
            color: #a8dadc;
          }

          .flip-card-back ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .flip-card-back li {
            margin-bottom: 0.5rem;
            padding-left: 1rem;
            position: relative;
          }

          .flip-card-back li::before {
            content: "✔";
            color: #76c7c0;
            font-weight: bold;
            position: absolute;
            left: 0;
          }

          .workflow-card-item {
            flex: 1 1 300px;
            max-width: 380px;
            margin: 1.5rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
          }

          .workflow-card-item:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.18);
          }

          @media (max-width: 768px) {
            .flip-card-wrapper {
              width: 100%;
              height: 200px;
            }
            .workflow-card-item {
              width: 100%;
            }
          }

          /* New CSS for continuous typewriter effect WITHOUT cursor */
          .typewriter-text-loop-no-cursor {
            overflow: hidden;
            white-space: nowrap;
            /* No border-right for cursor */
            animation: 
              typing-no-cursor 6s steps(60) infinite; /* Adjust 6s for speed */
            display: inline-block;
            max-width: 100%;
            font-family: 'monospace', sans-serif;
          }

          /* Calculating characters: "IntelliCrux-Net++\nReal-time Brain Tumor Classification Model"
             Let's count:
             "IntelliCrux-Net++" (18 chars)
             + "\n" (1 char for line break, but visually it's 0 width)
             "Real-time Brain Tumor Classification Model" (42 chars)
             Total perceived characters: 18 + 42 = 60
          */

          @keyframes typing-no-cursor {
            0% { width: 0; } /* Start typing */
            48% { width: 100%; } /* Finish typing */
            50% { width: 100%; } /* Hold full text momentarily */
            52% { width: 100%; } /* Hold full text momentarily */
            98% { width: 0; } /* Finish deleting */
            100% { width: 0; } /* Ready for next loop */
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  hero: {
    position: "relative",
    height: "auto",
    minHeight: "450px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    filter: "brightness(60%)",
    zIndex: 1,
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 1,
  },
  heroText: {
    position: "relative",
    color: "#fff",
    zIndex: 2,
    textAlign: "center",
    padding: "1rem",
    maxWidth: "90%",
    textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem",
  },
  heroTitle: {
    fontSize: "2.8rem",
    fontWeight: "bold",
    lineHeight: "1.2",
    marginBottom: "1rem",
  },
  heroSubtitle: {
    fontSize: "1.3rem",
    marginBottom: "2rem",
    color: "#e0e0e0",
  },
  featuresSection: {
    padding: "5rem 2rem",
    backgroundColor: "#f9fbfd",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "2.8rem",
    marginBottom: "1.5rem",
    color: "#000053",
    fontWeight: "700",
  },
  sectionDescription: {
    fontSize: "1.2rem",
    color: "#555",
    maxWidth: "800px",
    margin: "0 auto 4rem auto",
    lineHeight: "1.7",
  },
  flipCardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  workflowSection: {
    padding: "5rem 2rem",
    background: "#eef5fa",
    textAlign: "center",
  },
  workflowBox: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "3rem",
  },
  workflowCard: {
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "15px",
    padding: "2.5rem",
    textAlign: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  workflowIcon: {
    width: "80px",
    height: "80px",
    marginBottom: "1.5rem",
    filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.1))",
  },
  footer: {
    padding: "2.5rem",
    textAlign: "center",
    background: "#1a2a3a",
    color: "white",
    fontSize: "0.95rem",
    marginTop: "5rem",
  },
  footerLink: {
    color: "#9adce0",
    textDecoration: "none",
  },
};

export default Home;