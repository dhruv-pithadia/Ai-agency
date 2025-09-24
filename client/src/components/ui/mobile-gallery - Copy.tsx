"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface MobileVideoCarouselProps {
  videos?: string[]
  autoplayDelay?: number
  className?: string
}

export default function MobileVideoCarousel({
  videos = [
    `https://aispaces.in/creators/placeholder.mp4?height=1280&width=720&query=mobile showcase video 1`,
    `https://aispaces.in/creators/placeholder.mp4?height=1280&width=720&query=mobile showcase video 2`,
    `https://aispaces.in/creators/placeholder.mp4?height=1280&width=720&query=mobile showcase video 3`,
  ],
  autoplayDelay = 5000,
  className = "",
}: MobileVideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const [isPressedAndHeld, setIsPressedAndHeld] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const pressHoldTimer = useRef<NodeJS.Timeout | null>(null)

  const scrollToVideo = (index: number) => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scrollLeft = index * container.clientWidth

    container.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    })
  }

  // Preload and setup videos
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length)

    videos.forEach((video, index) => {
      if (videoRefs.current[index]) {
        const videoEl = videoRefs.current[index]
        if (videoEl) {
          videoEl.preload = "metadata"
          videoEl.load()

          // Play current video, pause others
          if (index === currentIndex) {
            videoEl.play().catch(() => {
              console.log("Autoplay prevented for video:", video)
            })
          } else {
            videoEl.pause()
          }
        }
      }
    })
  }, [videos, currentIndex])

  useEffect(() => {
    if (isUserInteracting || isPressedAndHeld) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % videos.length
        scrollToVideo(nextIndex)
        return nextIndex
      })
    }, autoplayDelay)

    return () => clearInterval(interval)
  }, [videos.length, autoplayDelay, isUserInteracting, isPressedAndHeld])

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
        // Swipe left - next video
        const nextIndex = (currentIndex + 1) % videos.length
        setCurrentIndex(nextIndex)
        scrollToVideo(nextIndex)
      } else {
        // Swipe right - previous video
        const prevIndex = (currentIndex - 1 + videos.length) % videos.length
        setCurrentIndex(prevIndex)
        scrollToVideo(prevIndex)
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

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < videos.length) {
      setCurrentIndex(newIndex)
    }
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Video Container */}
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
        {videos.map((video, index) => (
          <div key={index} className="flex-shrink-0 w-full snap-center snap-always">
            <div className="relative aspect-[9/16] w-full max-w-[200px] mx-auto rounded-xl overflow-hidden bg-black">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={video}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                preload="metadata"
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                onLoadedMetadata={() => {
                  // Ensure current video plays when loaded
                  if (index === currentIndex && videoRefs.current[index]) {
                    videoRefs.current[index]?.play().catch(() => {
                      console.log("Autoplay prevented")
                    })
                  }
                }}
              />

              {/* Video overlay with subtle gradient */}
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
