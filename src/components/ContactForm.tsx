"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Send, Mail, Phone, BookAIcon, Sparkles } from "lucide-react";
import { Heart, Star, Circle } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import FloatingIcon from "./icon-background";
import BackgroundBlobs from "./BackgroundBlobs";
import bolt from "/bolt.svg";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in");
              }, index * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Something went wrong. Please try again later.");
      }
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });
    } catch (error: any) {
      toast({
        title: "Oh no! An error occurred.",
        description:
          error.message || "Could not send your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-14 relative overflow-hidden"
      id="contact"
      ref={sectionRef}
    >
      <BackgroundBlobs />

      {/* Main container with responsive max-width */}
      <div className="container px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-6xl mx-auto relative">
        {/* Header section - Responsive */}
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16 text-center">
          {/* Responsive badge */}
          <motion.div
            className="inline-flex mt-4 items-center gap-1 sm:gap-2 bg-primary/10 text-primary
              px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5
              rounded-full text-xs sm:text-sm md:text-base font-medium
              mb-4 sm:mb-5 md:mb-6 lg:mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <BookAIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            <span className="whitespace-nowrap font-nunito">Contact Us</span>
          </motion.div>

          {/* Main heading inspired by the reference */}
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-primary">
              Let's Talk Growt
              <span className="relative">
                h.{/* Notches  icon above the letter "d" */}
                <FloatingIcon
                  icon={bolt}
                  colorClassName="text-blue-400"
                  containerClassName="
                    absolute -top-8 left-4 -translate-x-1/3 w-8 h-8
                        sm:-top-4 sm:w-12 sm:h-12
                        md:-top-7 md:left-1 md:w-12 md:h-12
                        lg:-top-4 lg:w-4 lg:h-4
                        xl:-top-14 -left-2 xl:w-20 xl:h-20
                  "
                  opacity={1}
                  zIndex={10}
                  enableRotation={true}
                  rotationRange={4}
                />
              </span>{" "}
            </span>
          </motion.h1>
        </div>

        {/* Main content grid - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20">
          {/* Form section - Responsive */}
          <motion.div
            className="opacity-0 fade-in-element order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-background rounded-2xl p-6 sm:p-8 md:p-10 border border-border/50">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 text-foreground">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                {/* Company field */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="Your Company"
                  />
                </div>

                {/* Message field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </div>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact info section - Inspired by reference */}
          <motion.div
            className="order-2 flex items-center justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-10 md:p-12 w-full max-w-md border border-slate-700/50 relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent" />

              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold leading-tight mb-4">
                    It's <span className="text-primary">Time to</span>
                    <br />
                    <span className="text-gray-400">STOP</span> playing
                    <br />
                    small and <span className="text-primary">Go Big</span>
                  </h3>
                </motion.div>

                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-2 mb-0">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-white font-semibold">
                      Let's Connect
                    </span>
                  </div>

                  <div className="space-y-2">
                    <a
                      href="mailto:aispaces.in@gmail.com"
                      className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span className="text-sm sm:text-base">
                        aispaces.in@gmail.com
                      </span>
                    </a>
                    <a
                      href="tel:9820483550"
                      className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      <span className="text-sm sm:text-base">9820483550</span>
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full animate-pulse" />
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-primary/50 rounded-full animate-pulse" />
            </div>
          </motion.div>
        </div>

        {/* Background decorative icons */}
        <FloatingIcon
          icon={<Heart weight="fill" />}
          colorClassName="text-red-400"
          containerClassName="
            absolute top-20 left-4 w-4 h-4
            sm:top-24 sm:left-8 sm:w-5 sm:h-5
            md:top-32 md:left-12 md:w-6 md:h-6
            lg:top-20 lg:left-4 lg:w-5 lg:h-5
            xl:top-24 xl:left-8 xl:w-6 xl:h-6
          "
          opacity={0.6}
          zIndex={1}
          enableRotation={true}
          rotationRange={20}
        />

        <FloatingIcon
          icon={<Star weight="fill" />}
          colorClassName="text-yellow-400"
          containerClassName="
            absolute top-32 right-8 w-3 h-3
            sm:top-40 sm:right-12 sm:w-4 sm:h-4
            md:top-48 md:right-16 md:w-5 md:h-5
            lg:top-32 lg:right-8 lg:w-4 lg:h-4
            xl:top-40 xl:right-12 xl:w-5 xl:h-5
          "
          opacity={0.7}
          zIndex={1}
          enableRotation={true}
          rotationRange={25}
        />

        <FloatingIcon
          icon={<Circle weight="bold" />}
          colorClassName="text-blue-400"
          containerClassName="
            absolute hidden sm:block
            sm:bottom-24 sm:left-12 sm:w-5 sm:h-5
            md:bottom-32 md:left-16 md:w-6 md:h-6
            lg:bottom-20 lg:left-4 lg:w-5 lg:h-5
            xl:bottom-24 xl:left-4 xl:w-6 xl:h-6
          "
          opacity={0.5}
          zIndex={1}
          enableRotation={true}
          rotationRange={15}
        />

        <FloatingIcon
          icon={<Sparkles />}
          colorClassName="text-purple-400"
          containerClassName="
            absolute bottom-32 right-4 w-4 h-4
            sm:bottom-40 sm:right-8 sm:w-5 sm:h-5
            md:bottom-48 md:right-12 md:w-6 md:h-6
            lg:bottom-32 lg:right-4 lg:w-5 lg:h-5
            xl:bottom-40 xl:right-8 xl:w-6 xl:h-6
          "
          opacity={0.6}
          zIndex={1}
          enableRotation={true}
          rotationRange={18}
        />
      </div>
    </section>
  );
};

export default ContactForm;
