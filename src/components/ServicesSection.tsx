"use client";

import { useEffect, useRef, useState } from "react";
import { ActivityIcon } from "lucide-react";
import { Star, Sparkle, Lightbulb } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import BackgroundBlobs from "./BackgroundBlobs";
import FloatingIcon from "./icon-background";
import swerl from "/3swerl.svg";

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ticking = useRef(false);
  const lastScrollY = useRef(0);

  // Services data with improved design elements
  const services = [
    {
      title: "Influencer Campaigns",
      emoji: "🌟",
      description:
        "Connect with top-tier influencers to amplify your AI tool's reach and credibility in the market.",
      gradient: "from-purple-500 via-purple-600 to-pink-600",
      glowColor: "purple",
      position: "left",
    },
    {
      title: "UGC & Review Videos",
      emoji: "🎬",
      description:
        "Authentic user-generated content and professional review videos that showcase real value.",
      gradient: "from-blue-500 via-blue-600 to-cyan-600",
      glowColor: "blue",
      position: "right",
    },
    {
      title: "AI-Led Content Creation",
      emoji: "🤖",
      description:
        "Cutting-edge AI-powered content strategies that resonate with your target audience.",
      gradient: "from-emerald-500 via-green-600 to-teal-600",
      glowColor: "emerald",
      position: "left",
    },
    {
      title: "Social Media Promotions",
      emoji: "📱",
      description:
        "Strategic social media campaigns across platforms to maximize your tool's visibility.",
      gradient: "from-orange-500 via-red-500 to-pink-600",
      glowColor: "orange",
      position: "right",
    },
    {
      title: "Founders Newsletter (40K+)",
      emoji: "📧",
      description:
        "Direct access to 40,000+ founders and decision-makers through our exclusive newsletter.",
      gradient: "from-indigo-500 via-purple-600 to-blue-600",
      glowColor: "indigo",
      position: "left",
    },
    {
      title: "Events & Workshops",
      emoji: "🎯",
      description:
        "Showcase your AI tool at exclusive events and workshops with industry leaders.",
      gradient: "from-teal-500 via-cyan-600 to-blue-600",
      glowColor: "teal",
      position: "right",
    },
  ];

  // Enhanced card dimensions with better proportions
  const getCardStyle = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile - more refined proportions
        return {
          height: "auto",
          minHeight: "200px",
          width: "90vw",
          maxWidth: "350px",
          borderRadius: "20px",
        };
      } else if (width < 768) {
        // Small tablets
        return {
          height: "auto",
          minHeight: "220px",
          width: "85vw",
          maxWidth: "450px",
          borderRadius: "24px",
        };
      } else if (width < 1024) {
        // Medium screens
        return {
          height: "auto",
          minHeight: "280px",
          width: "80vw",
          maxWidth: "550px",
          borderRadius: "28px",
        };
      } else {
        // Large screens - premium proportions
        return {
          height: "auto",
          minHeight: "320px",
          width: "650px",
          borderRadius: "32px",
        };
      }
    }
    return {
      height: "auto",
      minHeight: "320px",
      width: "650px",
      borderRadius: "32px",
    };
  };

  const [cardStyle, setCardStyle] = useState(() => ({
    ...getCardStyle(),
    transition:
      "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity, filter",
  }));

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleScroll = () => {
      if (!ticking.current) {
        lastScrollY.current = window.scrollY;
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          const sectionRect = sectionRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const totalScrollDistance = isMobile
            ? viewportHeight * 2
            : viewportHeight * 2.5;
          let progress = 0;
          if (sectionRect.top <= 0) {
            progress = Math.min(
              1,
              Math.max(0, Math.abs(sectionRect.top) / totalScrollDistance)
            );
          }

          if (progress >= 0.83) {
            setActiveCardIndex(5);
          } else if (progress >= 0.66) {
            setActiveCardIndex(4);
          } else if (progress >= 0.5) {
            setActiveCardIndex(3);
          } else if (progress >= 0.33) {
            setActiveCardIndex(2);
          } else if (progress >= 0.16) {
            setActiveCardIndex(1);
          } else {
            setActiveCardIndex(0);
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call to set the correct active card on load

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isMobile]);

  const getCardTransform = (index: number, service: (typeof services)[0]) => {
    const isActive = activeCardIndex >= index;
    const isCurrentActive = activeCardIndex === index;
    let baseOffset: number, activeOffset: number, previousOffset: number;
    if (isMobile) {
      baseOffset = 0;
      activeOffset = 0;
      previousOffset = 0;
    } else {
      baseOffset = service.position === "left" ? -120 : 120;
      activeOffset = service.position === "left" ? -60 : 60;
      previousOffset = service.position === "left" ? -90 : 90;
    }

    if (!isActive) {
      return `translateX(${baseOffset}px) translateY(${isMobile ? 120 : 200}px) scale(${
        isMobile ? 0.9 : 0.8
      }) rotateY(${service.position === "left" ? "15deg" : "-15deg"})`;
    }
    if (isCurrentActive) {
      return `translateX(${activeOffset}px) translateY(${
        isMobile ? 10 + index * 8 : 20 + index * 15
      }px) scale(1) rotateY(0deg)`;
    }
    return `translateX(${previousOffset}px) translateY(${
      isMobile ? 5 + index * 6 : 10 + index * 12
    }px) scale(${isMobile ? 0.96 : 0.92}) rotateY(${service.position === "left" ? "5deg" : "-5deg"})`;
  };

  const getCardOpacity = (index: number) => {
    if (activeCardIndex >= index) {
      return activeCardIndex === index ? 1 : 0.6;
    }
    return 0;
  };

  const getCardBlur = (index: number) => {
    if (activeCardIndex === index) {
      return "blur(0px)";
    }
    if (activeCardIndex > index) {
      return "blur(3px)";
    }
    return "blur(0px)";
  };

  const getGlowStyle = (service: (typeof services)[0], isActive: boolean) => {
    if (!isActive) return {};
    const glowColors = {
      purple:
        "0 0 60px rgba(147, 51, 234, 0.4), 0 0 120px rgba(147, 51, 234, 0.2)",
      blue: "0 0 60px rgba(59, 130, 246, 0.4), 0 0 120px rgba(59, 130, 246, 0.2)",
      emerald:
        "0 0 60px rgba(16, 185, 129, 0.4), 0 0 120px rgba(16, 185, 129, 0.2)",
      orange:
        "0 0 60px rgba(249, 115, 22, 0.4), 0 0 120px rgba(249, 115, 22, 0.2)",
      indigo:
        "0 0 60px rgba(99, 102, 241, 0.4), 0 0 120px rgba(99, 102, 241, 0.2)",
      teal: "0 0 60px rgba(20, 184, 166, 0.4), 0 0 120px rgba(20, 184, 166, 0.2)",
    };
    return {
      boxShadow:
        glowColors[service.glowColor as keyof typeof glowColors] ||
        glowColors.purple,
    };
  };

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: isMobile ? "300vh" : "350vh" }}
      id="services"
    >
      <section className="w-full h-screen py-2 sm:py-4 md:py-6 lg:py-8 sticky top-0 overflow-hidden bg-background">
        <BackgroundBlobs />
        {/* Background decorative icons - larger to fill space */}
        <FloatingIcon
          icon={<Lightbulb weight="thin" />}
          colorClassName="text-blue-400"
          containerClassName="
            absolute top-1/4 left-4 w-16 h-16
            sm:top-1/4 sm:left-8 sm:w-20 sm:h-20
            md:top-1/4 md:left-12 md:w-24 md:h-24
            lg:top-1/4 lg:left-16 lg:w-28 lg:h-28
            xl:top-1/4 xl:left-20 xl:w-32 xl:h-32
          "
          opacity={0.3}
          zIndex={1}
          enableRotation={true}
          rotationRange={10}
        />
        <FloatingIcon
          icon={<Sparkle weight="thin" />}
          colorClassName="text-pink-400"
          containerClassName="
            absolute bottom-1/4 right-4 w-16 h-16
            sm:bottom-1/4 sm:right-8 sm:w-20 sm:h-20
            md:bottom-1/4 md:right-12 md:w-24 md:h-24
            lg:bottom-1/4 lg:right-16 lg:w-28 lg:h-28
            xl:bottom-1/4 xl:right-20 xl:w-32 xl:h-32
          "
          opacity={0.4}
          zIndex={1}
          enableRotation={true}
          rotationRange={15}
        />
        <FloatingIcon
          icon={<Star weight="fill" />}
          colorClassName="text-yellow-400"
          containerClassName="
            absolute top-8 left-1/2 -translate-x-1/2 w-10 h-10
            sm:w-12 sm:h-12 md:w-14 md:h-14
            lg:w-16 lg:h-16 xl:w-20 xl:h-20
          "
          opacity={0.5}
          zIndex={1}
          enableRotation={true}
          rotationRange={20}
        />

        <div className="container px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-6xl mx-auto h-full flex flex-col">
          {/* Header section - Reduced spacing on mobile */}
          <div className="mb-2 sm:mb-4 md:mb-6 lg:mb-8">
            <motion.div
              className="inline-flex mt-4 items-center gap-1 sm:gap-2 bg-primary/10 text-primary
                   px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5
                   rounded-full text-xs sm:text-sm md:text-base font-medium
                   mb-2 sm:mb-3 md:mb-4 lg:mb-6 backdrop-blur-sm border border-primary/20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ActivityIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <span className="whitespace-nowrap font-nunito">
                Our Services
              </span>
            </motion.div>
            <div className="text-lg sm:text-xl font-montserrat md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-tight">
              <span className="text-primary relative">
                Our Service
                <span className="relative">
                  s
                  <FloatingIcon
                    icon={swerl}
                    colorClassName="text-blue-400"
                    containerClassName="
                        absolute -top-6 right-2 -translate-x-1/3 w-10 h-10
                        sm:-top-4 -left-2 sm:w-12 sm:h-12
                        md:-top-9 -left-2 md:left-1 md:w-12 md:h-12
                        lg:-top-4 -left-2 lg:w-4 lg:h-4
                        xl:-top-14 -left-2 xl:w-20 xl:h-20"
                    opacity={1}
                    zIndex={10}
                    enableRotation={true}
                    rotationRange={4}
                  />
                </span>{" "}
              </span>
            </div>
            <p className="text-base sm:text-base md:text-lg font-nunito lg:text-xl text-muted-foreground leading-relaxed">
              Comprehensive solutions to elevate your AI tool from launch to
              market leadership
            </p>
          </div>
          <div
            ref={cardsContainerRef}
            className="relative flex-1 flex items-center justify-center"
          >
            {services.map((service, index) => {
              const isCurrentActive = activeCardIndex === index;
              return (
                <div
                  key={index}
                  className={`absolute overflow-hidden backdrop-blur-sm border border-white/20 ${
                    activeCardIndex >= index ? "animate-card-enter" : ""
                  }`}
                  style={{
                    ...cardStyle,
                    zIndex: 10 + index,
                    transform: getCardTransform(index, service),
                    opacity: getCardOpacity(index),
                    filter: getCardBlur(index),
                    pointerEvents: activeCardIndex >= index ? "auto" : "none",
                    ...getGlowStyle(service, isCurrentActive),
                  }}
                >
                  <div
                    className={`absolute inset-0 z-0 bg-gradient-to-br ${service.gradient} opacity-95`}
                  />
                  <div
                    className="absolute inset-0 z-5 opacity-10"
                    style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                      backgroundSize: "20px 20px",
                    }}
                  />
                  {/* Glass morphism overlay */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/10 via-transparent to-black/20" />
                  <div className="relative z-20 flex sm:flex-row items-center justify-center w-full">
                    {/* Content section */}
                    <div className="flex-1 flex justify-center p-4 sm:p-6 md:p-8">
                      <div className="text-center space-y-3 sm:space-y-4 md:space-y-6 max-w-sm">
                        {/* Enhanced title with better typography */}
                        <h3 className="text-xl sm:text-xl font-nunito md:text-2xl lg:text-3xl font-bold text-white leading-tight tracking-tight">
                          {service.title}
                        </h3>
                        {/* Enhanced description */}
                        <p className="text-white/90 font-nunito text-base sm:text-base md:text-lg leading-relaxed font-medium">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    {/* Emoji section */}
                    <div className="w-32 sm:w-36 md:w-44 lg:w-52 flex-shrink-0 relative h-80 flex items-center justify-center">
                      <div className="absolute inset-0 backdrop-blur-xl shadow-lg flex items-center justify-center">
                        <div className="relative">
                          <span className="relative text-6xl drop-shadow-2xl">
                            {service.emoji}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Subtle border highlight */}
                  <div className="absolute inset-0 rounded-[inherit] border border-white/20 pointer-events-none" />
                </div>
              );
            })}
          </div>
          {/* Enhanced progress indicator - Reduced spacing on mobile */}
          <div className="flex justify-center mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-32 relative z-50">
            <div className="flex gap-1.5 sm:gap-2 md:gap-3 bg-background/90 backdrop-blur-xl px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-full border border-primary/30 shadow-lg">
              {services.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-500 ${
                    activeCardIndex >= index
                      ? "bg-primary shadow-lg shadow-primary/50 scale-110"
                      : "bg-primary/20 hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesSection;
