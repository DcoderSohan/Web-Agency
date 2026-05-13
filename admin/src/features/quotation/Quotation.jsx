import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Download,
  Plus,
  Trash2,
  Building2,
  User,
  Mail,
  MapPin,
  Briefcase,
  FileText,
  Calendar,
  IndianRupee,
  Clock,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Save,
  Pencil,
  Terminal,
  Cpu,
  Layers,
  Shield,
  Activity,
  ArrowRight,
  ChevronRight,
  Database,
  X,
  PlusCircle,
} from "lucide-react";
import { usePDF } from "react-to-pdf";
import axios from "axios";
import { userDataContext } from "../../context/UserContext";
import { motion, AnimatePresence } from "framer-motion";

const generateRandomQuotation = () => {
  return `VTRC-SPEC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
};

const Quotation = ({ editData = null, onSaved = null }) => {
  const { serverUrl } = useContext(userDataContext);
  const [activeTab, setActiveTab] = useState("edit");
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    quotationNo: generateRandomQuotation(),
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    clientName: "Client Entity",
    clientAddress: "City, Country",
    clientEmail: "client@example.com",
    projectType: "Custom Development",
    executiveSummary:
      "A comprehensive digital solution tailored to your strategic objectives. This project focuses on high-performance architecture, seamless user experience, and scalable infrastructure.",
    deliverables: [
      {
        title: "System Architecture",
        description: "Core structural framework and backend logic layer.",
      },
      {
        title: "User Experience Design",
        description: "High-fidelity interfaces and interactive prototypes.",
      },
      {
        title: "Database Integration",
        description: "Centralized data management and optimization.",
      },
    ],
    roadmap: [
      { step: "01", label: "Discovery", duration: "1-2 Weeks" },
      { step: "02", label: "Design", duration: "2-3 Weeks" },
      { step: "03", label: "Development", duration: "4-6 Weeks" },
      { step: "04", label: "Launch", duration: "Final Phase" },
    ],
    investment: [
      {
        item: "Strategic Architecture Implementation",
        price: 25000,
        type: "fixed",
      },
      {
        item: "Project Management & Support",
        price: 0,
        type: "included",
      },
    ],
    totalValue: 25000,
    supportPlan: {
      name: "Maintenance & Support",
      subType: "Standard",
      price: 1500,
      unit: "/ Month",
      description:
        "Ongoing system stability, security updates, and priority technical assistance.",
    },
    milestones: [
      "50% Initial deposit to commence project.",
      "50% Final settlement prior to deployment.",
    ],
    terms: [
      "Maintenance starts upon project completion.",
      "Additional features will be quoted separately.",
      "Full ownership transfers upon final payment.",
    ],
  });

  useEffect(() => {
    if (editData) {
      setFormData({ ...editData });
    }
  }, [editData]);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editData?._id) {
        await axios.put(`${serverUrl}/api/quotations/${editData._id}`, formData, {
          withCredentials: true,
        });
        showToast("success", "Project specification updated successfully.");
      } else {
        await axios.post(`${serverUrl}/api/quotations`, formData, {
          withCredentials: true,
        });
        showToast("success", "Project specification initialized.");
      }
      if (onSaved) onSaved();
    } catch (err) {
      showToast("error", "An error occurred while saving the specification.");
    } finally {
      setIsSaving(false);
    }
  };

  const regenerateQuotationNo = () => {
    setFormData((prev) => ({
      ...prev,
      quotationNo: generateRandomQuotation(),
    }));
  };

  const { toPDF, targetRef } = usePDF({
    filename: `VTRC_SPEC_${formData.clientName.replace(/\s+/g, "_")}_${formData.quotationNo}.pdf`,
    page: { format: "a4", orientation: "portrait" },
  });

  const handleDownload = async () => {
    setIsExporting(true);
    setTimeout(() => {
      toPDF();
      setTimeout(() => {
        setIsExporting(false);
      }, 500);
    }, 100);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, field, value, arrayName) => {
    const newArray = [...formData[arrayName]];
    newArray[index][field] = value;
    setFormData((prev) => {
      const updated = { ...prev, [arrayName]: newArray };
      if (arrayName === "investment") {
        const total = newArray.reduce(
          (acc, curr) => acc + (Number(curr.price) || 0),
          0,
        );
        updated.totalValue = total;
      }
      return updated;
    });
  };

  const addItem = (arrayName, emptyItem) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], emptyItem],
    }));
  };

  const removeItem = (index, arrayName) => {
    const newArray = formData[arrayName].filter((_, i) => i !== index);
    setFormData((prev) => {
      const updated = { ...prev, [arrayName]: newArray };
      if (arrayName === "investment") {
        const total = newArray.reduce(
          (acc, curr) => acc + (Number(curr.price) || 0),
          0,
        );
        updated.totalValue = total;
      }
      return updated;
    });
  };

  const handleMilestoneChange = (index, value) => {
    const newMilestones = [...formData.milestones];
    newMilestones[index] = value;
    setFormData((prev) => ({ ...prev, milestones: newMilestones }));
  };

  const handleTermChange = (index, value) => {
    const newTerms = [...formData.terms];
    newTerms[index] = value;
    setFormData((prev) => ({ ...prev, terms: newTerms }));
  };

  const handleSupportChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      supportPlan: { ...prev.supportPlan, [field]: value },
    }));
  };

  return (
    <div className="flex flex-col h-full selection:bg-black/10 font-body overflow-hidden">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-6 bg-white border-b border-surface-container-low">
        <div className="flex p-1 bg-surface-container-low rounded-xl border border-outline-variant/30 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("edit")}
            className={`flex-1 sm:flex-none px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg ${activeTab === "edit" ? "bg-black text-white" : "text-secondary hover:text-black"}`}
          >
            Configure
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 sm:flex-none px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg ${activeTab === "preview" ? "bg-black text-white" : "text-secondary hover:text-black"}`}
          >
            Preview
          </button>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`btn-primary flex-1 sm:flex-none ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSaving ? <RefreshCw className="animate-spin" size={16} /> : editData?._id ? <Pencil size={16} /> : <Save size={16} />}
            <span>{isSaving ? 'Saving...' : editData?._id ? 'Update Spec' : 'Save Spec'}</span>
          </button>
          {activeTab === "preview" && (
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className={`btn-outline flex-1 sm:flex-none shadow-xl shadow-black/5 ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Download size={16} />
              <span>{isExporting ? 'Exporting...' : 'Download PDF'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className={`fixed bottom-10 right-10 z-[200] flex items-center gap-4 px-6 py-4 rounded-xl shadow-2xl text-white text-[10px] font-bold uppercase tracking-widest ${
            toast.type === 'success' ? 'bg-black' : 'bg-red-600'
          }`}>
            {toast.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {isExporting && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100] flex items-center justify-center p-8">
          <div className="flex flex-col items-center gap-6 p-12 bg-white rounded-3xl shadow-2xl max-w-md w-full border border-outline-variant">
            <RefreshCw className="animate-spin text-black" size={48} />
            <div className="text-center space-y-2">
              <p className="font-black text-black text-2xl uppercase font-display tracking-tight">Generating Document</p>
              <p className="text-secondary text-[10px] font-bold uppercase tracking-widest font-mono">Optimizing structural PDF specifications...</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-8 bg-background">
        {activeTab === "edit" ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header Info */}
            <section className="bg-white p-10 border border-outline-variant rounded-3xl shadow-sm">
              <div className="flex items-center gap-4 mb-8 border-b border-surface-container-low pb-6">
                <div className="p-2.5 bg-black text-white rounded-xl">
                  <Terminal size={20} />
                </div>
                <h3 className="text-2xl font-black text-black uppercase font-display tracking-tight">
                  Document Metadata
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-secondary uppercase tracking-widest font-mono">
                    Reference ID
                  </label>
                  <div className="relative">
                    <input
                      name="quotationNo"
                      value={formData.quotationNo}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-surface-container-low border border-transparent focus:border-black rounded-xl outline-none transition-all font-bold text-xs font-mono uppercase pr-14"
                    />
                    <button
                      onClick={regenerateQuotationNo}
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-outline-variant hover:text-black transition-all"
                      title="Regenerate"
                    >
                      <RefreshCw size={16} />
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-secondary uppercase tracking-widest font-mono">
                    Date Created
                  </label>
                  <input
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3.5 bg-surface-container-low border border-transparent focus:border-black rounded-xl outline-none transition-all font-bold text-xs font-mono uppercase"
                  />
                </div>
              </div>
            </section>

            {/* Client Info */}
            <section className="bg-white p-10 border border-outline-variant rounded-3xl shadow-sm">
              <div className="flex items-center gap-4 mb-8 border-b border-surface-container-low pb-6">
                <div className="p-2.5 bg-black text-white rounded-xl">
                  <User size={20} />
                </div>
                <h3 className="text-2xl font-black text-black uppercase font-display tracking-tight">
                  Entity Details
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[9px] font-bold text-secondary uppercase tracking-widest font-mono">
                    Client Name
                  </label>
                  <input
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3.5 bg-surface-container-low border border-transparent focus:border-black rounded-xl outline-none transition-all font-bold text-sm uppercase font-display"
                    placeholder="Enter entity name..."
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[9px] font-bold text-secondary uppercase tracking-widest font-mono">
                    Billing Address
                  </label>
                  <textarea
                    name="clientAddress"
                    value={formData.clientAddress}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-5 py-3.5 bg-surface-container-low border border-transparent focus:border-black rounded-xl outline-none transition-all font-bold text-xs uppercase font-mono resize-none"
                    placeholder="Physical location..."
                  ></textarea>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-secondary uppercase tracking-widest font-mono">
                    Communication Channel
                  </label>
                  <input
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3.5 bg-surface-container-low border border-transparent focus:border-black rounded-xl outline-none transition-all font-bold text-xs font-mono"
                    placeholder="email@example.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-secondary uppercase tracking-widest font-mono">
                    Project Type
                  </label>
                  <input
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3.5 bg-surface-container-low border border-transparent focus:border-black rounded-xl outline-none transition-all font-bold text-xs font-mono uppercase"
                    placeholder="e.g. Mobile App Development"
                  />
                </div>
              </div>
            </section>

            {/* Project Summary */}
            <section className="bg-white p-10 border border-outline-variant rounded-3xl shadow-sm">
              <div className="flex items-center gap-4 mb-8 border-b border-surface-container-low pb-6">
                <div className="p-2.5 bg-black text-white rounded-xl">
                  <Briefcase size={20} />
                </div>
                <h3 className="text-2xl font-black text-black uppercase font-display tracking-tight">
                  Executive Summary
                </h3>
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-secondary uppercase tracking-widest font-mono">
                  Objective Overview
                </label>
                <textarea
                  name="executiveSummary"
                  value={formData.executiveSummary}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-5 py-3.5 bg-surface-container-low border border-transparent focus:border-black rounded-xl outline-none transition-all font-bold text-xs uppercase font-mono resize-none leading-relaxed"
                  placeholder="Summarize the core project goals..."
                ></textarea>
              </div>
            </section>

            {/* Deliverables */}
            <section className="bg-white p-10 border border-outline-variant rounded-3xl shadow-sm">
              <div className="flex items-center justify-between mb-8 border-b border-surface-container-low pb-6">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-black text-white rounded-xl">
                    <Layers size={20} />
                  </div>
                  <h3 className="text-2xl font-black text-black uppercase font-display tracking-tight">
                    Deliverable Nodes
                  </h3>
                </div>
                <button
                  onClick={() =>
                    addItem("deliverables", { title: "", description: "" })
                  }
                  className="flex items-center gap-2 bg-surface-container-low text-secondary text-[9px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-black hover:text-white transition-all rounded-lg border border-outline-variant/30"
                >
                  <Plus size={14} /> Add Node
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative p-6 bg-surface-container-low/30 border border-outline-variant/20 rounded-2xl hover:border-black transition-all"
                  >
                    <button
                      onClick={() => removeItem(idx, "deliverables")}
                      className="absolute -top-2 -right-2 bg-white border border-outline-variant text-outline-variant p-1.5 rounded-lg shadow-sm hover:text-red-500 hover:border-red-100 transition-all z-10"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="space-y-3">
                      <input
                        value={item.title}
                        onChange={(e) =>
                          handleArrayChange(
                            idx,
                            "title",
                            e.target.value,
                            "deliverables",
                          )
                        }
                        className="w-full bg-transparent font-black text-black text-sm uppercase font-display outline-none placeholder:text-outline-variant"
                        placeholder="Node Title..."
                      />
                      <textarea
                        value={item.description}
                        onChange={(e) =>
                          handleArrayChange(
                            idx,
                            "description",
                            e.target.value,
                            "deliverables",
                          )
                        }
                        className="w-full bg-transparent text-[11px] text-secondary font-bold font-mono uppercase tracking-tight outline-none resize-none"
                        placeholder="Technical description..."
                        rows="2"
                      ></textarea>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Roadmap */}
            <section className="bg-white p-10 border border-outline-variant rounded-3xl shadow-sm">
              <div className="flex items-center justify-between mb-8 border-b border-surface-container-low pb-6">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-black text-white rounded-xl">
                    <Activity size={20} />
                  </div>
                  <h3 className="text-2xl font-black text-black uppercase font-display tracking-tight">
                    Project Roadmap
                  </h3>
                </div>
                <button
                  onClick={() =>
                    addItem("roadmap", {
                      step: String(formData.roadmap.length + 1).padStart(
                        2,
                        "0",
                      ),
                      label: "",
                      duration: "",
                    })
                  }
                  className="flex items-center gap-2 bg-surface-container-low text-secondary text-[9px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-black hover:text-white transition-all rounded-lg border border-outline-variant/30"
                >
                  <Plus size={14} /> Add Phase
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {formData.roadmap.map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative p-6 bg-surface-container-low/30 border border-outline-variant/20 rounded-2xl text-center hover:border-black transition-all"
                  >
                    <button
                      onClick={() => removeItem(idx, "roadmap")}
                      className="absolute -top-2 -right-2 bg-white border border-outline-variant text-outline-variant p-1.5 rounded-lg shadow-sm hover:text-red-500 hover:border-red-100 transition-all z-10"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center text-[10px] font-black mb-4 mx-auto font-mono">
                      {item.step}
                    </div>
                    <input
                      value={item.label}
                      onChange={(e) =>
                        handleArrayChange(
                          idx,
                          "label",
                          e.target.value,
                          "roadmap",
                        )
                      }
                      className="w-full bg-transparent text-[10px] font-bold text-black uppercase text-center outline-none mb-1 font-mono tracking-widest placeholder:text-outline-variant"
                      placeholder="Phase Name"
                    />
                    <input
                      value={item.duration}
                      onChange={(e) =>
                        handleArrayChange(
                          idx,
                          "duration",
                          e.target.value,
                          "roadmap",
                        )
                      }
                      className="w-full bg-transparent text-[11px] font-black text-secondary text-center outline-none font-display uppercase placeholder:text-outline-variant"
                      placeholder="Duration"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Investment Items */}
            <section className="bg-white p-10 border border-outline-variant rounded-3xl shadow-sm">
              <div className="flex items-center justify-between mb-8 border-b border-surface-container-low pb-6">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-black text-white rounded-xl">
                    <Database size={20} />
                  </div>
                  <h3 className="text-2xl font-black text-black uppercase font-display tracking-tight">
                    Investment Table
                  </h3>
                </div>
                <button
                  onClick={() =>
                    addItem("investment", { item: "", price: 0, type: "fixed" })
                  }
                  className="flex items-center gap-2 bg-surface-container-low text-secondary text-[9px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-black hover:text-white transition-all rounded-lg border border-outline-variant/30"
                >
                  <Plus size={14} /> Add Item
                </button>
              </div>
              <div className="space-y-4">
                {formData.investment.map((item, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row items-stretch md:items-center gap-4 p-5 bg-surface-container-low/30 border border-outline-variant/20 rounded-2xl group hover:border-black transition-all">
                    <div className="flex-1">
                      <input
                        value={item.item}
                        onChange={(e) =>
                          handleArrayChange(
                            idx,
                            "item",
                            e.target.value,
                            "investment",
                          )
                        }
                        className="w-full px-5 py-3 border border-transparent focus:border-black outline-none bg-white rounded-xl font-bold text-xs uppercase font-mono transition-all"
                        placeholder="Component name..."
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 relative">
                        <IndianRupee size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant" />
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            handleArrayChange(
                              idx,
                              "price",
                              e.target.value,
                              "investment",
                            )
                          }
                          className="w-full pl-10 pr-4 py-3 border border-transparent focus:border-black outline-none bg-white rounded-xl font-black text-xs font-mono transition-all"
                          placeholder="0"
                        />
                      </div>
                      <select
                        value={item.type}
                        onChange={(e) =>
                          handleArrayChange(
                            idx,
                            "type",
                            e.target.value,
                            "investment",
                          )
                        }
                        className="w-32 px-4 py-3 border border-transparent focus:border-black outline-none bg-white rounded-xl font-bold text-[10px] uppercase font-mono cursor-pointer transition-all"
                      >
                        <option value="fixed">Fixed</option>
                        <option value="included">Included</option>
                        <option value="optional">Optional</option>
                      </select>
                      <button
                        onClick={() => removeItem(idx, "investment")}
                        className="p-3 text-outline-variant hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-surface-container-low flex justify-between items-center px-6">
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest font-mono">Total Structural Value</span>
                <span className="text-3xl font-black text-black font-display">
                  ₹{formData.totalValue.toLocaleString("en-IN")}
                </span>
              </div>
            </section>

            {/* Support Plan */}
            <section className="bg-white p-10 border border-outline-variant rounded-3xl shadow-sm">
              <div className="flex items-center gap-4 mb-8 border-b border-surface-container-low pb-6">
                <div className="p-2.5 bg-black text-white rounded-xl">
                  <Shield size={20} />
                </div>
                <h3 className="text-2xl font-black text-black uppercase font-display tracking-tight">
                  Maintenance Protocol
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4 md:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-secondary uppercase tracking-widest font-mono">Plan Name</label>
                      <input
                        value={formData.supportPlan.name}
                        onChange={(e) => handleSupportChange("name", e.target.value)}
                        className="w-full px-5 py-3.5 bg-surface-container-low border border-transparent focus:border-black rounded-xl outline-none transition-all font-bold text-xs uppercase font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-secondary uppercase tracking-widest font-mono">Price</label>
                      <input
                        type="number"
                        value={formData.supportPlan.price}
                        onChange={(e) => handleSupportChange("price", e.target.value)}
                        className="w-full px-5 py-3.5 bg-surface-container-low border border-transparent focus:border-black rounded-xl outline-none transition-all font-bold text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-secondary uppercase tracking-widest font-mono">Unit</label>
                      <input
                        value={formData.supportPlan.unit}
                        onChange={(e) => handleSupportChange("unit", e.target.value)}
                        className="w-full px-5 py-3.5 bg-surface-container-low border border-transparent focus:border-black rounded-xl outline-none transition-all font-bold text-xs font-mono uppercase"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-secondary uppercase tracking-widest font-mono">Plan Description</label>
                    <textarea
                      value={formData.supportPlan.description}
                      onChange={(e) => handleSupportChange("description", e.target.value)}
                      className="w-full px-5 py-3.5 bg-surface-container-low border border-transparent focus:border-black rounded-xl outline-none transition-all font-bold text-xs font-mono uppercase resize-none h-24"
                    ></textarea>
                  </div>
                </div>
              </div>
            </section>

            {/* Milestones & Terms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
              <section className="bg-white p-10 border border-outline-variant rounded-3xl shadow-sm">
                <div className="flex items-center justify-between mb-8 border-b border-surface-container-low pb-6">
                  <div className="flex items-center gap-4">
                     <div className="p-2.5 bg-black text-white rounded-xl">
                        <Activity size={20} />
                     </div>
                    <h3 className="text-xl font-black text-black uppercase font-display tracking-tight">Milestones</h3>
                  </div>
                   <button onClick={() => setFormData(prev => ({ ...prev, milestones: [...prev.milestones, ""] }))} className="text-outline-variant hover:text-black">
                      <PlusCircle size={20} />
                   </button>
                </div>
                <div className="space-y-4">
                  {formData.milestones.map((ms, idx) => (
                    <div key={idx} className="relative group">
                       <input
                        value={ms}
                        onChange={(e) => handleMilestoneChange(idx, e.target.value)}
                        className="w-full px-4 py-3 bg-surface-container-low border border-transparent focus:border-black rounded-xl outline-none text-[10px] font-bold font-mono uppercase tracking-tight"
                        placeholder="Milestone description..."
                      />
                      <button onClick={() => setFormData(prev => ({ ...prev, milestones: prev.milestones.filter((_, i) => i !== idx) }))} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-outline-variant hover:text-red-500 transition-all">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white p-10 border border-outline-variant rounded-3xl shadow-sm">
                <div className="flex items-center justify-between mb-8 border-b border-surface-container-low pb-6">
                  <div className="flex items-center gap-4">
                     <div className="p-2.5 bg-black text-white rounded-xl">
                        <FileText size={20} />
                     </div>
                    <h3 className="text-xl font-black text-black uppercase font-display tracking-tight">Terms</h3>
                  </div>
                   <button onClick={() => setFormData(prev => ({ ...prev, terms: [...prev.terms, ""] }))} className="text-outline-variant hover:text-black">
                      <PlusCircle size={20} />
                   </button>
                </div>
                <div className="space-y-4">
                  {formData.terms.map((term, idx) => (
                    <div key={idx} className="relative group">
                       <input
                        value={term}
                        onChange={(e) => handleTermChange(idx, e.target.value)}
                        className="w-full px-4 py-3 bg-surface-container-low border border-transparent focus:border-black rounded-xl outline-none text-[10px] font-bold font-mono uppercase tracking-tight"
                        placeholder="Term description..."
                      />
                       <button onClick={() => setFormData(prev => ({ ...prev, terms: prev.terms.filter((_, i) => i !== idx) }))} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-outline-variant hover:text-red-500 transition-all">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        ) : (
          /* Preview Mode */
          <div className="max-w-[800px] mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden mb-20" ref={targetRef}>
            {/* PDF Header */}
            <div className="p-16 bg-black text-white relative">
              <div className="flex justify-between items-start relative z-10">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white flex items-center justify-center rounded-2xl">
                        <div className="w-5 h-5 bg-black rounded-md"></div>
                     </div>
                     <span className="text-3xl font-black tracking-tighter uppercase font-display">VTRC</span>
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-5xl font-black uppercase font-display tracking-tight leading-none">
                      Project<br />Specification
                    </h1>
                    <div className="h-1 w-20 bg-white/20"></div>
                  </div>
                </div>
                <div className="text-right space-y-4 font-mono">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold uppercase tracking-[0.4em] opacity-40">Document ID</p>
                    <p className="text-xs font-black tracking-widest">{formData.quotationNo}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold uppercase tracking-[0.4em] opacity-40">Issue Date</p>
                    <p className="text-xs font-black tracking-widest uppercase">{formData.date}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Entity Block */}
            <div className="p-16 border-b border-surface-container">
               <div className="grid grid-cols-2 gap-16">
                  <div className="space-y-6">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary font-mono">Issuing Agency</p>
                     <div className="space-y-2">
                        <p className="text-lg font-black text-black font-display uppercase tracking-tight">VTRC Technologies</p>
                        <p className="text-[11px] font-bold text-secondary uppercase font-mono leading-relaxed">
                           Strategic Architecture Unit<br />
                           VTRC.TECH / OPERATIONAL AXIS
                        </p>
                     </div>
                  </div>
                  <div className="space-y-6">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary font-mono">Client Entity</p>
                     <div className="space-y-2">
                        <p className="text-lg font-black text-black font-display uppercase tracking-tight">{formData.clientName}</p>
                        <p className="text-[11px] font-bold text-secondary uppercase font-mono leading-relaxed">
                           {formData.clientAddress}<br />
                           {formData.clientEmail}
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-16 space-y-20">
               {/* Summary */}
               <section className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-black border-b border-black pb-4 font-mono flex items-center gap-4">
                     <div className="w-2 h-2 bg-black rounded-full"></div> 01 Executive Summary
                  </h3>
                  <p className="text-xl font-bold text-black font-display leading-tight uppercase italic">
                     "{formData.executiveSummary}"
                  </p>
               </section>

               {/* Deliverables */}
               <section className="space-y-10">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-black border-b border-black pb-4 font-mono flex items-center gap-4">
                     <div className="w-2 h-2 bg-black rounded-full"></div> 02 Project Deliverables
                  </h3>
                  <div className="grid grid-cols-1 gap-12">
                     {formData.deliverables.map((item, idx) => (
                        <div key={idx} className="grid grid-cols-12 gap-8 group">
                           <div className="col-span-1 text-2xl font-black text-outline-variant font-display">0{idx+1}</div>
                           <div className="col-span-11 space-y-2">
                              <h4 className="text-xl font-black text-black uppercase font-display tracking-tight">{item.title}</h4>
                              <p className="text-sm font-bold text-secondary uppercase font-mono leading-relaxed">{item.description}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </section>

               {/* Roadmap */}
               <section className="space-y-10">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-black border-b border-black pb-4 font-mono flex items-center gap-4">
                     <div className="w-2 h-2 bg-black rounded-full"></div> 03 Strategic Roadmap
                  </h3>
                  <div className="grid grid-cols-4 gap-4">
                     {formData.roadmap.map((item, idx) => (
                        <div key={idx} className="p-6 bg-surface-container-low border border-outline-variant/30 rounded-2xl space-y-4 text-center">
                           <p className="text-[10px] font-black font-mono text-outline-variant">{item.step}</p>
                           <div>
                              <p className="text-[11px] font-black text-black uppercase font-display mb-1">{item.label}</p>
                              <p className="text-[9px] font-bold text-secondary uppercase font-mono tracking-widest">{item.duration}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </section>

               {/* Financials */}
               <section className="space-y-10">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-black border-b border-black pb-4 font-mono flex items-center gap-4">
                     <div className="w-2 h-2 bg-black rounded-full"></div> 04 Financial Allocation
                  </h3>
                  <div className="overflow-hidden border border-black rounded-2xl">
                     <table className="w-full border-collapse">
                        <thead>
                           <tr className="bg-black text-white font-mono text-[10px] font-bold uppercase tracking-widest">
                              <th className="px-8 py-4 text-left">Structural Component</th>
                              <th className="px-8 py-4 text-right">Allocation</th>
                           </tr>
                        </thead>
                        <tbody className="font-mono text-xs font-bold uppercase">
                           {formData.investment.map((item, idx) => (
                              <tr key={idx} className="border-b border-surface-container">
                                 <td className="px-8 py-6 text-black">{item.item}</td>
                                 <td className="px-8 py-6 text-right text-black">
                                    {item.type === 'included' ? 'INCLUDED' : `₹${Number(item.price).toLocaleString('en-IN')}`}
                                 </td>
                              </tr>
                           ))}
                           <tr className="bg-surface-container-low">
                              <td className="px-8 py-8 font-black text-black">Total Specification Value</td>
                              <td className="px-8 py-8 text-right text-3xl font-black text-black font-display">₹{formData.totalValue.toLocaleString('en-IN')}</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </section>

               {/* Maintenance */}
               <section className="grid grid-cols-2 gap-16 pt-10 border-t border-surface-container">
                  <div className="space-y-6">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary font-mono">05 Maintenance</h3>
                     <div className="p-8 bg-surface-container-low border border-outline-variant/30 rounded-3xl space-y-4">
                        <div className="flex justify-between items-center">
                           <p className="text-sm font-black text-black uppercase font-display">{formData.supportPlan.name}</p>
                           <p className="text-lg font-black text-black font-display">₹{formData.supportPlan.price}{formData.supportPlan.unit}</p>
                        </div>
                        <p className="text-[11px] font-bold text-secondary uppercase font-mono leading-relaxed">{formData.supportPlan.description}</p>
                     </div>
                  </div>
                  <div className="space-y-6">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary font-mono">06 Project Milestones</h3>
                     <div className="space-y-4">
                        {formData.milestones.map((ms, idx) => (
                           <div key={idx} className="flex gap-4 text-[11px] font-bold text-black uppercase font-mono">
                              <span className="text-outline-variant">M{idx+1}</span>
                              <span>{ms}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </section>

               {/* Signature */}
               <div className="pt-20 flex justify-between items-end">
                  <div className="space-y-8">
                     <div className="w-48 h-1 bg-black"></div>
                     <div className="space-y-1">
                        <p className="text-sm font-black text-black uppercase font-display">Authorized Signature</p>
                        <p className="text-[9px] font-bold text-secondary uppercase font-mono tracking-widest">VTRC TECHNOLOGIES CORE UNIT</p>
                     </div>
                  </div>
                  <div className="text-right">
                      <p className="text-[9px] font-bold text-outline-variant uppercase font-mono tracking-[0.5em]">DOCUMENT AUTHENTICATED</p>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quotation;
