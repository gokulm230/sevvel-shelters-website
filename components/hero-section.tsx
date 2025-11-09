"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { heroTextVariant, staggerContainer, fadeInUp, floatingVariant } from "@/lib/animations"
import { RepeatingTypewriter } from "@/components/repeating-typewriter"

export function HeroSection() {
  // Smooth scroll to section function with offset for navbar
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition = element.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle explore projects click
  const handleExploreClick = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      scrollToSection('projects');
    } else {
      // If projects section not found on current page, could navigate to projects page
      // For now, just scroll to projects section
      scrollToSection('projects');
    }
  };

  // Handle contact action (scroll to contact section)
  const handleContactClick = () => {
    scrollToSection('contact');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial="hidden"
        animate="show"
        variants={staggerContainer}
      >
        <motion.div 
          className="absolute w-72 h-72 bg-green-200 opacity-10 rounded-full blur-3xl top-20 left-10"
          variants={floatingVariant}
          animate="animate"
        />
        <motion.div 
          className="absolute w-96 h-96 bg-emerald-200 opacity-8 rounded-full blur-3xl bottom-20 right-10"
          variants={floatingVariant}
          animate="animate"
          style={{ animationDelay: "2s" }}
        />
        <motion.div 
          className="absolute w-48 h-48 bg-primary/20 rounded-full blur-2xl top-1/3 right-1/4"
          variants={floatingVariant}
          animate="animate"
          style={{ animationDelay: "4s" }}
        />
      </motion.div>

      {/* Background Image */}
      <motion.div 
        className="absolute top-16 inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src="/indoor-plants-studio.jpg"
          alt="Set designer work indoors"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial="hidden"
        animate="show"
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance min-h-[150px] md:min-h-[200px] lg:min-h-[250px] flex flex-col justify-center items-center"
            variants={heroTextVariant}
          >
            <RepeatingTypewriter
              lines={["Building Dreams,", "Creating Homes"]}
              delay={800}
              speed={120}
              lineDelay={800}
              className="text-center"
              lineColors={["text-white", "text-primary"]}
              pauseDuration={3000}
              eraseSpeed={60}
            />
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto text-pretty"
            variants={fadeInUp}
          >
            Premium real estate projects in Coimbatore. Experience quality construction, modern amenities, and
            sustainable living with Sevvel Shelters.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={staggerContainer}
          >
            {/* Primary CTA Button - Explore Projects */}
            <motion.div variants={fadeInUp}>
              <motion.div
                className="relative overflow-hidden rounded-lg"
                initial={{ scale: 1, rotateX: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateX: 5,
                  boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
                }}
                whileTap={{ 
                  scale: 0.95,
                  rotateX: -2
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 20
                }}
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: "200% 100%"
                  }}
                />
                
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0"
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Button content */}
                <Button 
                  size="lg" 
                  className="relative z-10 bg-transparent hover:bg-transparent text-white px-8 py-3 text-lg font-semibold border-0 shadow-none"
                  onClick={handleExploreClick}
                >
                  <span className="relative">
                    Explore Projects
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </Button>
                
                {/* Ripple effect on click */}
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-lg"
                  initial={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 1.2, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </motion.div>

            {/* Secondary CTA Button - Contact Us */}
            <motion.div variants={fadeInUp}>
              <motion.div
                className="relative overflow-hidden rounded-lg group"
                initial={{ scale: 1, rotateX: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateX: 5,
                  boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)"
                }}
                whileTap={{ 
                  scale: 0.95,
                  rotateX: -2
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 20
                }}
              >
                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.5), transparent)",
                    backgroundSize: "200% 200%"
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Inner content with backdrop */}
                <motion.div
                  className="absolute inset-[1px] bg-black/20 backdrop-blur-sm rounded-lg"
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Button content */}
                <Button
                  size="lg"
                  variant="ghost"
                  className="relative z-10 border-0 text-white hover:bg-transparent hover:text-white px-8 py-3 text-lg font-semibold"
                  onClick={handleContactClick}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                  </motion.div>
                  <span className="relative">
                    Contact Us
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-white"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                </Button>
                
                {/* Particle effect on hover */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full opacity-0"
                  whileHover={{
                    scale: [0, 20, 0],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{ duration: 0.6 }}
                  style={{ transform: "translate(-50%, -50%)" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <motion.div 
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}