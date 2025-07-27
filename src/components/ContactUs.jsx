import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppNavbar from "../components/AppNavbar";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_611tihk", // ✅ Replace with your EmailJS service ID
        "template_xxx",     // ✅ Replace with your template ID
        formData,
        "user_xxx"          // ✅ Replace with your public key
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          setFormData({ name: "", email: "", subject: "", message: "" });
        },
        () => setStatus("❌ Failed to send. Please try again later.")
      );
  };

  return (
    <>
      <AppNavbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={styles.pageWrapper}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={styles.container}
        >
          {/* Left Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={styles.contactInfo}
          >
            <h2 style={styles.title}>Contact Us</h2>
            <p style={styles.description}>
              Leave your details or message, and we'll respond shortly. Available through multiple channels!
            </p>
            <div style={styles.infoBlock}>
              <p>📞 <strong>Phone:</strong> +91 1234567890</p>
              <p>📧 <strong>Email:</strong> contactintelli@gmail.com</p>
              <p>📍 <strong>Address:</strong> SRM Institute of Science and Technology, Chennai</p>
            </div>
          </motion.div>

          {/* Right Panel - Form */}
          <motion.form
            onSubmit={handleSubmit}
            style={styles.formBox}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 style={styles.formTitle}>Send Message</h3>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              style={styles.textarea}
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              style={styles.submitBtn}
            >
              📨 Send
            </motion.button>

            <AnimatePresence>
              {status && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={styles.status}
                >
                  {status}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        </motion.div>
      </motion.div>
    </>
  );
};

const styles = {
  pageWrapper: {
    background: "url(/assets/contact-bg.png) center/cover no-repeat",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "12px",
    boxShadow: "0 0 25px rgba(0,0,0,0.25)",
    padding: "2rem",
    maxWidth: "1000px",
    width: "100%",
    backdropFilter: "blur(6px)",
  },
  contactInfo: {
    flex: 1,
    minWidth: "280px",
    backgroundColor: "#010123ff",
    padding: "1.5rem",
    borderRadius: "10px",
    color: "#fff",
    boxShadow: "inset 0 0 10px rgba(0,0,0,0.4)",
    textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
  },
  formBox: {
    flex: 1,
    minWidth: "280px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    fontFamily: "'Segoe UI', sans-serif",
  },
  title: {
    fontSize: "2rem",
    color: "#fff",
    marginBottom: "0.8rem",
  },
  description: {
    fontSize: "14px",
    color: "#ddd",
    marginBottom: "1.5rem",
  },
  infoBlock: {
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#f1f1f1",
  },
  formTitle: {
    fontSize: "1.4rem",
    color: "#000053",
    marginBottom: "0.5rem",
    textShadow: "0px 2px 4px rgba(0,0,0,0.2)",
  },
  input: {
    padding: "0.75rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
    boxShadow: "1px 1px 3px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  textarea: {
    padding: "0.75rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
    resize: "vertical",
    boxShadow: "1px 1px 3px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  submitBtn: {
    backgroundColor: "#000033ff",
    color: "#fff",
    padding: "0.8rem 1.5rem",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    alignSelf: "flex-start",
    marginTop: "0.5rem",
    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
    boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
  },
  status: {
    textAlign: "left",
    fontSize: "14px",
    marginTop: "0.8rem",
    color: "#000053",
  },
};

export default ContactUs;
