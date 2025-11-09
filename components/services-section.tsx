"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Building2, Handshake, Scale } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  staggerContainer, 
  fadeInUp, 
  scaleIn,
  slideInLeft,
  slideInRight,
  serviceCardVariant,
  iconFloat
} from "@/lib/animations"

export function ServicesSection() {
  const services = [
    {
      id: "liaison",
      title: "Liaison Services",
      description: "We provide government-approved liaison services for businesses, ensuring smooth operations through our guidance.",
      icon: Building2,
      image: "business-law.jpg",
      iconBg: "bg-green-100",
      iconColor: "text-green-800"
    },
    {
      id: "real-estate",
      title: "Real Estate Services", 
      description: "As a leading real estate market, our dedicated team provides tailored solutions for buying, selling, and investing in prime properties.",
      icon: Handshake,
      image: "/featured-main.jpg",
      iconBg: "bg-green-100",
      iconColor: "text-green-800"
    },
    {
      id: "legal",
      title: "Legal Services",
      description: "We offer expert counsel and comprehensive services tailored to meet diverse legal requirements with precision and reliability.",
      icon: Scale,
      image: "/other-services-min-1024x726.jpeg.jpg",
      iconBg: "bg-green-100", 
      iconColor: "text-green-800"
    }
  ]

  return (
    <section id="services" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-200/20 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 relative"
            variants={slideInLeft}
          >
            Our Core Services
            {/* Decorative underline */}
            <motion.div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-green-600 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "120px" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            ></motion.div>
          </motion.h2>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={serviceCardVariant}
              whileHover="hover"
              className="group"
            >
              <Link href={`/services?service=${service.id}`}>
                <Card className="bg-white shadow-lg hover:shadow-2xl transition-all p-0 duration-500 group border-0 cursor-pointer overflow-hidden relative">
                  {/* Gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-green-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="p-0 relative z-10">
                    {/* Service Image */}
                    <div className="relative h-48 overflow-hidden rounded-t-lg bg-gradient-to-br from-green-800 to-purple-500">
                      <img 
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Service Icon Overlay */}
                      <motion.div 
                        className={`absolute top-4 left-4 w-12 h-12 ${service.iconBg} rounded-full flex items-center justify-center`}
                        variants={iconFloat}
                        whileHover="hover"
                      >
                        <service.icon className={`h-6 w-6 ${service.iconColor}`} />
                      </motion.div>

                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Service Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-800 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {service.description}
                      </p>
                      
                      {/* Animated arrow indicator */}
                      <div className="mt-4 flex items-center text-green-600 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                        <span className="text-sm font-medium">Learn More</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div 
          className="mt-20 text-center"
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-green-800 mb-8"
            variants={fadeInUp}
          >
            Why Choose Sevvel Shelters
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            <motion.div 
              className="text-center group cursor-pointer"
              variants={scaleIn}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300"
                variants={iconFloat}
                whileHover="hover"
              >
                <Building2 className="h-8 w-8 text-green-800" />
              </motion.div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-800 transition-colors">Expert Team</h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors">Experienced professionals dedicated to your success</p>
            </motion.div>
            
            <motion.div 
              className="text-center group cursor-pointer"
              variants={scaleIn}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300"
                variants={iconFloat}
                whileHover="hover"
              >
                <Handshake className="h-8 w-8 text-green-800" />
              </motion.div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-800 transition-colors">Trusted Service</h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors">Reliable and transparent business practices</p>
            </motion.div>
            
            <motion.div 
              className="text-center group cursor-pointer"
              variants={scaleIn}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300"
                variants={iconFloat}
                whileHover="hover"
              >
                <Scale className="h-8 w-8 text-green-800" />
              </motion.div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-800 transition-colors">Legal Compliance</h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors">Ensuring all regulations and standards are met</p>
            </motion.div>
            
            <motion.div 
              className="text-center group cursor-pointer"
              variants={scaleIn}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300"
                variants={iconFloat}
                whileHover="hover"
              >
                <Building2 className="h-8 w-8 text-green-800" />
              </motion.div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-800 transition-colors">Quality Results</h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors">Delivering excellence in every project</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
