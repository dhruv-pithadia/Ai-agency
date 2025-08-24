import React, { Suspense, lazy, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// --- Step 1: Dynamically import components that are not needed for the initial view ---
// These components will now be loaded in separate JavaScript files only when they are about to be rendered.
const CreatorSection = lazy(() => import("@/components/CreatorSection"));
const PartnerBrands = lazy(() => import("@/components/PartnerBrands"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const ContactForm = lazy(() => import("@/components/ContactForm"));
const Footer = lazy(() => import("@/components/Footer"));
const BackToTop = lazy(() => import("@/components/BackToTop"));

// A simple fallback component to show while the other components are loading.
// You can style this or use a spinner component from your library.
const LoadingFallback = () => <div className="w-full h-96 flex justify-center items-center">Loading...</div>;

const Index = () => {
  // Your useEffect hooks for animations and smooth scrolling can remain as they are.
  // They are side effects that run after the component mounts and will work correctly
  // with the lazy-loaded components once they appear in the DOM.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // We'll re-query this inside a timeout to ensure lazy components are in the DOM.
    // This is a robust way to handle animations on dynamically loaded content.
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((el) => observer.observe(el));
    }, 100); // A small delay is usually enough
    
    return () => {
      clearTimeout(timeoutId);
      document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    // This hook is fine as is.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        const offset = window.innerWidth < 768 ? 100 : 80;
        
        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen">
      {/* --- Components needed immediately are loaded normally --- */}
      <Navbar />
      <main className="space-y-0">
        <Hero />

        {/* --- Step 2: Wrap the lazy components in a Suspense boundary --- */}
        {/* The browser will load the Hero section first. Once it's done, it will start */}
        {/* downloading the code for the components inside Suspense. While they load, */}
        {/* the fallback UI will be shown. */}
        <Suspense fallback={<LoadingFallback />}>
          <CreatorSection/>
          <PartnerBrands/>
          <ServicesSection />
          <ContactForm />
        </Suspense>
      </main>

      {/* You can also lazy-load the footer and other non-critical UI elements */}
      <Suspense fallback={null}> {/* No need for a loading indicator for these */}
        <Footer />
        <BackToTop />
      </Suspense>
    </div>
  );
};

export default Index;