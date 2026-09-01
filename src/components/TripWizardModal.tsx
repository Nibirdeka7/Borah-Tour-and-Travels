"use client";

import React, { useState, useEffect } from "react";
import { X, Check, ArrowRight, ChevronLeft, MapPin, Calendar, Users, Car, Compass, Sparkles } from "lucide-react";

interface TripWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageTitle?: string;
}

export default function TripWizardModal({
  isOpen,
  onClose,
  initialPackageTitle,
}: TripWizardModalProps) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    destination: initialPackageTitle || "Meghalaya (Shillong & Cherrapunji)",
    travelers: "2-4 People",
    travelDates: "",
    activityLevel: "Moderate (Sightseeing + Easy Walks)",
    accommodationStyle: "Cozy Boutique Homestay / Resort",
    vehicleType: "Private Sedan / SUV",
    specialRequests: "",
  });

  useEffect(() => {
    if (initialPackageTitle) {
      setFormData((prev) => ({ ...prev, destination: initialPackageTitle }));
    }
  }, [initialPackageTitle]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (!formData.fullName.trim() || !formData.contactNumber.trim()) {
      setErrorMsg("Please provide your name and contact number.");
      return;
    }
    setErrorMsg("");
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Format WhatsApp message
    const phoneNumber = "919876543210";
    const message = `Hi Borah Tours & Travel! I want to plan a custom trip:
- *Name:* ${formData.fullName}
- *Contact:* ${formData.contactNumber}
- *Email:* ${formData.email || "N/A"}
- *Destination:* ${formData.destination}
- *Travelers:* ${formData.travelers}
- *Dates:* ${formData.travelDates || "Flexible"}
- *Pace:* ${formData.activityLevel}
- *Stays:* ${formData.accommodationStyle}
- *Vehicle:* ${formData.vehicleType}
${formData.specialRequests ? `- *Special Requests:* ${formData.specialRequests}` : ""}`;

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);

      const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank");

      setTimeout(() => {
        setSubmitted(false);
        setStep(1);
        onClose();
      }, 3500);
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-[32px] w-full max-w-2xl relative overflow-hidden shadow-2xl animate-in my-8 border border-black/5">
        <div className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto font-manrope">
          
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#1e4630] flex items-center justify-center text-[#c6f022]">
                <Sparkles size={18} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1c1716] leading-tight">
                  Design Your Private Trip
                </h2>
                <p className="text-xs text-gray-500">
                  Customized Northeast India Tour Wizard
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-[#1c1716] hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-[#c6f022] text-[#1e4630] rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Check size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#1c1716]">
                Trip Request Sent!
              </h3>
              <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed">
                Thank you, <span className="font-semibold text-[#1e4630]">{formData.fullName}</span>! We’ve opened WhatsApp to connect you directly with our tour strategist.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-[#1e4630] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${(step / 2) * 100}%` }}
                ></div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                  {errorMsg}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4 animate-in">
                  <div className="border-b border-gray-100 pb-3 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1e4630]">
                      Step 1 of 2: Basic Contact & Trip Scope
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#1e4630] focus:ring-2 focus:ring-[#1e4630]/20 outline-none transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#1e4630] focus:ring-2 focus:ring-[#1e4630]/20 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rahul@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#1e4630] focus:ring-2 focus:ring-[#1e4630]/20 outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Primary Region / Package
                      </label>
                      <select
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#1e4630] focus:ring-2 focus:ring-[#1e4630]/20 outline-none transition-all bg-white"
                      >
                        <option value="Meghalaya (Shillong & Sohra Retreat)">
                          Meghalaya (Shillong & Sohra Retreat)
                        </option>
                        <option value="Meghalaya Family Odyssey (6 Days)">
                          Meghalaya Family Odyssey (6 Days)
                        </option>
                        <option value="Ultimate Meghalaya Adventure (Root Bridges)">
                          Ultimate Meghalaya Adventure (Root Bridges)
                        </option>
                        <option value="Assam Wildlife & Brahmaputra Trails">
                          Assam Wildlife & Brahmaputra Trails
                        </option>
                        <option value="Arunachal Pradesh (Tawang Circuit)">
                          Arunachal Pradesh (Tawang Circuit)
                        </option>
                        <option value="Multi-State Grand Northeast Explorer">
                          Multi-State Grand Northeast Explorer
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Number of Travelers
                      </label>
                      <select
                        name="travelers"
                        value={formData.travelers}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#1e4630] focus:ring-2 focus:ring-[#1e4630]/20 outline-none transition-all bg-white"
                      >
                        <option value="Solo Traveler">Solo Traveler</option>
                        <option value="Couple (2 Pax)">Couple (2 Pax)</option>
                        <option value="Family / Small Group (3-5 Pax)">
                          Family / Small Group (3-5 Pax)
                        </option>
                        <option value="Large Group (6+ Pax)">
                          Large Group (6+ Pax)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Tentative Travel Dates / Month
                    </label>
                    <input
                      type="text"
                      name="travelDates"
                      value={formData.travelDates}
                      onChange={handleChange}
                      placeholder="e.g. Next month / Oct 15 - Oct 20"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#1e4630] focus:ring-2 focus:ring-[#1e4630]/20 outline-none transition-all"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-hover bg-[#1e4630] text-[#c6f022] font-semibold text-sm px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#153423] transition-all cursor-pointer"
                    >
                      <span>Continue to Preferences</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-in">
                  <div className="border-b border-gray-100 pb-3 mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1e4630]">
                      Step 2 of 2: Custom Comfort & Style
                    </span>
                    <button
                      type="button"
                      onClick={handleBack}
                      className="text-xs text-gray-500 hover:text-[#1e4630] flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft size={14} />
                      Back to Step 1
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Pace & Activity Level
                    </label>
                    <select
                      name="activityLevel"
                      value={formData.activityLevel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#1e4630] focus:ring-2 focus:ring-[#1e4630]/20 outline-none transition-all bg-white"
                    >
                      <option value="Relaxed (Panoramic Sightseeing & Easy Walks)">
                        Relaxed (Panoramic Sightseeing & Easy Walks)
                      </option>
                      <option value="Moderate (Living Root Bridges & Waterfalls)">
                        Moderate (Living Root Bridges & Waterfalls)
                      </option>
                      <option value="Active Adventure (Bamboo Trails, Caving & Kayaking)">
                        Active Adventure (Bamboo Trails, Caving & Kayaking)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Accommodation Style
                    </label>
                    <select
                      name="accommodationStyle"
                      value={formData.accommodationStyle}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#1e4630] focus:ring-2 focus:ring-[#1e4630]/20 outline-none transition-all bg-white"
                    >
                      <option value="Cozy Boutique Homestay / Standard Hotel">
                        Cozy Boutique Homestay / Standard Hotel
                      </option>
                      <option value="Premium Resort / Luxury Eco Lodge">
                        Premium Resort / Luxury Eco Lodge
                      </option>
                      <option value="Mix of Riverside Tents & Homestays">
                        Mix of Riverside Tents & Homestays
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Private Vehicle Preference
                    </label>
                    <select
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#1e4630] focus:ring-2 focus:ring-[#1e4630]/20 outline-none transition-all bg-white"
                    >
                      <option value="Comfort Sedan (Dzire / Etios for 2-3 pax)">
                        Comfort Sedan (Dzire / Etios for 2-3 pax)
                      </option>
                      <option value="Spacious SUV (Innova / Ertiga / Bolero)">
                        Spacious SUV (Innova / Ertiga / Bolero)
                      </option>
                      <option value="Tempo Traveller (For 8+ Pax Groups)">
                        Tempo Traveller (For 8+ Pax Groups)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Special Requests / Notes (Optional)
                    </label>
                    <textarea
                      name="specialRequests"
                      rows={3}
                      value={formData.specialRequests}
                      onChange={handleChange}
                      placeholder="Mention any specific places you want to visit, dietary requirements, or flight timing..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#1e4630] focus:ring-2 focus:ring-[#1e4630]/20 outline-none transition-all"
                    ></textarea>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-5 py-2.5 text-xs font-semibold text-gray-600 hover:text-[#1e4630] transition-colors cursor-pointer"
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-hover bg-[#c6f022] text-[#1e4630] font-bold text-sm px-8 py-3 rounded-full flex items-center gap-2 shadow-lg hover:opacity-95 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Submit & Connect on WhatsApp</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
