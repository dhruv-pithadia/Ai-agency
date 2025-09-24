"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface MobileImageCarouselProps {
  images?: string[]
  autoplayDelay?: number
  className?: string
}

export default function MobileImageCarousel({
  images = [
    `/placeholder.svg?height=1280&width=720&query=mobile showcase image 1`,
    `/placeholder.svg?height=1280&width=720&query=mobile showcase image 2`,
    `/placeholder.svg?height=1280&width=720&query=mobile showcase image 3`,
  ],
  autoplayDelay = 5000,
  className = "",
}: MobileImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const [isPressedAndHeld, setIsPressedAndHeld] = useState(false)
  const imageRefs = useRef<(HTMLImageElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const pressHoldTimer = useRef<NodeJS.Timeout | null>(null)

  const scrollToImage = (index: number) => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scrollLeft = index * container.clientWidth

    container.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, images.length)

    images.forEach((image, index) => {
      if (imageRefs.current[index]) {
        const imageEl = imageRefs.current[index]
        if (imageEl) {
          // Images don't need preload or load() calls like videos
          imageEl.src = image
        }
      }
    })
  }, [images, currentIndex])

  useEffect(() => {
    if (isUserInteracting || isPressedAndHeld) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % images.length
        scrollToImage(nextIndex)
        return nextIndex
      })
    }, autoplayDelay)

    return () => clearInterval(interval)
  }, [images.length, autoplayDelay, isUserInteracting, isPressedAndHeld])

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsUserInteracting(true)
    touchStartX.current = e.touches[0].clientX

    // Start press and hold timer
    pressHoldTimer.current = setTimeout(() => {
      setIsPressedAndHeld(true)
    }, 500) // 500ms hold to stop auto-scroll
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX

    // Cancel press and hold if user moves finger
    if (pressHoldTimer.current) {
      clearTimeout(pressHoldTimer.current)
      pressHoldTimer.current = null
    }
  }

  const handleTouchEnd = () => {
    // Clear press and hold timer
    if (pressHoldTimer.current) {
      clearTimeout(pressHoldTimer.current)
      pressHoldTimer.current = null
    }

    const deltaX = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Swipe left - next image
        const nextIndex = (currentIndex + 1) % images.length
        setCurrentIndex(nextIndex)
        scrollToImage(nextIndex)
      } else {
        // Swipe right - previous image
        const prevIndex = (currentIndex - 1 + images.length) % images.length
        setCurrentIndex(prevIndex)
        scrollToImage(prevIndex)
      }
    }

    // Reset user interaction after a delay
    setTimeout(() => setIsUserInteracting(false), 3000)
  }

  const handleDoubleClick = () => {
    setIsPressedAndHeld(false)
  }

  const handleScroll = () => {
    if (!containerRef.current || isUserInteracting) return

    const container = containerRef.current
    const scrollLeft = container.scrollLeft
    const itemWidth = container.clientWidth
    const newIndex = Math.round(scrollLeft / itemWidth)

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < images.length) {
      setCurrentIndex(newIndex)
    }
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Image Container */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleClick}
        onScroll={handleScroll}
      >
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-full snap-center snap-always">
            <div className="relative aspect-[9/16] w-full max-w-[200px] mx-auto rounded-xl overflow-hidden bg-black">
              <img
                ref={(el) => (imageRefs.current[index] = el)}
                src={image || "/placeholder.svg"}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover"
                onContextMenu={(e) => e.preventDefault()}
              />

              {/* Image overlay with subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

              {isPressedAndHeld && (
                <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  Auto-scroll paused
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
