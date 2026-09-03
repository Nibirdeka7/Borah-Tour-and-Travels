"use client";

import React, { useState, useEffect } from "react";
import {
  Lock,
  Mail,
  KeyRound,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  Clock,
  MapPin,
  Car,
  Compass,
  Sparkles,
  X,
  Settings,
  ShieldCheck,
  Phone,
  Save
} from "lucide-react";

export default function AdminPage() {
  // Auth State
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"packages" | "places" | "gallery" | "vehicles" | "settings">("packages");

  // Data States
  const [packages, setPackages] = useState<any[]>([]);
  const [places, setPlaces] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(false);

  // Package Modal / Form
  const [showPkgModal, setShowPkgModal] = useState(false);
  const [editingPkgId, setEditingPkgId] = useState<string | null>(null);
  const [pkgForm, setPkgForm] = useState({
    title: "",
    duration: "",
    price: "Contact Owner",
    image: "",
    gallery: [] as string[],
    categories: ["meghalaya"],
    route: "",
    activityLevel: "Moderate Sightseeing",
    groupSize: "1-8 Pax",
    highlights: [""] as string[],
    itinerary: [
      { day: "Day 01", title: "", overnight: "", description: "", highlights: [""] }
    ]
  });

  // Place Modal / Form
  const [showPlaceModal, setShowPlaceModal] = useState(false);
  const [editingPlaceId, setEditingPlaceId] = useState<string | null>(null);
  const [placeForm, setPlaceForm] = useState({
    name: "",
    query: "",
    distance: "",
    travelTime: "",
    description: "",
    embedUrl: "",
    image: ""
  });

  // Gallery Modal / Form
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "travelers",
    image: ""
  });

  // Vehicle Modal / Form
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);
  const [vehicleForm, setVehicleForm] = useState({
    name: "",
    brandModel: "",
    year: "New Model",
    seats: "5 Seats",
    transmission: "Manual",
    fuel: "Diesel",
    ratePerDay: "₹4,000",
    category: "sedan",
    tag: "Latest Edition",
    image: ""
  });

  // Site Settings Form
  const [settingsForm, setSettingsForm] = useState({
    phonePrimary: "+91 70026 74473",
    phoneSecondary: "+91 88220 31804",
    whatsappNumber: "917002674473",
    heroTagline: "AUTHENTICALLY NORTH EAST",
    heroTitle: "A new way to live with Nature",
    heroSubtitle: "We redesigned how travelers connect with nature, explore hidden waterfalls, and experience Assamese & NorthEast culture all in one customized private tour service.",
    ownerBadgeText: "Contact Direct Owner – No Commission",
    customTripTitle: "Want a Personalized Tour Plan?",
    customTripSubtitle: "Tell us your tentative dates, places you wish to visit, and number of travelers. We will design a custom itinerary with a dedicated private vehicle.",
    leadCaptureHeadline: "Get Instant Best Price Quote",
    leadCaptureSub: "Leave your phone number and our travel manager will call you back within 15 minutes.",
    footerAbout: "Borah Tours & Travel is a locally operated, private tour service in Northeast India specializing in Meghalaya, Assam, and Arunachal Pradesh circuits with Guwahati airport pickups."
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  // Load session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setToken(savedToken);
      fetchAdminProfile(savedToken);
    }
  }, []);

  // Fetch data when authenticated or tab changes
  useEffect(() => {
    if (token) {
      fetchTabData();
    }
  }, [token, activeTab]);

  const fetchAdminProfile = async (jwtToken: string) => {
    try {
      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });
      const data = await res.json();
      if (data.success) {
        setUserEmail(data.user.email);
      } else {
        handleLogout();
      }
    } catch {
      handleLogout();
    }
  };

  const fetchTabData = async () => {
    setLoadingData(true);
    try {
      if (activeTab === "packages") {
        const res = await fetch("/api/packages", { cache: "no-store" });
        const data = await res.json();
        if (data.success) setPackages(data.data);
      } else if (activeTab === "places") {
        const res = await fetch("/api/places", { cache: "no-store" });
        const data = await res.json();
        if (data.success) setPlaces(data.data);
      } else if (activeTab === "gallery") {
        const res = await fetch("/api/gallery", { cache: "no-store" });
        const data = await res.json();
        if (data.success) setGallery(data.data);
      } else if (activeTab === "vehicles") {
        const res = await fetch("/api/vehicles", { cache: "no-store" });
        const data = await res.json();
        if (data.success) setVehicles(data.data);
      } else if (activeTab === "settings") {
        const res = await fetch("/api/settings", { cache: "no-store" });
        const data = await res.json();
        if (data.success && data.data) {
          setSettings(data.data);
          setSettingsForm({
            phonePrimary: data.data.phonePrimary || "+91 70026 74473",
            phoneSecondary: data.data.phoneSecondary || "+91 88220 31804",
            whatsappNumber: data.data.whatsappNumber || "917002674473",
            heroTagline: data.data.heroTagline || "AUTHENTICALLY NORTH EAST",
            heroTitle: data.data.heroTitle || "A new way to live with Nature",
            heroSubtitle: data.data.heroSubtitle || "",
            ownerBadgeText: data.data.ownerBadgeText || "Contact Direct Owner – No Commission",
            customTripTitle: data.data.customTripTitle || "Want a Personalized Tour Plan?",
            customTripSubtitle: data.data.customTripSubtitle || "",
            leadCaptureHeadline: data.data.leadCaptureHeadline || "Get Instant Best Price Quote",
            leadCaptureSub: data.data.leadCaptureSub || "",
            footerAbout: data.data.footerAbout || ""
          });
        }
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoadingData(false);
    }
  };

  // Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.token);
        setUserEmail(data.user.email);
        localStorage.setItem("admin_token", data.token);
      } else {
        setAuthError(data.message || "Invalid admin credentials");
      }
    } catch (err: any) {
      setAuthError(err.message || "Login failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUserEmail("");
    localStorage.removeItem("admin_token");
  };

  // Direct File Upload to Cloudinary via /api/upload
  const handleFileUpload = async (file: File, onSuccess: (url: string) => void) => {
    if (!token) return;
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "borah_tours");

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        onSuccess(data.url);
      } else {
        alert("Upload failed: " + (data.message || "Unknown error"));
      }
    } catch (err: any) {
      alert("Image upload error: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // Package Save / Update / Delete
  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const url = "/api/packages";
      const method = editingPkgId ? "PUT" : "POST";
      const payload = editingPkgId ? { id: editingPkgId, ...pkgForm } : pkgForm;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setShowPkgModal(false);
        fetchTabData();
      } else {
        alert("Save failed: " + data.message);
      }
    } catch (err: any) {
      alert("Error saving package: " + err.message);
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;
    try {
      const res = await fetch(`/api/packages?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) fetchTabData();
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  // Place Save / Delete
  const handleSavePlace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const url = "/api/places";
      const method = editingPlaceId ? "PUT" : "POST";
      const payload = editingPlaceId ? { id: editingPlaceId, ...placeForm } : placeForm;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setShowPlaceModal(false);
        fetchTabData();
      }
    } catch (err: any) {
      alert("Error saving place: " + err.message);
    }
  };

  const handleDeletePlace = async (id: string) => {
    if (!confirm("Delete this place?")) return;
    await fetch(`/api/places?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTabData();
  };

  // Gallery Save / Delete
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !galleryForm.image) return;
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(galleryForm)
      });
      const data = await res.json();
      if (data.success) {
        setShowGalleryModal(false);
        fetchTabData();
      }
    } catch (err: any) {
      alert("Error saving gallery photo: " + err.message);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm("Delete this photo?")) return;
    await fetch(`/api/gallery?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTabData();
  };

  // Vehicle Save / Delete
  const handleSaveVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const url = "/api/vehicles";
      const method = editingVehicleId ? "PUT" : "POST";
      const payload = editingVehicleId ? { id: editingVehicleId, ...vehicleForm } : vehicleForm;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setShowVehicleModal(false);
        fetchTabData();
      }
    } catch (err: any) {
      alert("Error saving vehicle: " + err.message);
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    if (!confirm("Delete this vehicle?")) return;
    await fetch(`/api/vehicles?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTabData();
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settingsForm)
      });
      const data = await res.json();
      if (data.success) {
        alert("Site Settings updated successfully!");
      }
    } catch (err: any) {
      alert("Error saving settings: " + err.message);
    }
  };

  // ----------------------------------------------------
  // UNAUTHENTICATED LOGIN SCREEN
  // ----------------------------------------------------
  if (!token) {
    return (
      <div className="min-h-screen bg-[#143021] flex items-center justify-center p-4 font-manrope">
        <div className="bg-[#1e4630] border border-emerald-500/20 text-white rounded-3xl p-6 sm:p-10 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#c6f022] text-[#1e4630] flex items-center justify-center mx-auto shadow-lg font-extrabold text-xl">
              BT
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Borah Tours Admin</h1>
            <p className="text-xs text-emerald-200">
              Sign in to edit tour itineraries, places, vehicles & content
            </p>
          </div>

          {authError && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-200 text-xs p-3.5 rounded-xl font-medium text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-emerald-200 block mb-1.5 uppercase tracking-wider">
                Admin Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter Admin Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-black/30 border border-emerald-500/30 rounded-xl px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:border-[#c6f022]"
                />
                <Mail size={16} className="absolute left-3.5 top-3.5 text-emerald-400" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-emerald-200 block mb-1.5 uppercase tracking-wider">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-black/30 border border-emerald-500/30 rounded-xl px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:border-[#c6f022]"
                />
                <KeyRound size={16} className="absolute left-3.5 top-3.5 text-emerald-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 rounded-xl bg-[#c6f022] text-[#1e4630] font-bold text-sm shadow-xl hover:bg-lime-400 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {authLoading ? "Authenticating..." : "Sign In to Admin Portal"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // AUTHENTICATED DASHBOARD PORTAL
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#f7f8f4] text-[#1c1716] font-manrope">
      
      {/* Top Navbar */}
      <header className="bg-[#1e4630] text-white py-4 px-4 sm:px-8 flex items-center justify-between shadow-md border-b border-emerald-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#c6f022] text-[#1e4630] font-bold flex items-center justify-center text-lg shadow-sm">
            BT
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-bold tracking-tight">Borah Tours Admin Control</h1>
            <span className="text-[11px] text-emerald-200 font-mono block">Admin: {userEmail}</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-black/40 hover:bg-black/60 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border border-white/10"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 no-scrollbar bg-white p-2 rounded-2xl border border-gray-200/90 shadow-sm mb-6 sm:mb-8">
          {[
            { id: "packages", label: "Tour Packages & Itineraries", icon: Compass, count: packages.length },
            { id: "places", label: "Destinations & Places", icon: MapPin, count: places.length },
            { id: "gallery", label: "Traveler Photo Gallery", icon: ImageIcon, count: gallery.length },
            { id: "vehicles", label: "Vehicle Fleet & Rates", icon: Car, count: vehicles.length },
            { id: "settings", label: "Site Settings & Info", icon: Settings, count: null },
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#1e4630] text-[#c6f022] shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <IconComp size={16} />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-[#c6f022]/20 text-[#c6f022]" : "bg-gray-100 text-gray-500"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ------------------ TAB 1: TOUR PACKAGES ------------------ */}
        {activeTab === "packages" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">Tour Packages & Day-by-Day Itineraries</h2>
                <p className="text-xs sm:text-sm text-gray-500">Edit existing seeded itineraries or post new custom packages</p>
              </div>
              <button
                onClick={() => {
                  setEditingPkgId(null);
                  setPkgForm({
                    title: "",
                    duration: "",
                    price: "Contact Owner",
                    image: "",
                    gallery: [],
                    categories: ["meghalaya"],
                    route: "",
                    activityLevel: "Moderate Sightseeing",
                    groupSize: "1-8 Pax",
                    highlights: [""],
                    itinerary: [{ day: "Day 01", title: "", overnight: "", description: "", highlights: [""] }]
                  });
                  setShowPkgModal(true);
                }}
                className="btn-hover bg-[#1e4630] text-[#c6f022] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Plus size={16} />
                <span>Add New Package</span>
              </button>
            </div>

            {loadingData ? (
              <div className="text-center py-12 text-sm text-gray-500">Loading tour packages...</div>
            ) : packages.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl text-center border border-gray-200 space-y-3">
                <Compass size={32} className="mx-auto text-gray-400" />
                <p className="text-sm font-bold">No packages in database</p>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Run <code className="bg-gray-100 px-1 py-0.5 rounded text-emerald-800">npm run seed</code> to populate all home page packages into MongoDB!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {packages.map((pkg) => (
                  <div key={pkg._id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between p-4 space-y-3">
                    <div>
                      <div className="relative h-44 rounded-xl overflow-hidden bg-gray-100 mb-3">
                        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-black/60 text-[#c6f022] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          {pkg.duration}
                        </span>
                      </div>
                      <h3 className="font-bold text-base leading-snug">{pkg.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">Route: {pkg.route}</p>
                      <div className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md mt-2">
                        {pkg.itinerary?.length || 0} Day-by-Day Itinerary Steps
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                      <button
                        onClick={() => {
                          setEditingPkgId(pkg._id);
                          setPkgForm({
                            title: pkg.title,
                            duration: pkg.duration,
                            price: pkg.price || "Contact Owner",
                            image: pkg.image,
                            gallery: pkg.gallery || [],
                            categories: pkg.categories || ["meghalaya"],
                            route: pkg.route || "",
                            activityLevel: pkg.activityLevel || "Moderate",
                            groupSize: pkg.groupSize || "1-8 Pax",
                            highlights: pkg.highlights?.length ? pkg.highlights : [""],
                            itinerary: pkg.itinerary?.length ? pkg.itinerary : [{ day: "Day 01", title: "", overnight: "", description: "", highlights: [""] }]
                          });
                          setShowPkgModal(true);
                        }}
                        className="text-xs font-bold text-[#1e4630] flex items-center gap-1 hover:underline cursor-pointer bg-emerald-50 px-2.5 py-1.5 rounded-lg"
                      >
                        <Edit size={14} /> Edit Itinerary
                      </button>

                      <button
                        onClick={() => handleDeletePackage(pkg._id)}
                        className="text-xs font-bold text-red-600 flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ------------------ TAB 2: PLACES ------------------ */}
        {activeTab === "places" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">Destinations & Places</h2>
                <p className="text-xs sm:text-sm text-gray-500">Edit map locations, distances, and drive times</p>
              </div>
              <button
                onClick={() => {
                  setEditingPlaceId(null);
                  setPlaceForm({ name: "", query: "", distance: "", travelTime: "", description: "", embedUrl: "", image: "" });
                  setShowPlaceModal(true);
                }}
                className="btn-hover bg-[#1e4630] text-[#c6f022] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Plus size={16} />
                <span>Add New Place</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {places.map((p) => (
                <div key={p._id} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-2 flex flex-col justify-between">
                  <div>
                    {p.image && <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded-xl mb-2" />}
                    <h3 className="font-bold text-base">{p.name}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{p.description}</p>
                    <div className="text-[11px] text-gray-500 space-y-0.5 pt-2 border-t border-gray-100 mt-2">
                      <div>Distance: {p.distance}</div>
                      <div>Drive: {p.travelTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setEditingPlaceId(p._id);
                        setPlaceForm({
                          name: p.name,
                          query: p.query || "",
                          distance: p.distance || "",
                          travelTime: p.travelTime || "",
                          description: p.description || "",
                          embedUrl: p.embedUrl || "",
                          image: p.image || ""
                        });
                        setShowPlaceModal(true);
                      }}
                      className="text-xs font-bold text-[#1e4630] flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <Edit size={13} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeletePlace(p._id)}
                      className="text-xs font-bold text-red-600 flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------ TAB 3: GALLERY ------------------ */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">Traveler Photo Gallery</h2>
                <p className="text-xs sm:text-sm text-gray-500">Upload and manage traveler photos</p>
              </div>
              <button
                onClick={() => {
                  setGalleryForm({ title: "", category: "travelers", image: "" });
                  setShowGalleryModal(true);
                }}
                className="btn-hover bg-[#1e4630] text-[#c6f022] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Plus size={16} />
                <span>Upload Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {gallery.map((g) => (
                <div key={g._id} className="relative group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  <img src={g.image} alt={g.title || "Gallery photo"} className="w-full h-40 object-cover" />
                  <div className="p-2.5 flex items-center justify-between bg-white text-xs">
                    <span className="font-semibold text-gray-700 truncate max-w-[100px]">{g.title || "Tour Photo"}</span>
                    <button
                      onClick={() => handleDeleteGallery(g._id)}
                      className="text-red-600 hover:text-red-800 p-1 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------ TAB 4: VEHICLES ------------------ */}
        {activeTab === "vehicles" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">Vehicle Fleet & Car Rates</h2>
                <p className="text-xs sm:text-sm text-gray-500">Edit vehicle models, daily rates, and seater variants</p>
              </div>
              <button
                onClick={() => {
                  setEditingVehicleId(null);
                  setVehicleForm({
                    name: "",
                    brandModel: "",
                    year: "New Model",
                    seats: "5 Seats",
                    transmission: "Manual",
                    fuel: "Diesel",
                    ratePerDay: "₹4,000",
                    category: "sedan",
                    tag: "Latest Edition",
                    image: ""
                  });
                  setShowVehicleModal(true);
                }}
                className="btn-hover bg-[#1e4630] text-[#c6f022] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Plus size={16} />
                <span>Add Vehicle</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {vehicles.map((v) => (
                <div key={v._id} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-3 flex flex-col justify-between">
                  <div>
                    {v.image && <img src={v.image} alt={v.name} className="w-full h-36 object-cover rounded-xl mb-2" />}
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base">{v.name}</h3>
                      <span className="text-emerald-800 font-extrabold text-sm">{v.ratePerDay}/day</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Seats: {v.seats} • {v.fuel}</div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setEditingVehicleId(v._id);
                        setVehicleForm({
                          name: v.name,
                          brandModel: v.brandModel || "",
                          year: v.year || "New Model",
                          seats: v.seats || "5 Seats",
                          transmission: v.transmission || "Manual",
                          fuel: v.fuel || "Diesel",
                          ratePerDay: v.ratePerDay || "₹4,000",
                          category: v.category || "sedan",
                          tag: v.tag || "",
                          image: v.image || ""
                        });
                        setShowVehicleModal(true);
                      }}
                      className="text-xs font-bold text-[#1e4630] flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <Edit size={13} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteVehicle(v._id)}
                      className="text-xs font-bold text-red-600 flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------ TAB 5: SITE SETTINGS ------------------ */}
        {activeTab === "settings" && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Website Content & Contact Settings</h2>
              <p className="text-xs sm:text-sm text-gray-500">Edit hero titles, contact phone numbers, custom trip text & footer copy</p>
            </div>

            <form onSubmit={handleSaveSettings} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 text-xs sm:text-sm">
              
              {/* Contact Information */}
              <div className="space-y-4 pb-4 border-b border-gray-200">
                <h3 className="font-bold text-base text-[#1e4630]">Contact Numbers & WhatsApp</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Primary Phone</label>
                    <input
                      type="text"
                      required
                      value={settingsForm.phonePrimary}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phonePrimary: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl p-2.5"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Secondary Phone</label>
                    <input
                      type="text"
                      value={settingsForm.phoneSecondary}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phoneSecondary: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl p-2.5"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">WhatsApp Direct Number (Digits only)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 917002674473"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5"
                  />
                </div>
              </div>

              {/* Hero Banner Content */}
              <div className="space-y-4 pb-4 border-b border-gray-200">
                <h3 className="font-bold text-base text-[#1e4630]">Hero Banner Content</h3>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Hero Badge Tagline</label>
                  <input
                    type="text"
                    value={settingsForm.heroTagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroTagline: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Hero Main Title</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.heroTitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroTitle: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5 font-bold text-base text-[#1e4630]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Hero Subtitle Paragraph</label>
                  <textarea
                    rows={3}
                    required
                    value={settingsForm.heroSubtitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtitle: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5 leading-relaxed"
                  ></textarea>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Direct Owner Badge Text</label>
                  <input
                    type="text"
                    value={settingsForm.ownerBadgeText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, ownerBadgeText: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5"
                  />
                </div>
              </div>

              {/* Custom Trip & Lead Capture Section */}
              <div className="space-y-4 pb-4 border-b border-gray-200">
                <h3 className="font-bold text-base text-[#1e4630]">Custom Trip & Call Lead Sections</h3>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Custom Trip Section Title</label>
                  <input
                    type="text"
                    value={settingsForm.customTripTitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, customTripTitle: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Custom Trip Description</label>
                  <textarea
                    rows={2}
                    value={settingsForm.customTripSubtitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, customTripSubtitle: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5"
                  ></textarea>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Lead Capture Section Headline</label>
                  <input
                    type="text"
                    value={settingsForm.leadCaptureHeadline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, leadCaptureHeadline: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Lead Capture Subtitle</label>
                  <input
                    type="text"
                    value={settingsForm.leadCaptureSub}
                    onChange={(e) => setSettingsForm({ ...settingsForm, leadCaptureSub: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5"
                  />
                </div>
              </div>

              {/* Footer Content */}
              <div className="space-y-4">
                <h3 className="font-bold text-base text-[#1e4630]">Footer Content</h3>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Footer About Description</label>
                  <textarea
                    rows={3}
                    value={settingsForm.footerAbout}
                    onChange={(e) => setSettingsForm({ ...settingsForm, footerAbout: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="btn-hover w-full py-3.5 bg-[#1e4630] text-[#c6f022] font-bold text-sm rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Save size={16} />
                <span>Save All Website Content Settings</span>
              </button>
            </form>
          </div>
        )}

      </div>

      {/* ------------------ MODAL: PACKAGE EDITOR ------------------ */}
      {showPkgModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 font-manrope">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 sm:p-6 bg-[#1e4630] text-white flex items-center justify-between shrink-0">
              <h3 className="text-lg font-bold">
                {editingPkgId ? "Edit Tour Package & Itinerary" : "Create New Tour Package"}
              </h3>
              <button onClick={() => setShowPkgModal(false)} className="text-white/80 hover:text-white cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Package Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5 Days Meghalaya Full Odyssey"
                    value={pkgForm.title}
                    onChange={(e) => setPkgForm({ ...pkgForm, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5 Days / 4 Nights"
                    value={pkgForm.duration}
                    onChange={(e) => setPkgForm({ ...pkgForm, duration: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Route Flow</label>
                  <input
                    type="text"
                    placeholder="e.g. Guwahati → Cherrapunji → Dawki → Guwahati"
                    value={pkgForm.route}
                    onChange={(e) => setPkgForm({ ...pkgForm, route: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Price Note</label>
                  <input
                    type="text"
                    placeholder="Contact Owner"
                    value={pkgForm.price}
                    onChange={(e) => setPkgForm({ ...pkgForm, price: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5"
                  />
                </div>
              </div>

              {/* Cover Image Direct File Upload to Cloudinary */}
              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 space-y-2">
                <label className="font-bold text-[#1e4630] block">
                  Cover Photo (Upload file to Cloudinary)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, (url) => setPkgForm((prev) => ({ ...prev, image: url })));
                    }}
                    className="text-xs"
                  />
                  {uploadingImage && <span className="text-xs font-semibold text-emerald-700">Uploading...</span>}
                </div>
                {pkgForm.image && (
                  <div className="mt-2 h-24 w-40 rounded-xl overflow-hidden border border-emerald-300">
                    <img src={pkgForm.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Day-by-Day Itinerary Editor */}
              <div className="space-y-4 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base text-[#1e4630]">Day-by-Day Detailed Itinerary</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const dayNum = String(pkgForm.itinerary.length + 1).padStart(2, "0");
                      setPkgForm({
                        ...pkgForm,
                        itinerary: [
                          ...pkgForm.itinerary,
                          { day: `Day ${dayNum}`, title: "", overnight: "", description: "", highlights: [""] }
                        ]
                      });
                    }}
                    className="bg-emerald-100 text-[#1e4630] px-3 py-1 rounded-lg font-bold text-xs cursor-pointer hover:bg-emerald-200"
                  >
                    + Add Day Step
                  </button>
                </div>

                {pkgForm.itinerary.map((step, sIdx) => (
                  <div key={sIdx} className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1e4630]">{step.day}</span>
                      {pkgForm.itinerary.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = pkgForm.itinerary.filter((_, i) => i !== sIdx);
                            setPkgForm({ ...pkgForm, itinerary: updated });
                          }}
                          className="text-red-600 font-bold text-xs"
                        >
                          Remove Day
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Day Title (e.g. Guwahati to Cherrapunji Drive)"
                        value={step.title}
                        onChange={(e) => {
                          const updated = [...pkgForm.itinerary];
                          updated[sIdx].title = e.target.value;
                          setPkgForm({ ...pkgForm, itinerary: updated });
                        }}
                        className="border border-gray-300 rounded-xl p-2"
                      />
                      <input
                        type="text"
                        placeholder="Overnight Stay Location (e.g. Cherrapunji)"
                        value={step.overnight}
                        onChange={(e) => {
                          const updated = [...pkgForm.itinerary];
                          updated[sIdx].overnight = e.target.value;
                          setPkgForm({ ...pkgForm, itinerary: updated });
                        }}
                        className="border border-gray-300 rounded-xl p-2"
                      />
                    </div>

                    <textarea
                      rows={2}
                      placeholder="Day Activity Description..."
                      value={step.description}
                      onChange={(e) => {
                        const updated = [...pkgForm.itinerary];
                        updated[sIdx].description = e.target.value;
                        setPkgForm({ ...pkgForm, itinerary: updated });
                      }}
                      className="w-full border border-gray-300 rounded-xl p-2"
                    ></textarea>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowPkgModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-hover px-6 py-2.5 bg-[#1e4630] text-[#c6f022] font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Publish Package to Website
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------ MODAL: PLACE EDITOR ------------------ */}
      {showPlaceModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-[#1e4630]">
              {editingPlaceId ? "Edit Destination Place" : "Add Destination Place"}
            </h3>
            <form onSubmit={handleSavePlace} className="space-y-3 text-xs sm:text-sm">
              <input
                type="text"
                required
                placeholder="Place Name (e.g. Cherrapunji)"
                value={placeForm.name}
                onChange={(e) => setPlaceForm({ ...placeForm, name: e.target.value })}
                className="w-full border border-gray-300 rounded-xl p-2.5"
              />
              <input
                type="text"
                placeholder="Distance (e.g. 54 km from Shillong)"
                value={placeForm.distance}
                onChange={(e) => setPlaceForm({ ...placeForm, distance: e.target.value })}
                className="w-full border border-gray-300 rounded-xl p-2.5"
              />
              <input
                type="text"
                placeholder="Drive Time (e.g. 1.5 Hours Mountain Drive)"
                value={placeForm.travelTime}
                onChange={(e) => setPlaceForm({ ...placeForm, travelTime: e.target.value })}
                className="w-full border border-gray-300 rounded-xl p-2.5"
              />
              <textarea
                rows={2}
                placeholder="Short Description"
                value={placeForm.description}
                onChange={(e) => setPlaceForm({ ...placeForm, description: e.target.value })}
                className="w-full border border-gray-300 rounded-xl p-2.5"
              ></textarea>
              <div className="space-y-1">
                <label className="font-bold text-gray-700 block">Photo (Cloudinary Upload)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFileUpload(f, (url) => setPlaceForm((prev) => ({ ...prev, image: url })));
                  }}
                  className="text-xs w-full"
                />
                {uploadingImage && (
                  <p className="text-xs font-semibold text-emerald-700 mt-1 animate-pulse">Uploading photo to Cloudinary...</p>
                )}
              </div>
              {placeForm.image && (
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-emerald-800">Uploaded Image Preview:</p>
                  <img src={placeForm.image} alt="Preview" className="h-32 w-full object-cover rounded-xl border border-emerald-300 shadow-sm" />
                </div>
              )}
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowPlaceModal(false)} className="px-3 py-2 font-bold text-gray-500 cursor-pointer">Cancel</button>
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="px-5 py-2 bg-[#1e4630] text-[#c6f022] font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {uploadingImage ? "Uploading..." : "Save Place"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------ MODAL: GALLERY UPLOADER ------------------ */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-[#1e4630]">Upload Traveler Gallery Photo</h3>
            <form onSubmit={handleSaveGallery} className="space-y-3 text-xs sm:text-sm">
              <input
                type="text"
                placeholder="Photo Title / Caption"
                value={galleryForm.title}
                onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                className="w-full border border-gray-300 rounded-xl p-2.5"
              />
              <div>
                <label className="font-bold text-gray-700 block mb-1">Select Photo File from Device</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFileUpload(f, (url) => setGalleryForm((prev) => ({ ...prev, image: url })));
                  }}
                  className="text-xs w-full"
                />
                {uploadingImage && (
                  <p className="text-xs font-semibold text-emerald-700 mt-1 animate-pulse">Uploading photo to Cloudinary...</p>
                )}
              </div>
              {galleryForm.image && (
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-emerald-800">Uploaded Image Preview:</p>
                  <img src={galleryForm.image} alt="Preview" className="h-36 w-full object-cover rounded-xl border border-emerald-300 shadow-sm" />
                </div>
              )}
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowGalleryModal(false)} className="px-3 py-2 font-bold text-gray-500 cursor-pointer">Cancel</button>
                <button
                  type="submit"
                  disabled={uploadingImage || !galleryForm.image}
                  className="px-5 py-2 bg-[#1e4630] text-[#c6f022] font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {uploadingImage ? "Uploading..." : "Upload to Website"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------ MODAL: VEHICLE EDITOR ------------------ */}
      {showVehicleModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-[#1e4630]">
              {editingVehicleId ? "Edit Vehicle" : "Add Vehicle to Fleet"}
            </h3>
            <form onSubmit={handleSaveVehicle} className="space-y-3 text-xs sm:text-sm">
              <input
                type="text"
                required
                placeholder="Vehicle Name (e.g. Maruti Suzuki Swift Dzire)"
                value={vehicleForm.name}
                onChange={(e) => setVehicleForm({ ...vehicleForm, name: e.target.value })}
                className="w-full border border-gray-300 rounded-xl p-2.5"
              />
              <input
                type="text"
                required
                placeholder="Daily Rate (e.g. ₹4,000)"
                value={vehicleForm.ratePerDay}
                onChange={(e) => setVehicleForm({ ...vehicleForm, ratePerDay: e.target.value })}
                className="w-full border border-gray-300 rounded-xl p-2.5"
              />
              <input
                type="text"
                placeholder="Seats (e.g. 5 Seats)"
                value={vehicleForm.seats}
                onChange={(e) => setVehicleForm({ ...vehicleForm, seats: e.target.value })}
                className="w-full border border-gray-300 rounded-xl p-2.5"
              />
              <div>
                <label className="font-bold text-gray-700 block mb-1">Vehicle Image (Cloudinary Upload)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFileUpload(f, (url) => setVehicleForm((prev) => ({ ...prev, image: url })));
                  }}
                  className="text-xs w-full"
                />
                {uploadingImage && (
                  <p className="text-xs font-semibold text-emerald-700 mt-1 animate-pulse">Uploading vehicle photo to Cloudinary...</p>
                )}
              </div>
              {vehicleForm.image && (
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-emerald-800">Uploaded Image Preview:</p>
                  <img src={vehicleForm.image} alt="Preview" className="h-32 w-full object-cover rounded-xl border border-emerald-300 shadow-sm" />
                </div>
              )}
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowVehicleModal(false)} className="px-3 py-2 font-bold text-gray-500 cursor-pointer">Cancel</button>
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="px-5 py-2 bg-[#1e4630] text-[#c6f022] font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {uploadingImage ? "Uploading..." : "Save Vehicle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
