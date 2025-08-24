"use client"

import { motion } from "framer-motion"
import { Linkedin, Heart, Instagram } from "lucide-react"
import BackgroundBlobs from "./BackgroundBlobs"
import type { LucideIcon } from "lucide-react"

interface FooterLink {
  name: string
  href: string
  icon?: LucideIcon // Make icon optional for non-social links if needed elsewhere
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const Footer = () => {
  const footerSections: FooterSection[] = [
    {
      title: "SOCIAL MEDIA",
      links: [
        { name: "Instagram", href: "https://www.instagram.com/aispaces.in/ ", icon: Instagram },
        { name: "LinkedIn", href: "https://www.linkedin.com/company/aispaces.in/", icon: Linkedin },
      ],
    },
  ]

  return (
    <footer className="w-full border-t border-border/50 relative overflow-hidden">
      <BackgroundBlobs />
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl py-12 sm:py-4 md:py-8">
        {/* Top Section with Links and Actions */}
        <div className="grid grid-cols-1 gap-8 sm:gap-12 mb-16 sm:mb-20">
          {/* Footer Links */}
          {footerSections.map((section) => (
            <motion.div
              key={section.title}
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }} // Removed delay and reduced duration for faster appearance
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-bold text-muted-foreground tracking-wider uppercase">{section.title}</h3>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                {" "}
                {/* Changed to div with flex for side-by-side */}
                {section.links.map((link, linkIndex) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={linkIndex}
                      href={link.href}
                      className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300 text-sm sm:text-base font-medium whitespace-nowrap"
                    >
                      {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5" />} {/* Render icon if available */}
                      {link.name}
                    </a>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="relative mb-8 sm:mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }} // Reduced duration from 0.8s to 0.3s for faster scaling animation
          viewport={{ once: true }}
        >
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent leading-none tracking-tight">
            Creator
          </h1>
          <div
            className="
              absolute
              -top-1 right-10
              sm:top-6 sm:right-6
              md:top-3 md:right-10
              lg:top-14 lg:right-14
              xl:top-20 xl:right-20
              w-16 h-16
              sm:w-20 sm:h-20
              md:w-28 md:h-28
              lg:w-32 lg:h-32
            "
          >
          </div>
        </motion.div>
        {/* Made with love */}
        <motion.div
          className="text-center mt-8 pt-6 bottom-0 border-t border-border/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2 }} // Removed delay and reduced duration for immediate appearance
          viewport={{ once: true }}
        >
          <p className="text-sm font-nunito text-muted-foreground">
            Made by{" "}
            <a
              href="https://github.com/EhsaasChaudhary"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              Ehsaas Chaudhary
            </a>{" "}
            with <Heart className="w-4 h-4 inline text-red-500 animate-pulse" />
          </p>
        </motion.div>
      </div>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
    </footer>
  )
}

export default Footer
