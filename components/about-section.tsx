"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Building, Leaf } from "lucide-react"
import { motion } from "framer-motion"
import { staggerContainer, fadeInUp, scaleIn, counterVariant } from "@/lib/animations"

export function AboutSection() {
  const achievements = [
    {
      icon: Building,
      title: "50+ Projects",
      description: "Successfully completed residential and commercial projects",
    },
    {
      icon: Users,
      title: "1000+ Families",
      description: "Happy families living in our quality homes",
    },
    {
      icon: Award,
      title: "15+ Years",
      description: "Of excellence in real estate development",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Sustainable construction practices and green building",
    },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="absolute w-64 h-64 bg-primary/5 rounded-full blur-3xl top-20 -left-32 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-green-200/10 rounded-full blur-3xl bottom-20 -right-40 animate-pulse animation-delay-1000"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance"
            variants={fadeInUp}
          >
            About Sevvel Shelters
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty"
            variants={fadeInUp}
          >
            Located in the heart of Coimbatore, we are committed to delivering exceptional real estate solutions that
            combine modern living with sustainable practices.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                transition: { duration: 0.3 } 
              }}
            >
              <Card className="text-center hover:shadow-xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <motion.div 
                    className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                    variants={counterVariant}
                    whileHover={{ 
                      rotate: 360,
                      backgroundColor: "var(--primary)",
                      transition: { duration: 0.6 }
                    }}
                  >
                    <achievement.icon className="h-8 w-8 text-primary" />
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-semibold text-foreground mb-2"
                    variants={fadeInUp}
                  >
                    {achievement.title}
                  </motion.h3>
                  <motion.p 
                    className="text-muted-foreground text-sm"
                    variants={fadeInUp}
                  >
                    {achievement.description}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Our Commitment to Excellence</h3>
            <div className="space-y-4 text-muted-foreground">
              <motion.p variants={fadeInUp}>
                At Sevvel Shelters, we believe that every family deserves a home that reflects their dreams and
                aspirations. Since our establishment, we have been dedicated to creating spaces that combine comfort,
                functionality, and aesthetic appeal.
              </motion.p>
              <motion.p variants={fadeInUp}>
                Our team of experienced professionals works tirelessly to ensure that every project meets the highest
                standards of quality and craftsmanship. From initial planning to final delivery, we maintain
                transparency and keep our clients informed at every step.
              </motion.p>
              <motion.p variants={fadeInUp}>
                We are proud to be part of Coimbatore's growth story, contributing to the city's development while
                maintaining our commitment to environmental sustainability and community welfare.
              </motion.p>
            </div>
          </motion.div>
          <motion.div 
            className="relative"
            variants={scaleIn}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <motion.img
              src="/house-of-dream-idea-real-estate-illustration-ai-generative-free-photo.jpg"
              alt="Sevvel Shelters Office"
              className="rounded-lg shadow-xl w-full h-auto"
              whileHover={{ 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: { duration: 0.3 }
              }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}