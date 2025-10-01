"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Handshake, Scale, ArrowLeft, Phone } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const searchParams = useSearchParams()
  const serviceParam = searchParams.get('service')
  const [activeService, setActiveService] = useState(serviceParam || "liaison")

  // Update active service when URL parameter changes
  useEffect(() => {
    if (serviceParam) {
      setActiveService(serviceParam)
    }
  }, [serviceParam])

  const services = {
    liaison: {
      id: "liaison",
      title: "Liaison Services - As Per Government Norms Only",
      icon: Building2,
      description: "Welcome to Sevvel Shelters, your trusted partner for liaison services strictly adhering to government norms. Our expertise lies in providing comprehensive liaison services to ensure seamless compliance with regulatory requirements for your projects. From DTCP/LPA approval to land conversion, IIACA approval, corporation compliance, airport compliance, fire compliance, approval feasibility reports, RERA compliance, and technical due diligence, we offer different liaison services to meet your needs.",
      secondDescription: "Our team is proficient in navigating government regulations, offering efficient and reliable liaison services tailored to your needs. We prioritize client satisfaction and strive to ensure smooth approval processes for your projects, ensuring a smoother regulatory landscape.",
      thirdDescription: "At Sevvel Shelters, we prioritize client satisfaction and strive to exceed your expectations. Contact us today to learn more about how we can assist you in achieving your project goals while ensuring full compliance with government norms. Let us be your partners in success.",
      image: "/services/liaison-detailed.jpg",
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
      image: "/services/real-estate-detailed.jpg",
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
      image: "/services/legal-detailed.jpg",
      features: [
        "Due Diligence and Pre-Verifications - Our services guarantee the solid foundation of your real estate ventures through meticulous due diligence, pre-verification, risk identification, and legal compliance",
        "Asset Audits – Registrations - Our services include asset audits and registration, ensuring legal compliance and proper documentation, thereby safeguarding your assets for future growth and stability",
        "Legal opinion with topnotch lawyers - Our team of top-notch lawyers offers expert legal opinions, tailored to your unique needs and challenges, providing clarity and confidence in legal matters",
        "Suggesting advocates for the legal issues - We offer expert legal advice for High Court and Supreme Court matters, ensuring efficient and effective representation for optimal outcomes"
      ]
    }
  }

  const currentService = services[activeService as keyof typeof services]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-white hover:text-blue-200 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {currentService.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Service Image */}
            <div className="mb-8">
              <img 
                src="/modern-office-building-with-green-architecture-and.jpg"
                alt={currentService.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            {/* Service Description */}
            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {currentService.description}
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {currentService.secondDescription}
              </p>

              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {currentService.thirdDescription}
              </p>
            </div>

            {/* Service Features */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Provide In Liaison Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentService.features.map((feature, index) => {
                  const [title, description] = feature.split(' - ');
                  return (
                    <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-0">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                            <div className="w-6 h-6 bg-blue-600 rounded"></div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-blue-600 mb-2">{title}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Need Help? Call Us Now</h3>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-lg font-semibold text-blue-600">+91 9489533001</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-0">
                <div className="bg-blue-600 text-white p-4 rounded-t-lg">
                  <h3 className="text-lg font-semibold">Our Services</h3>
                </div>
                
                <div className="p-4 space-y-2">
                  {Object.values(services).map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setActiveService(service.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeService === service.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className="flex items-center">
                        <service.icon className="h-5 w-5 mr-3" />
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
            <Card className="mt-6">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Get Expert Consultation</h4>
                <p className="text-gray-600 mb-4">Contact our experts for personalized service solutions</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Contact Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}