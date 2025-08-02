"use client";

import { motion, useInView } from "framer-motion";
import { useState, useCallback, useMemo, memo, useEffect } from "react";
import {
  Eye,
  Users,
  Calendar,
  Zap,
  Target,
  Mail,
  Trophy,
  Building2,
  Sparkles,
  ArrowBigUpDash,
} from "lucide-react";
import { Heart, Anchor, Star } from "@phosphor-icons/react";
import { useRef } from "react";
import { animate } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import FloatingIcon from "./icon-background";
import BackgroundBlobs from "./BackgroundBlobs";
import zap from "/3zap.svg";

// Type definitions
interface Statistic {
  icon: LucideIcon;
  value: string;
  label: string;
}

interface Shape {
  id: number;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  initialPosition: { x: number; y: number };
  hoverPosition: { x: number; y: number };
  blobPath: string;
}

interface AnimatedCounterProps {
  from?: number;
  to: number;
}

interface StatisticsGridProps {
  statistics: Statistic[];
}

interface BlobShapeProps {
  shape: Shape;
  isHovered: boolean;
}

interface BlobAnimationProps {
  shapes: Shape[];
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const clients = [
  { name: "TechCorp Solutions", icon: Building2, color: "text-blue-500" },
  { name: "Innovation Labs", icon: Zap, color: "text-purple-500" },
  { name: "Digital Dynamics", icon: Sparkles, color: "text-green-500" },
  { name: "Future Systems", icon: Star, color: "text-orange-500" },
  { name: "Smart Enterprises", icon: Building2, color: "text-pink-500" },
  { name: "Quantum Technologies", icon: Zap, color: "text-cyan-500" },
  { name: "NextGen Solutions", icon: Sparkles, color: "text-indigo-500" },
  { name: "Advanced Analytics", icon: Star, color: "text-red-500" },
  { name: "AI Innovations", icon: Building2, color: "text-teal-500" },
  { name: "Data Driven Co", icon: Zap, color: "text-yellow-500" },
  { name: "Cloud Native", icon: Sparkles, color: "text-violet-500" },
  { name: "Cyber Security Pro", icon: Star, color: "text-emerald-500" },
];

// AnimatedCounter component with intersection observer
const AnimatedCounterComponent = ({ from = 0, to }: AnimatedCounterProps) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, {
    once: true,
    margin: "-50px 0px 0px 0px",
    amount: "some",
  });

  useEffect(() => {
    if (isInView) {
      const node = nodeRef.current;
      const controls = animate(from, to, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          if (node) {
            node.textContent = Math.round(value).toLocaleString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, isInView]);

  return <span ref={nodeRef}>{from}</span>;
};

export const AnimatedCounter = memo(AnimatedCounterComponent);

// StatisticsGrid component - Responsive

const StatisticsGridComponent = ({ statistics }: StatisticsGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
      {statistics.map((stat, index) => {
        const numericValue = Number.parseInt(stat.value.replace(/\D/g, ""), 10);
        const suffix = stat.value.replace(/[\d,.]/g, "");
        return (
          // 1. THIS IS THE MAIN CHANGE: We use flexbox to center the entire block vertically.
          <motion.div
            key={`stat-${index}`}
            className="flex flex-col items-center" // This centers everything below it
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1 + index * 0.1,
              duration: 0.2,
              ease: "easeOut",
            }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ scale: 1.05 }}
          >
            {/* The stat number - this is now centered by its parent */}
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-1 sm:mb-2">
              <AnimatedCounter to={numericValue} />
              {suffix}
            </div>

            {/* 2. The icon and label group */}
            <div className="flex items-center md:ml-10 sm:ml-10 gap-2 text-sm sm:text-base md:text-lg text-muted-foreground font-medium font-nunito">
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-primary flex-shrink-0" />
              {/* 3. This forces the text to wrap and aligns it left for readability */}
              <span className="w-32 text-left">{stat.label}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export const StatisticsGrid = memo(StatisticsGridComponent);

// BlobShape component - Responsive with proper distances
const BlobShapeComponent = ({ shape, isHovered }: BlobShapeProps) => {
  const Icon = shape.icon;
  const getScaleFactor = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 0.5;
      if (window.innerWidth < 768) return 0.6;
      if (window.innerWidth < 1024) return 0.8;
      return 1.0;
    }
    return 0.6;
  };

  const [scaleFactor, setScaleFactor] = useState(getScaleFactor);

  useEffect(() => {
    const handleResize = () => {
      setScaleFactor(getScaleFactor());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      className="absolute w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex flex-col items-center justify-center"
      initial={{
        x: shape.initialPosition.x * scaleFactor,
        y: shape.initialPosition.y * scaleFactor,
      }}
      animate={{
        x: isHovered
          ? shape.hoverPosition.x * scaleFactor
          : shape.initialPosition.x * scaleFactor,
        y: isHovered
          ? shape.hoverPosition.y * scaleFactor
          : shape.initialPosition.y * scaleFactor,
        scale: isHovered ? 0.75 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 20,
        duration: 0.8,
      }}
    >
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        animate={{
          rotate: isHovered ? 0 : [0, 8, -8, 0],
          scale: isHovered ? 1 : [1, 1.08, 0.92, 1],
        }}
        transition={{
          rotate: {
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
          scale: {
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
      >
        <motion.path
          d={shape.blobPath}
          style={{
            fill:
              shape.id === 1
                ? "#3b82f6"
                : shape.id === 2
                  ? "#a855f7"
                  : shape.id === 3
                    ? "#10b981"
                    : "#f97316",
          }}
          animate={{
            d: isHovered
              ? "M50,5 C75,5 95,25 95,50 C95,75 75,95 50,95 C25,95 5,75 5,50 C5,25 25,5 50,5 Z"
              : shape.blobPath,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none"
        style={{
          transform: "translate(0, 0)",
        }}
        animate={{
          opacity: isHovered ? 0 : 1,
          scale: isHovered ? 0.3 : 1,
        }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col items-center font-nunito justify-center text-center">
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mb-1 sm:mb-2 mx-auto drop-shadow-lg" />
          <h4 className="text-xs sm:text-sm md:text-base font-bold drop-shadow-md leading-tight">
            {shape.title}
          </h4>
          <p className="text-xs sm:text-sm opacity-90 drop-shadow-sm leading-tight mt-0.5 sm:mt-1">
            {shape.subtitle}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const BlobShape = memo(BlobShapeComponent);

// BlobAnimation component - Responsive container
const BlobAnimationComponent = ({
  shapes,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: BlobAnimationProps) => {
  return (
    <div
      className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px] cursor-pointer flex items-center justify-center"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {shapes.map((shape) => (
        <BlobShape
          key={`blob-${shape.id}`}
          shape={shape}
          isHovered={isHovered}
        />
      ))}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-white"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          duration: 1,
        }}
      >
        <motion.div
          className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] xl:w-[420px] xl:h-[420px] rounded-full bg-gradient-to-br from-primary via-purple-600 to-pink-600 shadow-2xl"
          initial={{ scale: 0, rotate: 0 }}
          animate={{
            scale: isHovered ? 1 : 0,
            rotate: isHovered ? 360 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            duration: 1.2,
          }}
        />
        <motion.div
          className="relative z-10 text-center px-4 sm:px-6 md:px-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{
            y: isHovered ? 0 : 30,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <img
            src="/mainlogo.svg"
            alt="main logo"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 lg:w-40 lg:h-40 mx-auto drop-shadow-lg"
            style={{
              filter:
                "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
            }}
          />
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 drop-shadow-md">
            AI Spaces
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

const BlobAnimation = memo(BlobAnimationComponent);

const PartnerBrands = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMarqueeHovered, setIsMarqueeHovered] = useState(false);

  const statistics = useMemo<Statistic[]>(
    () => [
      {
        icon: ArrowBigUpDash,
        value: "6K+",
        label: "tool upvotes",
      },
      {
        icon: Eye,
        value: "18M+",
        label: "views",
      },
      {
        icon: Calendar,
        value: "25+",
        label: "events & workshops",
      },
      {
        icon: Users,
        value: "40K+",
        label: "community members",
      },
    ],
    []
  );

  const shapes = useMemo<Shape[]>(
    () => [
      {
        id: 1,
        title: "Social Media",
        subtitle: "Promotions",
        icon: Target,
        color: "from-blue-500 to-cyan-500",
        initialPosition: { x: -120, y: -120 },
        hoverPosition: { x: -50, y: -50 },
        blobPath:
          "M60,20 C80,10 90,30 85,50 C90,70 70,85 50,80 C30,85 10,70 15,50 C10,30 30,10 60,20 Z",
      },
      {
        id: 2,
        title: "AI Directories",
        subtitle: "Product Hunt",
        icon: Trophy,
        color: "from-purple-500 to-pink-500",
        initialPosition: { x: 120, y: -120 },
        hoverPosition: { x: 50, y: -50 },
        blobPath:
          "M60,20 C80,10 90,30 85,50 C90,70 70,85 50,80 C30,85 10,70 15,50 C10,30 30,10 60,20 Z",
      },
      {
        id: 3,
        title: "Newsletters",
        subtitle: "40K+ Community",
        icon: Mail,
        color: "from-green-500 to-emerald-500",
        initialPosition: { x: -120, y: 120 },
        hoverPosition: { x: -50, y: 50 },
        blobPath:
          "M60,20 C80,10 90,30 85,50 C90,70 70,85 50,80 C30,85 10,70 15,50 C10,30 30,10 60,20 Z",
      },
      {
        id: 4,
        title: "Events",
        subtitle: "Workshops",
        icon: Calendar,
        color: "from-orange-500 to-red-500",
        initialPosition: { x: 120, y: 120 },
        hoverPosition: { x: 50, y: 50 },
        blobPath:
          "M60,20 C80,10 90,30 85,50 C90,70 70,85 50,80 C30,85 10,70 15,50 C10,30 30,10 60,20 Z",
      },
    ],
    []
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <section
      className="py-2 sm:py-4 md:py-6 lg:py-8 xl:py-10 2xl:py-12 relative overflow-hidden"
      id="brand-partners"
    >
      <BackgroundBlobs />

      {/* Main container with responsive max-width */}
      <div className="container px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-6xl mx-auto relative">
        {/* Responsive badge */}
        <motion.div
          className="inline-flex items-center gap-1 sm:gap-2 bg-primary/10 text-primary
            px-3 py-1.5 mt-4 sm:px-4 sm:py-2 md:px-5 md:py-2.5
            rounded-full text-xs sm:text-sm md:text-base font-medium
            mb-4 sm:mb-5 md:mb-6 lg:mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Building2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          <span className="whitespace-nowrap font-nunito">
            Trusted Partners
          </span>
        </motion.div>

        {/* Main content grid - Responsive */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 items-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
          {/* Left Side - Header and Statistics */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 flex flex-col justify-center order-1"
          >
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <motion.p
                className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl font-light font-montserrat leading-tight text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl">
                  We've helped AI tool
                  <span className="relative">
                    s
                    <FloatingIcon
                      icon={zap}
                      colorClassName="text-blue-400"
                      containerClassName="
                        absolute -top-6 left-1/2 -translate-x-1/3 w-12 h-12
                        sm:-top-4 sm:w-12 sm:h-12
                        md:-top-7 md:left-1 md:w-12 md:h-12
                        lg:-top-4 lg:w-4 lg:h-4
                        xl:-top-14 -left-2 xl:w-20 xl:h-20"
                      opacity={1}
                      zIndex={10}
                      enableRotation={true}
                      rotationRange={4}
                    />
                  </span>{" "}
                  <br />
                  go from just launched to
                  <br />
                </span>
                <span className="text-primary font-light">
                  talked about everywhere.
                </span>
              </motion.p>
            </div>
            {/* Statistics Grid */}
            <StatisticsGrid statistics={statistics} />
          </motion.div>

          {/* Right Side - Interactive Blob Animation */}
          <motion.div
            className="relative flex items-center justify-center order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <BlobAnimation
              shapes={shapes}
              isHovered={isHovered}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl sm:blur-3xl -z-10"
              animate={{
                scale: isHovered ? 1.8 : 1.2,
                opacity: isHovered ? 0.6 : 0.3,
              }}
              style={{
                background: isHovered
                  ? "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(168, 85, 247, 0.3) 40%, rgba(236, 72, 153, 0.2) 70%, transparent 100%)"
                  : "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 80%)",
              }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        </div>

        {/* Description text spanning under both sections */}
        <motion.div
          className="mt-2 sm:mt-4 md:mt-6 lg:mt-8 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-xl sm:text-xl text-balance md:text-3xl lg:text-3xl text-foreground leading-relaxed font-nunito">
            Good tools need more than views, they need momentum.
            <br />
            <span className="text-primary text-xl sm:text-xl md:text-4xl lg:text-4xl">
              That's what we build at Creator Space.
            </span>
          </p>
        </motion.div>
              
        {/* Trusted Companies Section */}
        <motion.div
          className="text-center mt-16 sm:mt-20 md:mt-24 lg:mt-28 xl:mt-32 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-montserrat lg:text-4xl xl:text-5xl font-bold leading-tight mb-3 sm:mb-4 md:mb-6 relative">
            Trusted by{" "}
            <span className="text-primary relative">
              Leading Companie
              <span className="relative">
                s{/* Heart icon above the letter "s" */}
                <FloatingIcon
                  icon={<Heart weight="fill" />}
                  colorClassName="text-white"
                  containerClassName="
                    absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4
                      sm:-top-3 sm:w-5 sm:h-5
                      md:-top-3 md:w-6 md:h-6
                      lg:-top-5 lg:w-5 lg:h-5
                      xl:-top-2 xl:w-7 xl:h-7
                  "
                  opacity={0.9}
                  zIndex={10}
                  enableRotation={true}
                  rotationRange={15}
                />
              </span>
            </span>
          </h2>
          <motion.p
            className="text-base sm:text-base font-nunito md:text-lg lg:text-xl text-muted-foreground
              max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            We've partnered with innovative organizations to deliver
            cutting-edge AI solutions that drive real results
          </motion.p>
        </motion.div>

        {/* Enhanced Marquee Section */}
        <div className="relative mt-8 sm:mt-12 md:mt-16">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />
          <motion.div
            className="relative overflow-hidden py-4 sm:py-6 md:py-8"
            onMouseEnter={() => setIsMarqueeHovered(true)}
            onMouseLeave={() => setIsMarqueeHovered(false)}
          >
            <motion.div
              className="flex space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12"
              animate={{
                x: isMarqueeHovered ? -50 : -100,
              }}
              transition={{
                duration: isMarqueeHovered ? 40 : 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                width: "200%",
              }}
            >
              {[...clients, ...clients].map((client, index) => {
                const Icon = client.icon;
                return (
                  <motion.div
                    key={`client-${index}`}
                    className="flex-shrink-0 group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 rounded-xl sm:rounded-2xl bg-primary/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                      <Icon
                        className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${client.color} group-hover:scale-110 transition-transform duration-300`}
                      />
                      <span className="text-sm sm:text-base md:text-lg font-semibold text-foreground group-hover:text-primary font-nunito transition-colors duration-300 whitespace-nowrap">
                        {client.name}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Background decorative icons */}
        <FloatingIcon
          icon={<Anchor weight="bold" />}
          colorClassName="text-blue-300"
          containerClassName="
            absolute top-10 left-4 w-4 h-4
            sm:top-12 sm:left-8 sm:w-5 sm:h-5
            md:top-16 md:left-12 md:w-6 md:h-6
            lg:top-10 lg:left-4 lg:w-5 lg:h-5
            xl:top-14 xl:left-1 xl:w-10 xl:h-10
          "
          opacity={1}
          zIndex={1}
          enableRotation={true}
          rotationRange={20}
        />

        <FloatingIcon
          icon={<Star weight="thin" />}
          colorClassName="text-yellow-300"
          containerClassName="
            absolute top-1/2 left-8 w-3 h-3
            sm:left-12 sm:w-4 sm:h-4
            md:left-16 md:w-5 md:h-5
            lg:left-8 lg:w-4 lg:h-4
            xl:left-12 xl:w-5 xl:h-5
          "
          opacity={0.6}
          zIndex={1}
          enableRotation={true}
          rotationRange={25}
        />
      </div>
    </section>
  );
};

export default PartnerBrands;
