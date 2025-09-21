"use client"

import React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { motion } from "framer-motion"
import { Users } from "lucide-react"
import { Star, Minus, Circle, Heart, Sparkle } from "@phosphor-icons/react"
import GlowingButton from "./animated-button"
import FloatingIcon from "./icon-background"
import BackgroundBlobs from "./BackgroundBlobs"

// Updated Project interface and data with emojis
interface Project {
  id: number
  title: string
  image: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "subrat_ai ",
    image: "/subrat.png",
  },
  {
    id: 2,
    title: "techonfreak",
    image: "/techonfreak.png",
  },
  {
    id: 3,
    title: "v.i.s.h.ai",
    image: "/vishi.png",
  },
  {
    id: 4,
    title: "parasmadan.in",
    image: "/Parasmadam.png",
  },
  {
    id: 5,
    title: "drtechtrick",
    image: "/drtechtrick.png",
  },
  {
    id: 6,
    title: "theroshankrishna",
    image: "/TheRoshan.png",
  },
  {
    id: 7,
    title: "techbyjairaj",
    image: "/techbyjairaj.png",
  },
]

const CreatorSection = () => {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true, stopOnMouseEnter: true }))

  return (
    <section
      className="py-2 sm:py-4 md:py-6 lg:py-8 xl:py-10 2xl:py-12 
        mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 
        relative overflow-hidden"
      id="creators"
    >
      <BackgroundBlobs />

      {/* Main container with responsive max-width */}
      <div className="container px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-6xl mx-auto relative z-10">
        {/* Header section with responsive spacing */}
        <div className="text-center mb-0 sm:mb-2 md:mb-4 lg:mb-6 xl:mb-8">
          {/* Main heading with staggered animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-6 sm:mb-8 md:mb-10 lg:mb-12"
          >
            {/* Responsive badge */}
            <motion.div
              className="inline-flex items-center gap-1 sm:gap-2 bg-primary/10 text-primary
                px-3 py-1.5 mt-4 sm:px-4 sm:py-2 md:px-5 md:py-2.5
                rounded-full text-xs sm:text-sm md:text-base font-medium
                mb-4 sm:mb-5 md:mb-6 lg:mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15 }}
              viewport={{ once: true }}
            >
              <Users className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <span className="whitespace-nowrap font-nunito">Growing Community</span>
            </motion.div>

            {/* Main heading with custom responsive text sizes */}
            <h2
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 
              font-bold font-montserrat mb-3 sm:mb-4 md:mb-5 lg:mb-6 leading-tight"
            >
              <span className="block mb-1 sm:mb-2 relative">
                <span className="relative">
                  C{/* Straight lines icon above the letter "C" */}
                  <FloatingIcon
                    icon={<Minus weight="bold" />}
                    colorClassName="text-blue-400"
                    containerClassName="
                      absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4
                      sm:-top-5 sm:w-5 sm:h-5
                      md:-top-6 md:w-6 md:h-6
                      lg:-top-5 lg:w-5 lg:h-5
                      xl:-top-6 xl:w-6 xl:h-6
                    "
                    opacity={0.8}
                    zIndex={10}
                    enableRotation={true}
                    rotationRange={5}
                  />
                </span>
                ollaborate with a networ
                <span className="relative">
                  k{/* Multi star icon above the letter "k" */}
                  <FloatingIcon
                    icon={<Star weight="fill" />}
                    colorClassName="text-yellow-400"
                    containerClassName="
                      absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8
                      sm:-top-5 sm:w-9 sm:h-9
                      md:-top-6 md:w-10 md:h-10
                      lg:-top-5 lg:w-9 lg:h-9
                      xl:-top-6 xl:w-10 xl:h-10
                    "
                    opacity={0.9}
                    zIndex={10}
                    enableRotation={true}
                    rotationRange={20}
                  />
                </span>
              </span>
              <span className="block">
                of{" "}
                <motion.span
                  className="relative inline-block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                >
                  <span className="text-primary relative z-10 border-b-2 border-primary">10,000+</span>
                  <motion.div
                    className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  ></motion.div>
                </motion.span>{" "}
                AI-curious minds
              </span>
            </h2>

            {/* Responsive subtitle */}
            <motion.p
              className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl
                max-w-sm sm:max-w-md md:max-w-lg font-nunito lg:max-w-2xl xl:max-w-3xl mx-auto
                leading-relaxed px-2 sm:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.2 }}
            >
              Join a vibrant community of innovators, researchers, and creators pushing the boundaries of artificial
              intelligence
            </motion.p>
          </motion.div>

          {/* Responsive Carousel Container */}
          <div className="max-w-full mx-auto">
            <Carousel
              plugins={[plugin.current]}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
              onMouseEnter={() => plugin.current.stop()}
              onMouseLeave={() => plugin.current.play()}
            >
              <CarouselContent className="-ml-2 sm:-ml-3 md:-ml-4">
                {projects.map((project, index) => (
                  <CarouselItem
                    key={project.id}
                    className="pl-2 sm:pl-3 md:pl-4
                    basis-3/4 xs:basis-3/4 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/3"
                  >
                    <div
                      className="bg-card rounded-xl sm:rounded-2xl shadow-lg overflow-hidden h-full
                    flex flex-col group transition-all duration-300
                    hover:shadow-primary/20 hover:-translate-y-1 sm:hover:-translate-y-2"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105
                          transition-transform duration-300"
                          loading={index < 3 ? "eager" : "lazy"}
                          decoding="async"
                          sizes="(max-width: 640px) 75vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </div>
                      {/* Optional: Add title overlay for better mobile experience */}
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      flex items-end p-3 sm:p-4"
                      >
                        <h3 className="text-white text-sm sm:text-base font-medium truncate">{project.title}</h3>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Responsive CTA Section - Button above message */}
          <motion.div
            className="flex flex-col justify-center items-center
              mt-6 sm:mt-8 md:mt-10 lg:mt-12 gap-2 sm:gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.2 }}
          >
            {/* Button */}
            <div className="py-2.5 px-6 sm:py-3 sm:px-8 md:py-3.5 md:px-10 lg:py-4 lg:px-12">
              <GlowingButton text="Join as Creator" href="https://form.jotform.com/252613627580458" />
            </div>

            {/* Message below button */}
            <motion.div
              className="flex flex-col items-center gap-2 sm:gap-3
                max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.2 }}
            >
              <div className="text-center">
                <p
                  className="text-foreground text-lg sm:text-xl md:text-2xl
                  leading-relaxed mb-1 font-nunito sm:mb-2"
                >
                  This space is waiting for your face.{" "}
                </p>
                <div
                  className="flex items-center justify-center gap-2 sm:gap-4
                  text-xs sm:text-sm text-gray-500"
                >
                  <span className="flex items-center gap-1 text-base sm:text-lg md:text-xl">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 font-nunito bg-green-500 rounded-full animate-pulse" />
                    <span className="whitespace-nowrap">Active community</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <FloatingIcon
        icon={<Heart weight="fill" />}
        colorClassName="text-red-400"
        containerClassName="
          absolute top-16 left-4 w-8 h-8
          sm:top-24 sm:left-8 sm:w-9 sm:h-9
          md:top-32 md:left-12 md:w-10 md:h-10
          lg:top-30 lg:left-4 lg:w-9 lg:h-9
          xl:top-40 xl:left-24 xl:w-10 xl:h-10
        "
        opacity={0.6}
        zIndex={1}
        enableRotation={true}
        rotationRange={20}
      />

      <FloatingIcon
        icon={<Circle weight="fill" />}
        colorClassName="text-blue-400"
        containerClassName="
          absolute hidden sm:block animate-pulse
          sm:bottom-24 sm:left-24 sm:w-5 sm:h-5
          md:bottom-32 md:left-28 md:w-6 md:h-6
          lg:bottom-20 lg:left-16 lg:w-5 lg:h-5
          xl:bottom-24 xl:left-16 xl:w-6 xl:h-6
        "
        opacity={0.5}
        zIndex={1}
        enableRotation={true}
        rotationRange={15}
      />

      <FloatingIcon
        icon={<Sparkle />}
        colorClassName="text-purple-400"
        containerClassName="
          absolute bottom-24 right-4 w-4 h-4
          sm:bottom-32 sm:right-8 sm:w-5 sm:h-5
          md:bottom-40 md:right-12 md:w-6 md:h-6
          lg:bottom-32 lg:right-4 lg:w-5 lg:h-5
          xl:bottom-40 xl:right-24 xl:w-10 xl:h-10
        "
        opacity={0.6}
        zIndex={1}
        enableRotation={true}
        rotationRange={18}
      />
    </section>
  )
}

export default CreatorSection
