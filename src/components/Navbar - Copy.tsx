"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('button[aria-label*="menu"]')
      ) {
        closeMenu()
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      // Prevent background scrolling when menu is open
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        closeMenu()
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    // Close mobile menu if open
    if (isMenuOpen) {
      closeMenu()
    }
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleNavClick = (href: string) => {
    closeMenu()
    // Small delay to ensure menu closes before scrolling
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }, 200)
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          "py-2 sm:py-3 md:py-4 lg:py-4",
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border/50" : "bg-background/80",
        )}
      >
        <div className="container flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 max-w-7xl mx-auto">
          {/* Logo - Responsive */}
          <a
            href="#"
            className="flex items-center space-x-1.5 sm:space-x-2 group"
            onClick={(e) => {
              e.preventDefault()
              scrollToTop()
            }}
            aria-label="AI Spaces"
          >
            <div className="relative">
              <div className="scale-[3] sm:scale-[3] md:scale-[2] lg:scale-[4] xl:scale-[5] w-[60px] mt-2 h-[60px] ml-4 sm:w-[60px] sm:ml-4 sm:h-[60px] md:ml-4 md:w-[100px] md:h-[100px] lg:w-[40px] lg:h-[40px] bg-transparent rounded-lg flex items-center justify-center transition-transform duration-300">
                <img
                  src="https://aispaces.in/creators/Creator-space.png"
                  alt="Sparkle Icon"
                  className="w-full h-full object-contain mx-auto drop-shadow-lg"
                  loading="lazy"
                />{" "}
              </div>
            </div>
          </a>
          {/* Desktop Navigation - Responsive */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            <a
              href="#"
              className="text-xs sm:text-sm md:text-base font-medium text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
              onClick={(e) => {
                e.preventDefault()
                scrollToTop()
              }}
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#creators"
              className="text-xs sm:text-sm md:text-base font-medium text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("#creators")
              }}
            >
              Our Creators
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#brand-partners"
              className="text-xs sm:text-sm md:text-base font-medium text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("#brand-partners")
              }}
            >
              Brand Partners
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#services"
              className="text-xs sm:text-sm md:text-base font-medium text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("#services")
              }}
            >
              Our Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#contact"
              className="text-xs sm:text-sm md:text-base font-medium text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("#contact")
              }}
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          </nav>
          {/* Mobile controls - Responsive */}
          <div className="md:hidden flex items-center space-x-1 sm:space-x-2">
            <button
              className="text-foreground p-1.5 sm:p-2 hover:bg-muted rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={18} className="sm:w-5 sm:h-5" /> : <Menu size={18} className="sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible",
        )}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={closeMenu} aria-hidden="true" />
        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={cn(
            "absolute right-0 top-0 h-full w-full max-w-sm bg-background/95 backdrop-blur-md shadow-xl transition-transform duration-300 ease-in-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          {/* Mobile Menu Content */}
          <nav className="flex flex-col mt-20 p-4 sm:p-6 space-y-2">
            <a
              href="#"
              className="text-base sm:text-lg font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:bg-muted/50 transition-colors duration-300 text-center"
              onClick={(e) => {
                e.preventDefault()
                scrollToTop()
              }}
            >
              Home
            </a>
            <a
              href="#creators"
              className="text-base sm:text-lg font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:bg-muted/50 transition-colors duration-300 text-center"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("#creators")
              }}
            >
              Our Creators
            </a>
            <a
              href="#brand-partners"
              className="text-base sm:text-lg font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:bg-muted/50 transition-colors duration-300 text-center"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("#brand-partners")
              }}
            >
              Brand Partners
            </a>
            <a
              href="#services"
              className="text-base sm:text-lg font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:bg-muted/50 transition-colors duration-300 text-center"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("#services")
              }}
            >
              Our Services
            </a>
            <a
              href="#contact"
              className="text-base sm:text-lg font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:bg-muted/50 transition-colors duration-300 text-center"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("#contact")
              }}
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Navbar
