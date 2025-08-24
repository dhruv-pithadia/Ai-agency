"use client"

import { motion } from "framer-motion"
import React, { createElement, isValidElement } from "react"
import type { ComponentType, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

export interface FloatingIconProps {
  icon: ComponentType<any> | string | ReactNode
  // Replaces x, y, and size. You pass all positioning and sizing classes here.
  // e.g., "absolute top-[15%] left-[10%] w-10 h-10 md:top-[20%] md:left-[50%]"
  containerClassName?: string
  delay?: number
  duration?: number
  opacity?: number
  // You can still pass color classes for SVGs
  colorClassName?: string
  // Pass any other classes for the icon element itself
  className?: string
  // Removed movement props since icons should be static
  zIndex?: number
  // Optional: Add subtle rotation only
  enableRotation?: boolean
  rotationRange?: number
}

export default function FloatingIcon({
  icon,
  containerClassName,
  delay = 0,
  duration = 6,
  opacity = 1,
  colorClassName = "text-white",
  className = "",
  zIndex = 0,
  enableRotation = false,
  rotationRange = 5,
}: FloatingIconProps) {
  const renderIcon = () => {
    // The icon should fill its container, which is sized by containerClassName.
    const mergedIconClasses = twMerge("w-full h-full", colorClassName, className)

    const iconProps = {
      className: mergedIconClasses,
      style: { opacity },
    }

    if (typeof icon === "string") {
      return (
        <img
          src={icon || "/placeholder.svg"}
          alt="Floating icon"
          className={twMerge("object-contain", className)} // Ensure it scales nicely
          style={{ opacity, width: "100%", height: "100%" }}
          loading="lazy"
        />
      )
    }

    if (isValidElement(icon)) {
      return React.cloneElement(icon, {
        ...icon.props,
        className: twMerge("w-full h-full", icon.props.className, colorClassName, className),
        style: { ...icon.props.style, opacity },
      })
    }

    if (typeof icon === "function" || (typeof icon === "object" && icon !== null)) {
      return createElement(icon as ComponentType<any>, iconProps)
    }

    return null
  }

  return (
    // Static positioning with optional subtle rotation
    <motion.div
      className={twMerge("absolute pointer-events-none", containerClassName)}
      style={{ zIndex }}
      initial={{ rotate: 0 }}
      animate={
        enableRotation
          ? {
              rotate: [-rotationRange, rotationRange, -rotationRange],
            }
          : {}
      }
      transition={
        enableRotation
          ? {
              delay,
              duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }
          : {}
      }
    >
      {renderIcon()}
    </motion.div>
  )
}
