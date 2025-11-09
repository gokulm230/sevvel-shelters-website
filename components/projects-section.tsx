"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { usePublicProjects } from "@/hooks/use-projects"
import { ProjectDetailsModal } from "@/components/project-details-modal"
import { AutoSlidingProjectCard } from "@/components/auto-sliding-project-card"
import { type Project } from "@/lib/projects"
import { motion } from "framer-motion"
import { staggerContainer, fadeInUp, projectCardVariant, loadingVariant } from "@/lib/animations"

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { projects, loading, error } = usePublicProjects()

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-background relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-72 h-72 bg-primary/5 rounded-full blur-3xl top-10 right-10 animate-pulse"></div>
          <div className="absolute w-64 h-64 bg-green-200/10 rounded-full blur-3xl bottom-10 left-10 animate-pulse animation-delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance"
              variants={fadeInUp}
            >
              Our Ongoing Projects
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty"
              variants={fadeInUp}
            >
              Discover our current developments that showcase innovation, quality, and sustainable living solutions
              across Coimbatore.
            </motion.p>
          </motion.div>
          <motion.div 
            className="flex justify-center items-center py-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              variants={loadingVariant}
              animate="animate"
            >
              <Loader2 className="h-8 w-8 text-primary" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-background relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute w-72 h-72 bg-primary/5 rounded-full blur-3xl top-10 right-10 animate-pulse"></div>
          <div className="absolute w-64 h-64 bg-red-200/10 rounded-full blur-3xl bottom-10 left-10 animate-pulse animation-delay-1000"></div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance"
              variants={fadeInUp}
            >
              Our Ongoing Projects
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty"
              variants={fadeInUp}
            >
              Discover our current developments that showcase innovation, quality, and sustainable living solutions
              across Coimbatore.
            </motion.p>
          </motion.div>
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.p 
              className="text-muted-foreground text-lg"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Unable to load projects. Please try again later.
            </motion.p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="absolute w-72 h-72 bg-primary/5 rounded-full blur-3xl top-10 right-10 animate-pulse"></div>
        <div className="absolute w-64 h-64 bg-green-200/10 rounded-full blur-3xl bottom-10 left-10 animate-pulse animation-delay-1000"></div>
        <div className="absolute w-48 h-48 bg-emerald-200/15 rounded-full blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-float"></div>
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
            Our Ongoing Projects
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty"
            variants={fadeInUp}
          >
            Discover our current developments that showcase innovation, quality, and sustainable living solutions across
            Coimbatore.
          </motion.p>
        </motion.div>

        {projects.length === 0 ? (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.p 
              className="text-muted-foreground text-lg"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              No projects available at the moment.
            </motion.p>
          </motion.div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={projectCardVariant}
                  whileHover={{ 
                    scale: 1.02, 
                    rotateY: 2,
                    transition: { duration: 0.3 } 
                  }}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <AutoSlidingProjectCard 
                    project={project}
                    onOpenModal={openModal}
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent hover:shadow-lg transition-all duration-300"
                >
                  View All Projects
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}

        {/* Project Details Modal */}
        <ProjectDetailsModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </section>
  )
}
