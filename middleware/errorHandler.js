// src/middleware/errorHandler.js

module.exports = (err, req, res) => {
  // Log the error to console for debug
  console.error(err.stack);

  // Customize based on the type of error
  if (err.name === "ValidationError") {
    // Mongoose validation error
    return res.status(400).json({ error: err.message });
  }

  if (err.name === "CastError") {
    // Mongoose incorrect type error
    return res.status(400).json({ error: "Invalid ID format" });
  }

  // ... You can add more error types and customize the message

  // For other types of errors or generic 500 Internal Server Error
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
};
