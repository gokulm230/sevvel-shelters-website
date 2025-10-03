"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Building2, Handshake, Scale } from "lucide-react"
import Link from "next/link"

export function ServicesSection() {
  const services = [
    {
      id: "liaison",
      title: "Liaison Services",
      description: "We provide government-approved liaison services for businesses, ensuring smooth operations through our guidance.",
      icon: Building2,
      image: "/business-law.jpg",
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
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Core Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link key={service.id} href={`/services?service=${service.id}`}>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 group border-0 cursor-pointer">
                <CardContent className="p-0">
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-lg bg-gradient-to-br from-green-800 to-purple-500">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Service Icon Overlay */}
                    <div className={`absolute top-4 left-4 w-12 h-12 ${service.iconBg} rounded-full flex items-center justify-center`}>
                      <service.icon className={`h-6 w-6 ${service.iconColor}`} />
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-800 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-8">
            Why Choose Sevvel Shelters
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-green-800" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Expert Team</h4>
              <p className="text-gray-600">Experienced professionals dedicated to your success</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Handshake className="h-8 w-8 text-green-800" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Trusted Service</h4>
              <p className="text-gray-600">Reliable and transparent business practices</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="h-8 w-8 text-green-800" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Legal Compliance</h4>
              <p className="text-gray-600">Ensuring all regulations and standards are met</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-green-800" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Quality Results</h4>
              <p className="text-gray-600">Delivering excellence in every project</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
