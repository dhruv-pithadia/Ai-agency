"use client"

import { useEffect, useState } from "react"
import { Sparkle, Lightning, ShootingStar, CassetteTape } from "@phosphor-icons/react"
import CircularGallery from "@/components/ui/circular-gallery"
import GlowingButton from "@/components/animated-button"
import FloatingIcon from "@/components/icon-background"
import Galaxy from "./Galaxy-bg"

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile, { passive: true })
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Optional parallax for non-mobile
  useEffect(() => {
    if (isMobile) return
    const handleScroll = () => {
      const scrollY = window.scrollY
      const elements = document.querySelectorAll<HTMLElement>(".parallax")
      elements.forEach((el) => {
        const speed = Number.parseFloat(el.dataset.speed || "0.05")
        const yPos = -scrollY * speed
        el.style.setProperty("--parallax-y", `${yPos}px`)
        el.style.transform = `translate3d(0, var(--parallax-y), 0)`
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile])

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden" aria-label="Hero section">
      <div style={{ width: "100%", height: "1000px", position: "absolute" }}>
        <Galaxy mouseRepulsion mouseInteraction density={0.8} glowIntensity={0.4} />
      </div>

      <div className="pt-20 sm:pt-24 md:pt-28 bg-transparent">
        <div className="px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            {/* Headline */}
            <div
              className="font-bold leading-tight opacity-0 animate-fade-in font-montserrat text-xl sm:text-2xl md:text-2xl lg:text-3xl tracking-tight"
              style={{ animationDelay: "0.3s" }}
            >
              {"A Goldmine for "}
              <span className="text-primary font-nunito">{"Brands"}</span>
              {" an"}
              <span className="relative inline-block">
                {"d"}
                <FloatingIcon
                  icon="/3lines.svg"
                  containerClassName="absolute -top-6 left-1/2 -translate-x-1/3 w-8 h-8 sm:-top-6 sm:w-10 sm:h-10 md:-top-8 md:w-12 md:h-12 lg:-top-8 lg:w-12 lg:h-12 xl:-top-12 xl:w-16 xl:h-16"
                  opacity={1}
                  zIndex={10}
                  enableRotation
                  rotationRange={4}
                />
              </span>{" "}
              <br />
              {"A Golden Chance for "}
              <span className="text-primary font-nunito">{"Creators."}</span>
            </div>

            {/* Subheader */}
            <div className="relative">
              <div
                className="font-semibold text-primary leading-tight opacity-0 animate-fade-in font-nunito text-sm sm:text-lg md:text-xl mt-3"
                style={{ animationDelay: "0.4s" }}
              >
                {"AI built for Brands, Backed by AI Creators."}
              </div>
            </div>

            {/* Supporting copy */}
            <p
              style={{ animationDelay: "0.5s" }}
              className="section-subtitle leading-relaxed opacity-0 animate-fade-in text-muted-foreground font-normal font-nunito text-sm sm:text-base md:text-lg max-w-4xl mx-auto mt-3"
            >
              {
                "Creator Space is a 360° marketing agency that helps AI tools grow through influencer campaigns, community buzz, search visibility, and event amplification, all built by and for the AI community."
              }
            </p>

            {/* CTA */}
            <div
              className="opacity-0 animate-fade-in mt-5 mx-auto w-[150px] sm:w-[160px]"
              style={{ animationDelay: "0.7s" }}
            >
              <GlowingButton text="Get In Touch" href="#contact" />
            </div>
          </div>
        </div>

        {/* Bottom curved gallery */}
        <div className="relative mx-auto -mt-1 w-full px-2 sm:px-4">
          {/* Optional parallax glow */}
          <div
            className="pointer-events-none hidden lg:block absolute -bottom-10 left-1/4 w-64 h-64 xl:w-80 xl:h-80 bg-primary/10 rounded-full blur-3xl -z-10 parallax"
            data-speed="0.05"
            aria-hidden="true"
          />
          <div className="relative w-full h-[52vh] sm:h-[46vh] md:h-[48vh] lg:h-[50vh]">
            <CircularGallery
              bend={-5}
              skewStrength={3.0}
              depthStrength={2.0}
              curveYStrength={1.25}
              gapEqualize={1}
              borderRadius={0.08}
              textColor="#111111"
              font="bold 30px Figtree"
              scrollSpeed={0.2}
              scrollEase={0.06}
            />
          </div>
        </div>

        {/* Decorative icons */}
        <FloatingIcon
          icon={<ShootingStar weight="thin" />}
          colorClassName="text-foreground"
          containerClassName="absolute top-20 left-4 w-3 h-3 sm:top-24 sm:left-8 sm:w-4 sm:h-4"
          opacity={0.7}
          zIndex={1}
          enableRotation
          rotationRange={10}
        />
        <FloatingIcon
          icon={<Sparkle weight="light" />}
          colorClassName="text-pink-500"
          containerClassName="absolute bottom-[52vh] right-4 w-5 h-5 sm:right-8 sm:w-6 sm:h-6"
          opacity={0.6}
          zIndex={1}
          enableRotation
          rotationRange={12}
        />
        <FloatingIcon
          icon={<CassetteTape weight="thin" />}
          colorClassName="text-pink-500"
          containerClassName="absolute hidden sm:block bottom-[50vh] left-8 w-10 h-10 md:w-12 md:h-12"
          opacity={0.6}
          zIndex={1}
          enableRotation
          rotationRange={10}
        />
        <FloatingIcon
          icon={<Lightning weight="fill" />}
          colorClassName="text-orange-400"
          containerClassName="absolute top-[38vh] right-6 w-5 h-5 md:w-6 md:h-6"
          opacity={0.6}
          zIndex={15}
          enableRotation
          rotationRange={8}
        />
      </div>
    </section>
  )
}
