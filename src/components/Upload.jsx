import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence
import AppNavbar from "../components/AppNavbar";

// Inline SVG Icons for better visual appeal
const UploadIcon = ({ size = 40, color = "#999" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

const FolderIcon = ({ size = 20, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
);

const CheckCircleIcon = ({ size = 20, color = "#28a745" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const AlertTriangleIcon = ({ size = 20, color = "#ffc107" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const InfoIcon = ({ size = 20, color = "#17a2b8" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);


const Upload = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    patientId: Math.floor(100000 + Math.random() * 900000).toString(),
    phone: "9876543210", // Optional, static or dynamically captured
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // For custom messages
  const navigate = useNavigate();

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    const base64 = await toBase64(file);
    setPreview(base64);
    setMessage({ text: "", type: "" }); // Clear previous messages
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    const { name, age, gender, email, patientId } = formData;
    if (!image || !name || !age || !gender || !email || !patientId) {
      setMessage({ text: "Please fill all patient details and select an MRI image.", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "Processing your scan...", type: "info" });

    const data = new FormData();
    data.append("file", image);

    try {
      const res = await axios.post("http://localhost:8000/predict", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const result = {
        ...formData,
        prediction: res.data.prediction,
        confidence: res.data.confidence,
        date: new Date().toLocaleString(),
        preview,
      };

      localStorage.setItem("result", JSON.stringify(result));
      localStorage.setItem("preview", preview);
      const history = JSON.parse(localStorage.getItem("history") || "[]");
      localStorage.setItem("history", JSON.stringify([result, ...history]));
      setMessage({ text: "Prediction successful!", type: "success" });
      navigate("/result");
    } catch (err) {
      console.error("Upload error:", err);
      setMessage({ text: "Prediction failed: " + (err.response?.data?.detail || "Unknown error"), type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppNavbar />
      <div style={styles.pageContainer}> {/* New container for overall page styling */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={styles.wrapper}
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={styles.title}
          >
            Upload MRI Scan for Analysis
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={styles.subtext}
          >
            Securely upload your MRI scans for AI-powered tumor detection. All data is processed locally for your privacy.
          </motion.p>

          <AnimatePresence>
            {message.text && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{ ...styles.messageBox, ...(message.type === 'error' ? styles.messageError : message.type === 'success' ? styles.messageSuccess : styles.messageInfo) }}
              >
                {message.type === 'error' && <AlertTriangleIcon size={20} color="#dc3545" />}
                {message.type === 'success' && <CheckCircleIcon size={20} color="#28a745" />}
                {message.type === 'info' && <InfoIcon size={20} color="#17a2b8" />}
                <span style={{ marginLeft: '10px' }}>{message.text}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={styles.formGroup}
          >
            <input
              name="patientId"
              placeholder="Patient ID"
              value={formData.patientId}
              readOnly
              style={{ ...styles.input, backgroundColor: "#e9ecef", cursor: "not-allowed" }}
            />
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleInputChange}
              value={formData.name}
              style={styles.input}
            />
            <input
              name="age"
              type="number"
              placeholder="Age"
              onChange={handleInputChange}
              value={formData.age}
              style={styles.input}
            />
            <select
              name="gender"
              onChange={handleInputChange}
              value={formData.gender}
              style={styles.input}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleInputChange}
              value={formData.email}
              style={styles.input}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={styles.uploadBox}
          >
            {!preview ? (
              <label htmlFor="fileUpload" style={styles.browseBox}>
                <UploadIcon size={50} color="#999" />
                <p style={styles.dragDropText}>Drag & drop your MRI scan here</p>
                <span style={styles.orText}>or</span>
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0,0,83,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  style={styles.uploadButton}
                >
                  <FolderIcon size={20} color="#fff" /> Browse Files
                </motion.div>
                <input
                  id="fileUpload"
                  type="file"
                  accept="image/*" // Restrict to image files
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                style={styles.previewContainer}
              >
                <img src={preview} alt="MRI Preview" style={styles.preview} />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setImage(null);
                    setPreview(null);
                    setMessage({ text: "", type: "" });
                  }}
                  style={styles.removeImageBtn}
                >
                  ✖ Remove Image
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          <motion.button
            onClick={handleUpload}
            disabled={loading}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(19,31,47,0.3)" }}
            whileTap={{ scale: 0.97 }}
            style={styles.analyzeBtn}
          >
            {loading ? "⏳ Processing..." : "🧠 Analyze Scan"}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={styles.guidelinesBox}
          >
            <h3>📋 File Upload Guidelines</h3>
            {/* Adjusted ul styling */}
            <ul style={styles.ul}>
              <li><CheckCircleIcon size={16} color="#28a745" /> <strong>Supported Formats:</strong> .jpeg, .png, .jpg (for demonstration)</li>
              <li><CheckCircleIcon size={16} color="#28a745" /> <strong>Max File Size:</strong> Recommended up to 5 MB for quick processing</li>
              <li><CheckCircleIcon size={16} color="#28a745" /> <strong>Image Quality:</strong> Use clear, high-resolution MRI scans for best results</li>
              <li><CheckCircleIcon size={16} color="#28a745" /> <strong>Anonymization:</strong> Ensure all patient identifiers are removed before uploading</li>
            </ul>
            {/* Adjusted note styling */}
            <div style={styles.note}>
              <AlertTriangleIcon size={20} color="#ffc107" />
              <div style={styles.noteTextContent}> {/* New div to control text wrapping */}
                <strong style={{marginRight: '5px'}}>Important Note:</strong> This is a demonstration. For real clinical use, consult certified medical professionals.
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

// --- Styles ---
const styles = {
  pageContainer: {
    padding: "3rem 1rem", // Added padding to the overall page container
    backgroundColor: "#f8faff", // Consistent light background
    minHeight: "calc(100vh - 60px)", // Adjust for navbar height (assuming navbar height is around 60px)
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start", // Align to top
    boxSizing: "border-box", // Include padding in element's total width and height
  },
  wrapper: {
    padding: "2.5rem", // Increased padding
    maxWidth: "800px", // Increased max width for more content space
    width: "95%", // Occupy most of the width
    margin: "auto",
    textAlign: "center",
    background: "#fff", // White background for the main card
    borderRadius: "16px", // More rounded corners
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)", // Stronger, more modern shadow
    border: "1px solid #e0e0e0", // Subtle border
    boxSizing: "border-box", // Include padding in element's total width and height
  },
  title: {
    fontSize: "2.5rem", // Larger title
    fontWeight: "700",
    marginBottom: "0.5rem",
    color: "#000053", // Consistent dark blue
  },
  subtext: {
    fontSize: "1.1rem", // Slightly larger subtext
    color: "#555",
    marginBottom: "2.5rem", // More space below subtext
    lineHeight: "1.6",
  },
  messageBox: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    justifyContent: 'center', // Center message content
    textAlign: 'left', // Ensure text aligns left within the flex container
  },
  messageError: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
  },
  messageSuccess: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
  },
  messageInfo: {
    backgroundColor: '#d1ecf1',
    color: '#0c5460',
    border: '1px solid #bee5eb',
  },
  formGroup: {
    display: "grid", // Using grid for better form layout
    gridTemplateColumns: "1fr 1fr", // Two columns for inputs by default
    gap: "1rem", // Increased gap
    marginBottom: "2rem", // More space below form
  },
  input: {
    padding: "1rem 1.2rem", // More padding
    fontSize: "1rem",
    borderRadius: "10px", // More rounded
    border: "1px solid #ccc",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)", // Subtle inner shadow
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    width: "calc(100% - 2.4rem)", // Account for padding
    boxSizing: "border-box", // Include padding in element's total width and height
  },
  uploadBox: {
    border: "3px dashed #a0a0a0", // Thicker, slightly darker dashed border
    borderRadius: "16px", // More rounded
    padding: "3rem", // More padding
    backgroundColor: "#fefefe", // Lighter background
    marginBottom: "2.5rem",
    boxShadow: "inset 0 3px 10px rgba(0,0,0,0.05)", // More pronounced inner shadow
    transition: "border-color 0.3s ease, background-color 0.3s ease",
    cursor: "pointer", // Indicate it's clickable
  },
  browseBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "150px", // Ensure a minimum height for the drag area
  },
  dragDropText: {
    fontSize: "1.2rem",
    color: "#666",
    marginTop: "1rem",
    marginBottom: "0.5rem",
  },
  orText: {
    fontSize: "1rem",
    margin: "0.8rem 0",
    color: "#888",
    fontWeight: "bold",
  },
  uploadButton: {
    backgroundColor: "#000053", // Dark blue button
    color: "#fff",
    padding: "0.8rem 1.8rem", // More padding
    borderRadius: "8px", // More rounded
    marginTop: "1rem",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(0,0,83,0.2)",
    display: 'inline-flex', // To align icon and text
    alignItems: 'center',
    gap: '8px',
    border: "none", // Remove default button border
    cursor: "pointer", // Indicate it's clickable
  },
  previewContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
  },
  preview: {
    width: "100%",
    maxWidth: "400px", // Max width for preview image
    maxHeight: "350px", // Max height for preview image
    objectFit: "contain",
    borderRadius: "12px",
    border: "2px solid #000053", // Stronger border for preview
    boxShadow: "0 5px 15px rgba(0,0,0,0.15)", // More prominent shadow
  },
  removeImageBtn: {
    backgroundColor: "#dc3545", // Red for remove
    color: "#fff",
    padding: "0.7rem 1.4rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 3px 10px rgba(220,53,69,0.2)",
    transition: "transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease",
  },
  analyzeBtn: {
    padding: "1.2rem 2.5rem", // Larger button
    backgroundColor: "#131f2f", // Darker blue from the original request
    color: "#fff",
    fontSize: "1.2rem", // Larger font
    borderRadius: "10px", // More rounded
    border: "none",
    cursor: "pointer",
    fontWeight: "700", // Bolder text
    marginBottom: "3rem", // More space below button
    boxShadow: "0 6px 18px rgba(19,31,47,0.25)", // Stronger shadow
    transition: "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
  },
  guidelinesBox: {
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "16px",
    padding: "2rem", // More padding
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
    textAlign: "left",
  },
  ul: {
    textAlign: "left",
    paddingLeft: "0", // Remove default padding
    fontSize: "1rem", // Slightly larger
    color: "#333",
    marginBottom: "1.5rem",
    listStyle: "none", // Remove default bullet points
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem', // Space between list items
  },
  // Corrected style for li inside ul to ensure icon and text align
  'ul li': {
    display: 'flex', // Use flexbox for list items
    alignItems: 'flex-start', // Align items to the start (top)
    gap: '10px', // Space between icon and text
    paddingLeft: '0', // Ensure no extra padding from li
  },
  note: {
    fontSize: "0.9rem", // Slightly larger note
    background: "#fff3cd", // Warning yellow background
    borderLeft: "5px solid #ffc107", // Stronger yellow border
    padding: "1rem 1.2rem",
    borderRadius: "8px",
    color: "#856404", // Darker text for warning
    display: 'flex',
    alignItems: 'flex-start', // Align to start to prevent icon centering if text wraps
    gap: '10px',
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  noteTextContent: { // New style for text inside the note
    flex: 1, // Allow text content to take up available space
    wordWrap: 'break-word', // Ensure long words break and wrap
    overflowWrap: 'break-word', // Modern equivalent of word-wrap
  },
  // --- Media Queries for Responsiveness ---
  // Using a separate style tag for media queries
  mediaQueries: `
    /* Small devices (phones, 600px and down) */
    @media (max-width: 600px) {
      .pageContainer {
        padding: 1.5rem 0.8rem;
      }
      .wrapper {
        padding: 1.5rem;
        width: 100%; /* Take full width on small screens */
      }
      .title {
        font-size: 2rem;
      }
      .subtext {
        font-size: 0.95rem;
        margin-bottom: 1.5rem;
      }
      .formGroup {
        grid-template-columns: 1fr; /* Single column for inputs on small screens */
        gap: 0.8rem;
      }
      .input {
        padding: 0.8rem 1rem;
        font-size: 0.9rem;
      }
      .uploadBox {
        padding: 1.5rem;
        margin-bottom: 1.5rem;
      }
      .dragDropText {
        font-size: 1rem;
      }
      .uploadButton {
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
      }
      .preview {
        max-width: 250px;
        max-height: 200px;
      }
      .removeImageBtn {
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
      }
      .analyzeBtn {
        padding: 1rem 1.8rem;
        font-size: 1rem;
        margin-bottom: 2rem;
      }
      .guidelinesBox {
        padding: 1.5rem;
      }
      .ul li {
        font-size: 0.9rem;
      }
      .note {
        font-size: 0.8rem;
        padding: 0.8rem 1rem;
      }
      .messageBox {
        padding: 0.8rem;
        font-size: 0.85rem;
      }
    }

    /* Medium devices (tablets, 601px to 900px) */
    @media (min-width: 601px) and (max-width: 900px) {
      .wrapper {
        padding: 2rem;
      }
      .title {
        font-size: 2.2rem;
      }
      .subtext {
        font-size: 1rem;
      }
      .formGroup {
        gap: 1rem;
      }
      .input {
        padding: 0.9rem 1.1rem;
        font-size: 0.95rem;
      }
      .uploadBox {
        padding: 2.5rem;
      }
      .dragDropText {
        font-size: 1.1rem;
      }
      .uploadButton {
        padding: 0.7rem 1.5rem;
        font-size: 0.95rem;
      }
      .preview {
        max-width: 350px;
        max-height: 300px;
      }
      .analyzeBtn {
        padding: 1.1rem 2rem;
        font-size: 1.1rem;
      }
    }
  `
};

// Insert the media queries into the document head
// This is a common pattern for injecting global CSS in React without a dedicated CSS file
// It's placed outside the component to ensure it's only injected once
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles.mediaQueries;
  document.head.appendChild(styleSheet);
}

export default Upload;