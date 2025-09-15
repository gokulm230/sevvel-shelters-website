"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  BriefcaseBusiness,
  Users,
  Building,
  BarChart3,
  GraduationCap,
  Clock,
  MapPin,
  ArrowRight,
  FileText,
  Mail,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import { Navbar } from "@/components/navbar";

// Job types
type JobCategory = "engineering" | "design" | "management" | "intern";

interface Job {
  id: string;
  title: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  category: JobCategory;
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
}

export function Careers() {
  const [activeTab, setActiveTab] = useState<JobCategory | "all">("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applicationState, setApplicationState] = useState<{
    show: boolean;
    status: "idle" | "success" | "error";
    job?: Job;
  }>({
    show: false,
    status: "idle",
  });

  // Job listings data
  const jobs: Job[] = [
    {
      id: "job1",
      title: "Civil Engineer",
      location: "Coimbatore, Tamil Nadu",
      type: "Full-time",
      category: "engineering",
      description:
        "We are looking for an experienced Civil Engineer to join our growing team. As a Civil Engineer at Sevvel Shelters, you will be responsible for designing, planning, and overseeing construction projects.",
      responsibilities: [
        "Prepare, review, and approve structural designs and calculations",
        "Develop construction plans and specifications",
        "Ensure all projects comply with legal requirements and quality standards",
        "Collaborate with architects and other professionals",
        "Monitor construction progress and troubleshoot issues as they arise",
      ],
      requirements: [
        "Bachelor's degree in Civil Engineering",
        "3+ years of experience in construction or related field",
        "Strong understanding of construction methods and technologies",
        "Proficiency in AutoCAD and structural analysis software",
        "Valid professional engineering license preferred",
      ],
      postedDate: "2023-09-01",
    },
    {
      id: "job2",
      title: "Interior Designer",
      location: "Coimbatore, Tamil Nadu",
      type: "Full-time",
      category: "design",
      description:
        "Sevvel Shelters is seeking a creative Interior Designer to create functional and aesthetically pleasing spaces for our residential and commercial projects.",
      responsibilities: [
        "Create innovative design concepts for client approval",
        "Select appropriate colors, materials, and finishes",
        "Prepare detailed design plans using CAD software",
        "Coordinate with contractors and vendors",
        "Ensure designs meet client requirements and budget constraints",
      ],
      requirements: [
        "Bachelor's degree in Interior Design or related field",
        "2+ years of professional design experience",
        "Proficiency in design software (AutoCAD, SketchUp, Adobe Creative Suite)",
        "Strong portfolio demonstrating design skills",
        "Knowledge of building codes and regulations",
      ],
      postedDate: "2023-09-15",
    },
    {
      id: "job3",
      title: "Project Manager",
      location: "Coimbatore, Tamil Nadu",
      type: "Full-time",
      category: "management",
      description:
        "We are looking for a detail-oriented Project Manager to oversee all aspects of our construction projects from inception to completion.",
      responsibilities: [
        "Develop and manage project schedules and budgets",
        "Coordinate with architects, engineers, and contractors",
        "Ensure projects meet quality standards and deadlines",
        "Manage client relationships and expectations",
        "Monitor and report on project progress regularly",
      ],
      requirements: [
        "Bachelor's degree in Construction Management, Engineering, or related field",
        "5+ years of experience in construction project management",
        "Strong understanding of construction processes and methodologies",
        "Excellent communication and leadership skills",
        "PMP certification preferred",
      ],
      postedDate: "2023-08-20",
    },
    {
      id: "job4",
      title: "Architectural Intern",
      location: "Coimbatore, Tamil Nadu",
      type: "Internship",
      category: "intern",
      description:
        "Sevvel Shelters offers a comprehensive internship program for architecture students looking to gain hands-on experience in real estate development.",
      responsibilities: [
        "Assist in drafting architectural drawings and models",
        "Support senior architects in design development",
        "Participate in client meetings and site visits",
        "Research building materials and sustainable practices",
        "Help prepare presentation materials",
      ],
      requirements: [
        "Currently pursuing a degree in Architecture",
        "Proficiency in AutoCAD, Revit, and other design software",
        "Strong interest in sustainable and modern design",
        "Good communication and teamwork skills",
        "Available for a minimum 3-month commitment",
      ],
      postedDate: "2023-09-10",
    },
    {
      id: "job5",
      title: "Construction Supervisor",
      location: "Coimbatore, Tamil Nadu",
      type: "Full-time",
      category: "management",
      description:
        "We are seeking an experienced Construction Supervisor to oversee on-site construction activities and ensure quality workmanship.",
      responsibilities: [
        "Supervise and coordinate construction activities on multiple sites",
        "Ensure compliance with safety regulations and quality standards",
        "Monitor construction progress and resolve technical issues",
        "Manage subcontractors and construction workers",
        "Report progress to project managers and stakeholders",
      ],
      requirements: [
        "Diploma or degree in Civil Engineering or Construction Management",
        "4+ years of experience in construction supervision",
        "Strong knowledge of construction methods and building codes",
        "Excellent leadership and problem-solving abilities",
        "Valid driver's license and ability to travel between sites",
      ],
      postedDate: "2023-08-25",
    },
  ];

  // Filter jobs based on active tab
  const filteredJobs =
    activeTab === "all"
      ? jobs
      : jobs.filter((job) => job.category === activeTab);

  // Application form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null as File | null,
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setValidationError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        resume: e.target.files![0],
      }));
      setValidationError(null);
    }
  };

  const handleApply = (job: Job) => {
    setApplicationState({
      show: true,
      status: "idle",
      job,
    });
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
      resume: null,
    });
    setValidationError(null);

    // Scroll to application form
    setTimeout(() => {
      document
        .getElementById("application-form")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.fullName.trim()) {
      setValidationError("Please enter your full name");
      return;
    }
    if (!formData.email.trim()) {
      setValidationError("Please enter your email address");
      return;
    }
    if (!formData.resume) {
      setValidationError("Please upload your resume");
      return;
    }

    // In a real application, you would send this data to your server
    // For now, we'll simulate a successful submission
    setApplicationState((prev) => ({
      ...prev,
      status: "success",
    }));

    // Reset form after 5 seconds
    setTimeout(() => {
      setApplicationState({
        show: false,
        status: "idle",
      });
    }, 5000);
  };

  return (
    <section id="careers" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <button 
            onClick={() => window.location.href = "/"} 
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </button>
        </div>
      {/* <Navbar /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Join Our Team
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Build your career with Sevvel Shelters and be part of creating
            inspiring spaces that transform lives and communities.
          </p>
        </div>

        {/* Why Join Us Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Why Work With Us
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Benefit 1 */}
            <Card className="bg-background border-border hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BriefcaseBusiness className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-lg mb-2">
                  Professional Growth
                </h4>
                <p className="text-muted-foreground">
                  Opportunities for advancement and skill development through
                  challenging projects and continuous learning.
                </p>
              </CardContent>
            </Card>

            {/* Benefit 2 */}
            <Card className="bg-background border-border hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-lg mb-2">
                  Collaborative Culture
                </h4>
                <p className="text-muted-foreground">
                  Work in a supportive team environment where innovation and
                  creativity are valued and encouraged.
                </p>
              </CardContent>
            </Card>

            {/* Benefit 3 */}
            <Card className="bg-background border-border hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Impactful Work</h4>
                <p className="text-muted-foreground">
                  Be part of transformative projects that positively impact
                  communities and shape urban landscapes.
                </p>
              </CardContent>
            </Card>

            {/* Benefit 4 */}
            <Card className="bg-background border-border hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-lg mb-2">
                  Industry Leadership
                </h4>
                <p className="text-muted-foreground">
                  Join a forward-thinking company known for innovation and
                  excellence in real estate development.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Current Openings Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Current Openings
          </h3>

          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={(value) => {
              // Prevent URL hash changes
              history.pushState(null, "", window.location.pathname);
              setActiveTab(value as JobCategory | "all");
            }}
          >
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all" onClick={(e) => e.preventDefault()}>
                  All Positions
                </TabsTrigger>
                <TabsTrigger
                  value="engineering"
                  onClick={(e) => e.preventDefault()}
                >
                  Engineering
                </TabsTrigger>
                <TabsTrigger value="design" onClick={(e) => e.preventDefault()}>
                  Design
                </TabsTrigger>
                <TabsTrigger
                  value="management"
                  onClick={(e) => e.preventDefault()}
                >
                  Management
                </TabsTrigger>
                <TabsTrigger value="intern" onClick={(e) => e.preventDefault()}>
                  Internships
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <JobList
                jobs={filteredJobs}
                onViewDetails={(job) => setSelectedJob(job)}
                onApply={handleApply}
              />
            </TabsContent>

            <TabsContent value="engineering" className="mt-0">
              <JobList
                jobs={filteredJobs}
                onViewDetails={(job) => setSelectedJob(job)}
                onApply={handleApply}
              />
            </TabsContent>

            <TabsContent value="design" className="mt-0">
              <JobList
                jobs={filteredJobs}
                onViewDetails={(job) => setSelectedJob(job)}
                onApply={handleApply}
              />
            </TabsContent>

            <TabsContent value="management" className="mt-0">
              <JobList
                jobs={filteredJobs}
                onViewDetails={(job) => setSelectedJob(job)}
                onApply={handleApply}
              />
            </TabsContent>

            <TabsContent value="intern" className="mt-0">
              <JobList
                jobs={filteredJobs}
                onViewDetails={(job) => setSelectedJob(job)}
                onApply={handleApply}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Job Details Modal */}
        {selectedJob && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {selectedJob.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <MapPin className="h-3 w-3" /> {selectedJob.location}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Clock className="h-3 w-3" /> {selectedJob.type}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedJob(null)}
                  >
                    Close
                  </Button>
                </div>

                <div className="space-y-6 my-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      Job Description
                    </h4>
                    <p className="text-muted-foreground">
                      {selectedJob.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      Responsibilities
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {selectedJob.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2">Requirements</h4>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {selectedJob.requirements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t flex justify-end">
                  <Button
                    onClick={() => {
                      handleApply(selectedJob);
                      setSelectedJob(null);
                    }}
                  >
                    Apply for this Position{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Application Form */}
        {applicationState.show && (
          <div
            id="application-form"
            className="border border-border rounded-lg p-6 mb-16"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Apply for: {applicationState.job?.title}
            </h3>

            {applicationState.status === "success" ? (
              <Alert className="bg-green-50 border-green-200 text-green-800">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription>
                  Your application has been submitted successfully! We'll review
                  your information and get back to you soon.
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleApplicationSubmit} className="space-y-6">
                {validationError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{validationError}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium mb-2"
                    >
                      Full Name*
                    </label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address*
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="coverLetter"
                    className="block text-sm font-medium mb-2"
                  >
                    Cover Letter
                  </label>
                  <Textarea
                    id="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    placeholder="Tell us why you're interested in this position and what makes you a good fit..."
                    rows={4}
                  />
                </div>

                <div>
                  <label
                    htmlFor="resume"
                    className="block text-sm font-medium mb-2"
                  >
                    Upload Resume* (PDF, DOC, or DOCX)
                  </label>
                  <div className="flex items-center">
                    <Input
                      id="resume"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                  </div>
                  {formData.resume && (
                    <p className="text-sm text-muted-foreground mt-2 flex items-center">
                      <FileText className="h-3 w-3 mr-1" />{" "}
                      {formData.resume.name}
                    </p>
                  )}
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>* Required fields</p>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() =>
                      setApplicationState({ show: false, status: "idle" })
                    }
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit Application</Button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* FAQs Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h3>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What is the hiring process like at Sevvel Shelters?
              </AccordionTrigger>
              <AccordionContent>
                Our hiring process typically includes an initial application
                review, followed by a phone screening, one or two interviews
                (technical and/or behavioral), and possibly a skills assessment
                depending on the role. The entire process usually takes 2-3
                weeks, and we keep candidates informed at every stage.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                Do you offer internships or entry-level positions?
              </AccordionTrigger>
              <AccordionContent>
                Yes, we offer both internships and entry-level positions across
                various departments. Our internship programs are designed to
                provide meaningful work experience and mentorship to students
                and recent graduates. We also have dedicated entry-level roles
                that include training and development opportunities.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                What benefits and perks do you offer?
              </AccordionTrigger>
              <AccordionContent>
                We provide a comprehensive benefits package that includes health
                insurance, retirement benefits, paid time off, professional
                development allowances, and flexible work arrangements. We also
                organize team events, celebrate achievements, and foster a
                supportive work environment focused on employee well-being.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                How do you support professional development?
              </AccordionTrigger>
              <AccordionContent>
                We invest in our team members' growth through mentorship
                programs, training opportunities, conference attendance, and
                continuing education support. We encourage employees to expand
                their skills and knowledge, and we provide pathways for career
                advancement within the company.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                I don't see a position that matches my skills. Can I still
                apply?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely! We're always interested in connecting with talented
                professionals. You can submit your resume for general
                consideration, and we'll keep it on file for future
                opportunities. Please email your resume to
                careers@sevvelshelters.com with a note about your areas of
                interest.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Have Questions About Careers at Sevvel Shelters?
          </h3>
          <p className="text-muted-foreground mb-6">
            We're here to help you find the right opportunity to grow with us.
          </p>
          <Button asChild>
            <a
              href="mailto:careers@sevvelshelters.com"
              className="inline-flex items-center"
            >
              <Mail className="mr-2 h-4 w-4" /> Contact Our Recruiting Team
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

// Job list component
function JobList({
  jobs,
  onViewDetails,
  onApply,
}: {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
  onApply: (job: Job) => void;
}) {
  // Calculate days ago for job postings
  const getDaysAgo = (dateString: string) => {
    const postedDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - postedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          No positions available in this category at the moment.
        </p>
        <p className="text-sm mt-2">
          Please check back later or send your resume for future opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-4 md:mb-0">
                <h4 className="text-lg font-semibold mb-2">{job.title}</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {job.location}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {job.type}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <GraduationCap className="h-3 w-3" />{" "}
                    {job.category.charAt(0).toUpperCase() +
                      job.category.slice(1)}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {job.description}
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end justify-between">
                <div className="text-sm text-muted-foreground mb-3">
                  Posted {getDaysAgo(job.postedDate)} days ago
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(job)}
                  >
                    View Details
                  </Button>
                  <Button size="sm" onClick={() => onApply(job)}>
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Careers;
