import React, { useEffect, useState } from "react";
import AppNavbar from "../components/AppNavbar";
import * as XLSX from "xlsx";
import { motion, AnimatePresence } from "framer-motion";

const History = () => {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(stored);
  }, []);

  const handleDelete = (indexToRemove) => {
    const updated = history.filter((_, idx) => idx !== indexToRemove);
    setHistory(updated);
    localStorage.setItem("history", JSON.stringify(updated));
  };

  const handleExport = () => {
    const exportData = history.map(({ preview, ...rest }) => rest);
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "History");
    XLSX.writeFile(wb, "MRI_History.xlsx");
  };

  const filtered = history.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.prediction.toLowerCase().includes(search.toLowerCase()) ||
      r.date.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  return (
    <>
      <AppNavbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={styles.wrapper}
      >
        <motion.h2
          style={styles.title}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          🧠 Patient MRI History
        </motion.h2>

        <motion.div
          className="actions"
          style={styles.topActions}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="text"
            placeholder="Search by name, prediction, or date..."
            style={styles.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleExport} style={styles.exportBtn}>
            📤 Export CSV/Excel
          </button>
        </motion.div>

        <AnimatePresence>
          {history.length === 0 ? (
            <motion.p
              style={styles.noData}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No past records found.
            </motion.p>
          ) : (
            <motion.div
              style={styles.tableContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <table style={styles.table}>
                <thead>
                  <tr style={styles.theadRow}>
                    <th>Preview</th>
                    <th>Patient ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Prediction</th>
                    <th>Confidence</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((record, index) => (
                    <motion.tr
                      key={index}
                      style={styles.row}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td>
                        {record.preview ? (
                          <img src={record.preview} alt="MRI" style={styles.image} />
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td>#{1000 + index + (currentPage - 1) * rowsPerPage}</td>
                      <td>{record.name}</td>
                      <td>{record.age}</td>
                      <td>{record.gender}</td>
                      <td>{record.email}</td>
                      <td>
                        <span
                          style={{
                            ...styles.badge,
                            backgroundColor:
                              record.prediction === "NoTumor"
                                ? "#4caf50"
                                : "#f44336",
                          }}
                        >
                          {record.prediction}
                        </span>
                      </td>
                      <td>{record.confidence}%</td>
                      <td>{record.date}</td>
                      <td>
                        <motion.button
                          style={styles.deleteBtn}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            handleDelete(index + (currentPage - 1) * rowsPerPage)
                          }
                        >
                          🗑️
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              <div style={styles.pagination}>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    style={{
                      ...styles.pageBtn,
                      backgroundColor: currentPage === i + 1 ? "#000053" : "#eee",
                      color: currentPage === i + 1 ? "#fff" : "#000",
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

const styles = {
  wrapper: {
    maxWidth: "100%",
    padding: "2rem 1rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: "2.2rem",
    color: "#000053",
    marginBottom: "1.5rem",
  },
  search: {
    padding: "0.6rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    width: "300px",
  },
  topActions: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  exportBtn: {
    backgroundColor: "#000053",
    color: "#fff",
    padding: "0.6rem 1.2rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  noData: {
    textAlign: "center",
    color: "#777",
    fontSize: "1.1rem",
    marginTop: "2rem",
  },
  tableContainer: {
    overflowX: "auto",
    width: "100%",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "900px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  },
  theadRow: {
    backgroundColor: "#000053",
    color: "#fff",
    fontWeight: "600",
  },
  row: {
    borderBottom: "1px solid #eee",
    textAlign: "center",
    fontSize: "14px",
  },
  image: {
    width: "60px",
    height: "auto",
    borderRadius: "6px",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  badge: {
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "13px",
    fontWeight: "600",
  },
  pagination: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
    gap: "0.4rem",
    flexWrap: "wrap",
  },
  pageBtn: {
    padding: "6px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default History;
