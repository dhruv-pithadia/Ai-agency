"use client";

import { useEffect, useRef, useState } from "react";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import GlowingButton from "./animated-button";
import {
  Sparkle,
  FlyingSaucer,
  Lightning,
  ShootingStar,
  CassetteTape,
} from "@phosphor-icons/react";
import FloatingIcon from "./icon-background";
import lines from "/3lines.svg";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and when window resizes
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Skip effect on mobile
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imageRef.current) return;
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      imageRef.current.style.transform = `perspective(1000px) rotateY(${
        x * 2.5
      }deg) rotateX(${-y * 2.5}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
      if (!imageRef.current) return;
      imageRef.current.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isMobile]);

  useEffect(() => {
    // Skip parallax on mobile
    if (isMobile) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll(".parallax");
      elements.forEach((el) => {
        const element = el as HTMLElement;
        const speed = Number.parseFloat(element.dataset.speed || "0.1");
        const yPos = -scrollY * speed;
        element.style.setProperty("--parallax-y", `${yPos}px`);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <section
      className="overflow-hidden relative bg-cover min-h-screen flex items-center"
      id="hero"
    >
      <BackgroundBlobs />

      {/* Responsive padding using Tailwind classes */}
      <div className="w-full py-16 px-4 sm:py-20 sm:px-6 md:py-24 md:px-8 lg:py-28 lg:px-12 xl:py-32 xl:px-16 2xl:py-36">
        <div className="container max-w-6xl mx-auto" ref={containerRef}>
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-center lg:items-start">
            {/* Text Content - Responsive sizing and spacing */}
            <div className="w-full lg:w-1/2 text-center lg:text-left relative">
              {/* Line 1 & 2 - Largest Text with icon above "d" */}
              <div className="relative">
                <div
                  className="font-bold leading-tight opacity-0 animate-fade-in font-montserrat text-xl sm:text-2xl md:text-3xl mb-2"
                  style={{ animationDelay: "0.3s" }}
                >
                  A Goldmine for{" "}
                  <span className="text-primary font-nunito">Brands</span> an
                  <span className="relative">
                    d{/* Notches  icon above the letter "d" */}
                    <FloatingIcon
                      icon={lines}
                      containerClassName="
                        absolute -top-6 left-1/2 -translate-x-1/3 w-12 h-12
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
                  </span>
                  <br />A Golden Chance for{" "}
                  <span className="text-primary font-nunito">Creators.</span>
                </div>
              </div>

              {/* Second line with star icon positioned above and left of "AI" */}
              <div className="relative">
                <div
                  className="font-semibold text-primary leading-tight opacity-0 animate-fade-in font-nunito text-base sm:text-lg md:text-2xl mb-0 sm:mb-2"
                  style={{ animationDelay: "0.4s" }}
                >
                 AI built for Brands, Backed by AI Creators.
                </div>
              </div>

              <p
                style={{ animationDelay: "0.5s" }}
                className="section-subtitle leading-relaxed opacity-0 animate-fade-in text-muted-foreground font-normal font-nunito text-base lg:text-base mb-0 sm:mb-2 md:mb-4 max-w-lg mx-auto lg:mx-0"
              >
                Creator Space is a 360° marketing agency that helps AI tools
                grow through influencer campaigns, community buzz, search
                visibility, and event amplification, all built by and for the
                AI community.
              </p>

              {/* Responsive button container */}
              <div
                className="flex justify-center lg:justify-start"
                style={{ animationDelay: "0.7s" }}
              >
                <div className="w-full mt-2 sm:w-auto min-w-[200px] max-w-[300px] sm:max-w-none">
                  <GlowingButton text="Get In Touch" href="#contact" />
                </div>
              </div>
            </div>

            {/* Image/Animation Container - Responsive sizing */}
            <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
                <div className="relative group">
                  <div className="relative transition-all duration-500 ease-out overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto">
                    <img
                      ref={imageRef}
                      src="/hero-image.jpg"
                      alt="Atlas Robot"
                      className="w-full h-auto object-cover transition-transform duration-500 ease-out"
                      style={{ transformStyle: "preserve-3d" }}
                    />
                  </div>

                  {/* Flying Saucer icon - top left corner of image */}
                  <FloatingIcon
                    icon={<FlyingSaucer weight="light" />}
                    colorClassName="text-green-400"
                    containerClassName="
                      absolute -top-4 -left-4 w-6 h-6
                      sm:-top-6 sm:-left-6 sm:w-8 sm:h-8
                      md:-top-6 md:left-36 md:w-10 md:h-10
                      lg:-top-6 lg:-left-6 lg:w-12 lg:h-12
                      xl:-top-8 xl:-left-8 xl:w-14 xl:h-14
                    "
                    opacity={0.8}
                    zIndex={15}
                    enableRotation={true}
                    rotationRange={20}
                  />

                  {/* Lightning icon - bottom right corner of image */}
                  <FloatingIcon
                    icon={<Lightning weight="fill" />}
                    colorClassName="text-orange-400"
                    containerClassName="
                      absolute -bottom-2 -right-2 w-5 h-5
                      sm:-bottom-4 sm:-right-4 sm:w-6 sm:h-6
                      md:-bottom-4 md:right-40 md:w-8 md:h-8
                      lg:-bottom-4 lg:-right-4 lg:w-10 lg:h-10
                      xl:-bottom-6 xl:-right-6 xl:w-12 xl:h-12
                    "
                    opacity={0.7}
                    zIndex={15}
                    enableRotation={true}
                    rotationRange={10}
                  />
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative icons - positioned relative to section */}
      <FloatingIcon
        icon={<ShootingStar  weight="thin" />}
        colorClassName="text-foreground"
        containerClassName="
          absolute top-20 left-4 w-3 h-3
          sm:top-24 sm:left-8 sm:w-4 sm:h-4
          md:top-32 md:left-12 md:w-5 md:h-5
          lg:top-20 lg:left-4 lg:w-4 lg:h-4
          xl:top-24 xl:left-8 xl:w-5 xl:h-5
        "
        opacity={0.8}
        zIndex={1}
        enableRotation={true}
        rotationRange={12}
      />

      <FloatingIcon
        icon={<Sparkle weight="light" />}
        colorClassName="text-pink-500"
        containerClassName="
          absolute bottom-48 right-4 w-5 h-5
          sm:bottom-52 sm:right-8 sm:w-6 sm:h-6
          md:bottom-60 md:right-12 md:w-7 md:h-7
          lg:bottom-48 lg:right-4 lg:w-6 lg:h-6
          xl:bottom-52 xl:right-8 xl:w-7 xl:h-7
        "
        opacity={0.7}
        zIndex={1}
        enableRotation={true}
        rotationRange={15}
      />

      <FloatingIcon
        icon={<CassetteTape  weight="thin" />}
        colorClassName="text-pink-500"
        containerClassName="
          absolute hidden sm:block
          sm:bottom-52 sm:left-8 sm:w-17 sm:h-17
          md:bottom-60 md:left-12 md:w-20 md:h-20
          lg:bottom-48 lg:left-75 lg:w-17 lg:h-17
          xl:bottom-52 xl:left-80 xl:w-16 xl:h-16
        "
        opacity={0.7}
        zIndex={1}
        enableRotation={true}
        rotationRange={15}
      />

      {/* Responsive background blur effect */}
      <div
        className="hidden lg:block absolute bottom-0 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-80 xl:h-80 bg-primary/10 rounded-full blur-3xl -z-10 parallax"
        data-speed="0.05"
      ></div>
    </section>
  );
};

export default Hero;
