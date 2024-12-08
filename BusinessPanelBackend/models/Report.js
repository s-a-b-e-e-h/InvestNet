const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Admin who generated the report
  reportType: {
    type: String,
    enum: ["Engagement", "Financial", "Activity Logs"],
    required: true,
  }, // Report type
  content: Object, // Report data/content
  createdAt: { type: Date, default: Date.now }, // Report generation timestamp
});

module.exports = mongoose.model("Report", ReportSchema);
