"use client"

import { useEffect, useState } from "react"
import VideoCircularGallery from "@/components/ui/video-gallery"
import MobileVideoCarousel from "@/components/ui/mobile-gallery"
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

    const getScrollSpeed = () => {
        const width = window.innerWidth
        if (width < 768) return 2.5
        else if (width >= 768 && width < 1024) return 2
        else if (width >= 1024 && width < 1280) return 1.5
        else return 1
    }

    const videoData = [
        { video: `/Comment “Gaga” for the link.mp4?height=720&width=1280&query=brand showcase video`, text: "Gaga Showcase" },
        { video: `/get.mp4?height=720&width=1280&query=creative process video`, text: "Creative Get Process" },
        { video: `/🤯INSANE effects in ONE CLICK✅🔥Tired of complicated video editing 😩 This AI tool changes every.mp4?height=720&width=1280&query=ai technology demo`, text: "Video Editing" },
        { video: `/Master Programming Free🤯 Comment “Skill” for the Link🔗You can Learn any programming language i.mp4?height=720&width=1280&query=marketing campaign video`, text: "Master Programming" },
        { video: `/✅ Save & Share Karlo Future Ke Liye & Comment Karlo Agar Koi AI Related Question Ho Toh 🤖Follow.mp4?height=720&width=1280&query=product showcase video`, text: "Future AI" },
        { video: `/Scraping was just made 100x easier 🦾Chat4Data is a chrome extension that can do scraping like a.mp4?height=720&width=1280&query=team collaboration video`, text: "Easy Scraping" },
    ]

    const mobileVideoUrls: string[] = videoData.slice(0, 3).map((item) => item.video)

    return (
        <section id="hero" className="relative min-h-screen overflow-hidden" aria-label="Hero section">
            <div style={{ width: "100%", height: "1000px", position: "absolute" }}>
                <Galaxy mouseRepulsion mouseInteraction density={1} glowIntensity={0.2} repulsionStrength={0.5} />
            </div>

            <div className="pt-24 sm:pt-20 md:pt-24 bg-transparent">
                <div className="px-4 sm:px-6">
                    <div className="mx-auto max-w-4xl mt-5 text-center">
                        {/* Headline */}
                        <div
                            className="font-bold leading-tight opacity-0 animate-fade-in font-montserrat text-xl sm:text-2xl md:text-2xl lg:text-4xl tracking-tight"
                            style={{ animationDelay: "0.3s" }}
                        >
                            {"A Goldmine for "}
                            <span className="text-primary font-nunito">{"Brands"}</span>
                            {" an"}
                            <span className="relative inline-block">
                                {"d"}
                                <FloatingIcon
                                    icon="/3zap.svg"
                                    containerClassName="absolute -top-6 left-1/2 -translate-x-1/3 w-8 h-8 sm:-top-6 sm:w-10 sm:h-10 md:-top-8 md:w-12 md:h-12 lg:-top-8 lg:w-12 lg:h-12 xl:-top-10 xl:w-14 xl:h-16"
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
                                className="font-semibold text-primary leading-tight opacity-0 animate-fade-in font-nunito text-sm sm:text-lg md:text-3xl mt-3"
                                style={{ animationDelay: "0.4s" }}
                            >
                                {"AI built for Brands, Backed by AI Creators."}
                            </div>
                        </div>

                        {/* Supporting copy */}
                        <p
                            style={{ animationDelay: "0.5s" }}
                            className="section-subtitle leading-relaxed opacity-0 animate-fade-in text-muted-foreground font-normal font-nunito text-xs sm:text-sm md:text-sm max-w-2xl mx-auto mt-1"
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
                <div className="relative mx-auto -mt-14 w-full px-2 sm:px-4">
                    {/* Optional parallax glow */}
                    <div
                        className="pointer-events-none hidden lg:block absolute -bottom-10 left-1/4 w-64 h-64 xl:w-80 xl:h-80 bg-primary/10 rounded-full blur-3xl -z-10 parallax"
                        data-speed="0.05"
                        aria-hidden="true"
                    />

                    {isMobile ? (
                        <div className="relative w-full pt-20 px-4 py-8">
                            <MobileVideoCarousel videos={mobileVideoUrls} autoplayDelay={4000} className="max-w-sm mx-auto" />
                        </div>
                    ) : (
                        <div className="relative w-full h-[62vh] sm:h-[56vh] md:h-[58vh] lg:h-[60vh]">
                            <VideoCircularGallery
                                items={videoData}
                                bend={-5}
                                skewStrength={3.0}
                                depthStrength={2.0}
                                curveYStrength={1.25}
                                gapEqualize={1}
                                borderRadius={0.08}
                                textColor="#ffffffff"
                                font="bold 30px Figtree"
                                scrollSpeed={getScrollSpeed()}
                                scrollEase={0.06}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
