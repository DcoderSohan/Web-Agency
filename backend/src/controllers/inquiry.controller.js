import Inquiry from "../models/Inquiry.js";

// @desc    Create new inquiry
// @route   POST /api/inquiries
// @access  Public
export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, message, selectedPlan } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      message,
      selectedPlan: selectedPlan || "General",
    });

    res.status(201).json({ success: true, data: inquiry });
  } catch (error) {
    console.error("Create Inquiry Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private/Admin
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete an inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private/Admin
export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }
    res.status(200).json({ success: true, message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
