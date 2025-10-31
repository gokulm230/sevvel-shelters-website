"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Handshake, Scale, ArrowLeft, Phone } from "lucide-react"
import Link from "next/link"

function ServicesPageContent() {
  const searchParams = useSearchParams()
  const [activeService, setActiveService] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  const services = {
    liaison: {
      id: "liaison",
      title: "Liaison Services - As Per Government Norms Only",
      icon: Building2,
      description: "Welcome to Sevvel Shelters, your trusted partner for liaison services strictly adhering to government norms. Our expertise lies in providing comprehensive liaison services to ensure seamless compliance with regulatory requirements for your projects. From DTCP/LPA approval to land conversion, IIACA approval, corporation compliance, airport compliance, fire compliance, approval feasibility reports, RERA compliance, and technical due diligence, we offer different liaison services to meet your needs.",
      secondDescription: "Our team is proficient in navigating government regulations, offering efficient and reliable liaison services tailored to your needs. We prioritize client satisfaction and strive to ensure smooth approval processes for your projects, ensuring a smoother regulatory landscape.",
      thirdDescription: "At Sevvel Shelters, we prioritize client satisfaction and strive to exceed your expectations. Contact us today to learn more about how we can assist you in achieving your project goals while ensuring full compliance with government norms. Let us be your partners in success.",
      image: "/business-law.jpg",
      features: [
        "DTCP / LPA Approval - We facilitate the approval process for your development projects with the Department of Town and Country Planning (DTCP) or the Local Planning Authority (LPA)",
        "Land Conversion - Our team assists in obtaining the necessary approvals for converting land from agricultural to non-agricultural use, ensuring compliance with land use regulations",
        "IIACA Approval - We help you secure approvals from the relevant authorities, such as the Heritage Conservation and Archaeology Department, for projects involving heritage or archaeological sites",
        "Corporation Compliance - We ensure compliance with municipal corporation regulations and assist in obtaining necessary approvals for your projects within municipal limits",
        "Airport Compliance - Our services include navigating the regulatory requirements for projects near airports to ensure safety and compliance with zoning regulations",
        "Fire Compliance - We assist in obtaining fire safety approvals and compliance certificates for your projects, ensuring adherence to fire safety regulations",
        "Approved Feasibility Report - Our team conducts feasibility studies and prepares detailed reports to evaluate your projects' approval requirements and feasibility",
        "RERA Compliance - We guide you through the compliance process with the Real Estate Regulatory Authority (RERA) to ensure adherence to real estate regulations and protect buyers' interests",
        "Technical Due Diligence - We conduct thorough technical due diligence assessments to identify any potential risks or issues related to your projects' regulatory compliance and technical aspects"
      ]
    },
    realEstate: {
      id: "realEstate",
      title: "Real Estate Services",
      icon: Handshake,
      description: "Welcome to Sevvel Shelters, your trusted partner for all your real estate needs. We specialize in various services, including land aggregation, property buying, property selling, and joint ventures.",
      secondDescription: "Whether you're looking to invest in land for development, buy or sell a property, or explore joint ventures opportunities, our experienced team guides you through every step.",
      thirdDescription: "Sevvel Shelters prioritizes client satisfaction and strives to provide exceptional results that are tailored to your specific needs. Trust Sevvel Shelters to handle your real estate transactions in a professional, honest, and efficient manner. Contact us today to learn more about how we will help you in achieving your real estate goals. Let Sevvel Shelters be your partner in building your real estate portfolio and realizing your investment dreams.",
      image: "/featured-main.jpg",
      features: [
        "Land Aggregation - We offer expert services in land aggregation, specializing in efficient parcel aggregation for development projects, allowing land owners to unlock potential and streamline the development process",
        "Property Buying - Find your ideal property seamlessly with Sevvel Shelters' comprehensive buying services. Get benefits from our expert guidance and support throughout the entire purchasing journey",
        "Joint Ventures - Explore lucrative real estate opportunities through Joint Ventures partnerships with Sevvel Shelters. Collaborate with us to embark on mutually beneficial ventures and achieve success in the real estate market",
        "Property Selling - Maximize your returns on property sales with Sevvel Shelters' strategic selling services. Utilize our effective marketing strategies and negotiation skills to ensure optimal sale prices"
      ]
    },
    legal: {
      id: "legal",
      title: "Legal Services",
      icon: Scale,
      description: "At Sevvel Shelters, we specialize in providing comprehensive legal services to clients in the real estate sector, ensuring legal compliance and the protection of their assets. With a team of seasoned legal professionals and top-notch advocates, we offer a wide range of services tailored to meet the diverse needs of our clients.",
      secondDescription: "Sevvel Shelters is a legal firm with a team of skilled professionals who provide customized solutions to meet the unique needs of each client. We are committed to excellence, upholding professionalism, integrity, and ethics. Our client-centric approach ensures satisfaction, and we have a proven track record of successful outcomes.",
      thirdDescription: "Our goal is to empower clients to navigate the legal landscape with confidence and peace of mind, offering reliable, efficient, and effective legal solutions.",
      image: "/other-services-min-1024x726.jpeg.jpg",
      features: [
        "Due Diligence and Pre-Verifications - Our services guarantee the solid foundation of your real estate ventures through meticulous due diligence, pre-verification, risk identification, and legal compliance",
        "Asset Audits – Registrations - Our services include asset audits and registration, ensuring legal compliance and proper documentation, thereby safeguarding your assets for future growth and stability",
        "Legal opinion with topnotch lawyers - Our team of top-notch lawyers offers expert legal opinions, tailored to your unique needs and challenges, providing clarity and confidence in legal matters",
        "Suggesting advocates for the legal issues - We offer expert legal advice for High Court and Supreme Court matters, ensuring efficient and effective representation for optimal outcomes"
      ]
    }
  }

  // Handle client-side mounting
  useEffect(() => {
    setIsClient(true)
    const serviceParam = searchParams?.get('service')
    
    // Map URL params to service keys
    const serviceMap: { [key: string]: string } = {
      'real-estate': 'realEstate',
      'legal': 'legal',
      'liaison': 'liaison'
    }
    
    const mappedService = serviceParam ? serviceMap[serviceParam] : null
    setActiveService(mappedService && services[mappedService as keyof typeof services] ? mappedService : 'liaison')
  }, [searchParams])

  // Show loading state until client-side hydration is complete and activeService is set
  if (!isClient || !activeService) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center relative overflow-hidden">
        {/* Subtle animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute w-72 h-72 bg-green-200 opacity-20 rounded-full blur-3xl animate-pulse top-10 left-10"></div>
          <div className="absolute w-96 h-96 bg-emerald-200 opacity-15 rounded-full blur-3xl animate-pulse bottom-10 right-10 animation-delay-1000"></div>
          <div className="absolute w-48 h-48 bg-teal-200 opacity-25 rounded-full blur-2xl animate-bounce top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animation-delay-500"></div>
        </div>
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-24 w-24 border-4 border-green-200 border-t-green-600 mx-auto mb-6 shadow-lg"></div>
          <p className="text-green-800 text-lg font-medium animate-pulse">Loading services...</p>
        </div>
      </div>
    )
  }

  const currentService = services[activeService as keyof typeof services]

  if (!currentService) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-green-800 text-lg">Service not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Subtle animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 bg-green-200 opacity-10 rounded-full blur-3xl animate-float top-20 left-10"></div>
        <div className="absolute w-80 h-80 bg-emerald-200 opacity-8 rounded-full blur-3xl animate-float-delayed bottom-20 right-10"></div>
        <div className="absolute w-40 h-40 bg-teal-200 opacity-15 rounded-full blur-2xl animate-bounce-slow top-1/3 right-1/4"></div>
        <div className="absolute w-32 h-32 bg-green-300 opacity-12 rounded-full blur-xl animate-pulse top-2/3 left-1/4"></div>
      </div>
      
      {/* Header */}
      <div className="relative z-10 bg-gradient-to-r from-green-800 via-emerald-700 to-green-900 text-white py-20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-green-100 hover:text-white mb-6 transition-all duration-500 transform hover:scale-105 hover:translate-x-2 group">
            <ArrowLeft className="h-5 w-5 mr-3 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="relative">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
              <span className="bg-gradient-to-r from-white via-green-100 to-emerald-100 bg-clip-text text-transparent">
                {currentService.title}
              </span>
            </h1>
            <div className="flex items-center space-x-2 mt-6">
              <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
              <div className="w-8 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse animation-delay-200"></div>
              <div className="w-4 h-1 bg-gradient-to-r from-teal-400 to-green-400 rounded-full animate-pulse animation-delay-400"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Service Image */}
            <div className="group animate-fade-in-up">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-green-200 transition-all duration-700 hover:shadow-green-500/20 hover:scale-105 hover:border-green-300">
                <img 
                  src={currentService.image}
                  alt={currentService.title}
                  className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  onError={(e) => {
                    e.currentTarget.src = "/modern-office-building-with-green-architecture-and.jpg"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <div className="flex items-center text-white bg-green-900/30 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <currentService.icon className="h-6 w-6 mr-3 animate-pulse" />
                    <span className="font-semibold">Professional Excellence</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Description */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-100 hover:bg-white/90 hover:shadow-2xl hover:border-green-200 transition-all duration-500 animate-fade-in-up animation-delay-200">
              <div className="prose max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed mb-6 hover:text-gray-900 transition-colors duration-300">
                  {currentService.description}
                </p>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-6 hover:text-gray-900 transition-colors duration-300">
                  {currentService.secondDescription}
                </p>

                <p className="text-gray-700 text-lg leading-relaxed hover:text-gray-900 transition-colors duration-300">
                  {currentService.thirdDescription}
                </p>
              </div>
            </div>

            {/* Service Features */}
            <div className="animate-fade-in-up animation-delay-400">
              <div className="flex items-center mb-8">
                <div className="w-2 h-12 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full mr-4 animate-pulse shadow-lg"></div>
                <h3 className="text-3xl font-bold text-gray-800 hover:text-green-800 transition-colors duration-300">
                  What We Provide In {currentService.id === 'liaison' ? 'Liaison Services' : 
                                     currentService.id === 'realEstate' ? 'Real Estate Services' : 
                                     'Legal Services'}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentService.features.map((feature, index) => {
                  const [title, description] = feature.split(' - ');
                  return (
                    <Card 
                      key={index} 
                      className="group bg-white/90 backdrop-blur-sm border border-green-100 hover:border-green-300 hover:bg-white transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl hover:shadow-green-500/10"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg group-hover:shadow-green-500/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                            <div className="w-8 h-8 bg-white rounded-xl opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-green-700 transition-colors duration-300">{title}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="relative group animate-fade-in-up animation-delay-600">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-green-600 to-emerald-700 p-8 rounded-2xl shadow-2xl border border-green-400 transform transition-all duration-500 hover:scale-105 hover:shadow-green-500/25">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Phone className="h-7 w-7 mr-4 animate-bounce text-green-100" />
                  Need Help? Call Us Now
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-white animate-pulse">+91 9489533001</span>
                  <Button className="bg-white text-green-600 hover:bg-green-50 hover:text-green-700 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-green-200">
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="sticky top-8 bg-white/90 backdrop-blur-sm border border-green-200 shadow-xl overflow-hidden group hover:bg-white hover:border-green-300 transition-all duration-500 animate-fade-in-up animation-delay-300">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-green-700 to-emerald-800 text-white p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h3 className="text-lg font-semibold flex items-center relative z-10">
                    <Building2 className="h-6 w-6 mr-3 animate-pulse" />
                    Our Services
                  </h3>
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
                </div>
                
                <div className="p-6 space-y-4 bg-gradient-to-b from-green-50/50 to-white">
                  {Object.values(services).map((service, index) => (
                    <button
                      key={service.id}
                      onClick={() => setActiveService(service.id)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-500 border-2 transform hover:scale-105 ${
                        activeService === service.id
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-400 shadow-lg scale-105 animate-pulse'
                          : 'bg-white/80 text-gray-700 hover:bg-green-50 border-green-100 hover:border-green-300 hover:text-green-800 hover:shadow-lg'
                      }`}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="flex items-center">
                        <service.icon className={`h-6 w-6 mr-4 transition-all duration-300 ${
                          activeService === service.id ? 'animate-bounce' : 'group-hover:scale-110'
                        }`} />
                        <span className="font-medium">
                          {service.id === 'liaison' ? 'Liaison Service' : 
                           service.id === 'realEstate' ? 'Real Estate Services' : 
                           'Legal Services'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="bg-white/90 backdrop-blur-sm border border-green-200 shadow-xl overflow-hidden group hover:shadow-2xl hover:border-green-300 transition-all duration-500 animate-fade-in-up animation-delay-500">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-600 to-green-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="relative text-white p-8 text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 animate-bounce-slow">
                      <Phone className="h-10 w-10 text-white animate-pulse" />
                    </div>
                    <h4 className="text-xl font-semibold mb-3">Get Expert Consultation</h4>
                    <p className="text-green-100 mb-6 text-sm leading-relaxed">Contact our experts for personalized service solutions</p>
                    <Button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-2 border-white/30 hover:border-white/50 font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 group">
                      <Phone className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                      Contact Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-24 w-24 border-4 border-green-200 border-t-green-600 mx-auto mb-6 shadow-lg"></div>
          <p className="text-green-800 text-lg font-medium animate-pulse">Loading services...</p>
        </div>
      </div>
    }>
      <ServicesPageContent />
    </Suspense>
  )
}