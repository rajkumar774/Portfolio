"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { InteractiveGlobe } from "../ui/interactive-globe";

export function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    
    // Simulate API delay
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (status === "error") setStatus("idle");
  };

  return (
    <section id="contact" className="relative py-32 md:py-48 overflow-hidden scroll-mt-32">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Uppercase Section Label */}
        <div className="flex flex-col items-start text-left mb-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#c9a55c]" />
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c9a55c] uppercase font-sans">
              04. INQUIRIES
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-normal font-display tracking-tight text-[#f5f5f7] mb-8">
            Get In Touch
          </h2>
        </div>

        {/* Form & details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Panel: details & Globe */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left gap-12">
            <div className="flex flex-col gap-8 w-full">
              <p className="text-slate-300 text-sm md:text-base leading-loose font-light font-sans">
                Whether you want to discuss systems engineering projects, explore DevSecOps automation pipelines, or talk about autonomous rovers, feel free to send a message. I am always open to collaborations.
              </p>

              {/* Direct details */}
              <div className="space-y-6">
                <div className="flex items-center gap-5 p-5 bg-[#050508] border border-[#c9a55c]/15">
                  <div className="w-12 h-12 flex items-center justify-center text-[#c9a55c] border border-[#c9a55c]/30 bg-[#c9a55c]/5">
                    <Mail size={18} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-sans text-[#c9a55c] uppercase font-semibold tracking-widest mb-1">Email</span>
                    <a href="mailto:rajkumarns.dev@gmail.com" className="text-sm font-medium text-[#f5f5f7] hover:text-[#e8c874] transition-colors select-all">
                      rajkumarns.dev@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-5 p-5 bg-[#050508] border border-[#c9a55c]/15">
                  <div className="w-12 h-12 flex items-center justify-center text-[#c9a55c] border border-[#c9a55c]/30 bg-[#c9a55c]/5">
                    <Phone size={18} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-sans text-[#c9a55c] uppercase font-semibold tracking-widest mb-1">Contact Number</span>
                    <span className="text-sm font-medium text-[#f5f5f7] select-all">
                      +91 98765 43210
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-5 p-5 bg-[#050508] border border-[#c9a55c]/15">
                  <div className="w-12 h-12 flex items-center justify-center text-[#c9a55c] border border-[#c9a55c]/30 bg-[#c9a55c]/5">
                    <MapPin size={18} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-sans text-[#c9a55c] uppercase font-semibold tracking-widest mb-1">Location</span>
                    <span className="text-sm font-medium text-[#f5f5f7]">
                      Tamil Nadu, India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Canvas Globe */}
            <div className="w-full flex justify-center py-4 opacity-50 grayscale contrast-125 sepia hover:grayscale-0 hover:sepia-0 hover:opacity-100 transition-all duration-1000">
              <InteractiveGlobe />
            </div>
          </div>

          {/* Right Panel: Glass Form */}
          <div className="lg:col-span-7">
            <GlassCard className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Inputs name + email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label htmlFor="name" className="text-[10px] font-sans font-semibold tracking-[0.2em] text-[#c9a55c] uppercase">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Alex Mercer"
                      required
                      className="w-full px-5 py-4 bg-[#020203] border border-[#c9a55c]/20 text-[#f5f5f7] placeholder-slate-600 focus:outline-none focus:border-[#c9a55c]/60 focus:bg-[#020203] transition-all duration-500 text-sm font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label htmlFor="email" className="text-[10px] font-sans font-semibold tracking-[0.2em] text-[#c9a55c] uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="alex@example.com"
                      required
                      className="w-full px-5 py-4 bg-[#020203] border border-[#c9a55c]/20 text-[#f5f5f7] placeholder-slate-600 focus:outline-none focus:border-[#c9a55c]/60 focus:bg-[#020203] transition-all duration-500 text-sm font-sans"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-3">
                  <label htmlFor="subject" className="text-[10px] font-sans font-semibold tracking-[0.2em] text-[#c9a55c] uppercase">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder="Project collaboration details..."
                    className="w-full px-5 py-4 bg-[#020203] border border-[#c9a55c]/20 text-[#f5f5f7] placeholder-slate-600 focus:outline-none focus:border-[#c9a55c]/60 focus:bg-[#020203] transition-all duration-500 text-sm font-sans"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-3">
                  <label htmlFor="message" className="text-[10px] font-sans font-semibold tracking-[0.2em] text-[#c9a55c] uppercase">
                    Message Content *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Hello Rajkumar, I would like to discuss..."
                    required
                    className="w-full px-5 py-4 bg-[#020203] border border-[#c9a55c]/20 text-[#f5f5f7] placeholder-slate-600 focus:outline-none focus:border-[#c9a55c]/60 focus:bg-[#020203] transition-all duration-500 text-sm resize-none font-sans"
                  />
                </div>

                {/* Status Messages */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="p-5 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs flex items-center gap-3 font-sans"
                    >
                      <CheckCircle size={16} strokeWidth={1.5} />
                      <span>Message dispatched successfully! I will reach back to you shortly.</span>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="p-5 border border-red-500/20 bg-red-500/5 text-red-400 text-xs flex items-center gap-3 font-sans"
                    >
                      <AlertTriangle size={16} strokeWidth={1.5} />
                      <span>Please ensure all required fields are filled out.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="w-full flex items-center justify-center gap-3 px-8 py-5 text-xs font-semibold tracking-[0.25em] text-[#e8c874] bg-[#050508] border border-[#c9a55c]/40 hover:bg-[#c9a55c]/10 disabled:opacity-50 transition-all duration-700 cursor-pointer uppercase"
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 rounded-full border-2 border-[#c9a55c]/30 border-t-[#c9a55c] animate-spin" />
                  ) : (
                    <>
                      <Send size={15} strokeWidth={1.5} />
                      <span>TRANSMIT INQUIRY</span>
                    </>
                  )}
                </button>

              </form>
            </GlassCard>
          </div>

        </div>

      </div>
    </section>
  );
}
