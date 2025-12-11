"use client";

import { useState, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setValidationError(null); // Clear any validation errors when user types
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName.trim()) {
      setValidationError("Please enter your first name");
      return;
    }
    if (!formData.email.trim()) {
      setValidationError("Please enter your email address");
      return;
    }
    if (!formData.message.trim()) {
      setValidationError("Please enter your message");
      return;
    }

    // Show the contact method selection modal
    setShowContactModal(true);
  };
  
  // Function to handle WhatsApp contact method
  const handleWhatsAppContact = () => {
    // Create WhatsApp message
    const whatsappMessage = `
Hello Sevvel Shelters Team,

I'd like to inquire about your services.

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject || "Inquiry from Website"}

Message:
${formData.message}

Looking forward to hearing from you.
Thank you.
    `.trim();

    // Create WhatsApp URL with the phone number 6383755749
    const whatsappLink = `https://wa.me/916383755749?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp in a new tab
    window.open(whatsappLink, '_blank');
    setShowContactModal(false);
  };
  
  // Function to handle Email contact method
  const handleEmailContact = async () => {
    // Import the email service
    const { sendEmail, createEmailBody } = await import("@/lib/email-service");

    try {
      // Show a loading message
      setValidationError("Sending your message...");
      
      // Create HTML email body using the service
      const fullName = `${formData.firstName} ${formData.lastName}`;
      const emailHTML = createEmailBody({
        name: fullName,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });
      
      // Send the email to Sevvel Shelters
      const successToCompany = await sendEmail({
        to: "info@sevvelshelters.com",
        subject: formData.subject || "Inquiry from Website",
        body: emailHTML,
        from: formData.email, 
        name: `${formData.firstName} ${formData.lastName}`
      });
      
      // Also send a confirmation email to the user
      const confirmationHTML = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #eaeaea;
                border-radius: 5px;
              }
              .header {
                background-color: #f8f9fa;
                padding: 15px;
                border-bottom: 1px solid #eaeaea;
                text-align: center;
              }
              .content {
                padding: 20px 0;
              }
              .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #666;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Thank You for Contacting Sevvel Shelters</h2>
              </div>
              <div class="content">
                <p>Dear ${formData.firstName},</p>
                <p>Thank you for reaching out to us. We have received your inquiry and will get back to you shortly.</p>
                
                <p><strong>Your message details:</strong></p>
                <p><strong>Subject:</strong> ${formData.subject || "Inquiry from Website"}</p>
                <p><strong>Message:</strong></p>
                <p>${formData.message.replace(/\n/g, '<br>')}</p>
                
                <p>If you have any additional questions, please don't hesitate to contact us.</p>
                
                <p>Best regards,<br>
                Sevvel Shelters Team<br>
                Phone: +91 6383755749<br>
                Email: info@sevvelshelters.com</p>
              </div>
              <div class="footer">
                <p>This is an automated confirmation message. Please do not reply to this email.</p>
              </div>
            </div>
          </body>
        </html>
      `;
      
      const successToUser = await sendEmail({
        to: formData.email,
        subject: "Thank You for Contacting Sevvel Shelters",
        body: confirmationHTML,
        from: "info@sevvelshelters.com",
        name: "Sevvel Shelters"
      });
      
      // Consider the overall success
      const success = successToCompany || successToUser;
      
      if (success) {
        // Show success message
        setShowContactModal(false);
        setValidationError(null);
        alert("Your message has been sent successfully!");
        
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        // If SMTP fails, fall back to mailto
        const emailBody = `
Hello Sevvel Shelters Team,

I'd like to inquire about your services.

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject || "Inquiry from Website"}

Message:
${formData.message}

Looking forward to hearing from you.
Thank you.
        `.trim();

        // Create mailto URL as fallback
        const mailtoLink = `mailto:sevvelshelters@gmail.com?subject=${encodeURIComponent(
          formData.subject || "Inquiry from Website"
        )}&body=${encodeURIComponent(emailBody)}`;

        // Open the mail client
        window.location.href = mailtoLink;
        setShowContactModal(false);
      }
    } catch (error) {
      console.error("Error in email sending:", error);
      alert("There was an issue sending your email. Please try WhatsApp instead.");
      setShowContactModal(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Contact Us
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Ready to start your dream project? Get in touch with our team for
            personalized consultation and expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Get In Touch
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Address
                    </h4>
                    <p className="text-muted-foreground">
                      Shop No 2, Mohanatamil Adukkagam
                      <br />
                      LN Nagar, Kalapatti
                      <br />
                      Coimbatore - 641048
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Phone
                    </h4>
                    <p className="text-muted-foreground">+91 9489533001</p>
                    <a 
                      href="https://wa.me/919489533001" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-primary hover:underline mt-1"
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="mr-1">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Email
                    </h4>
                    <a
                      href="mailto:info@sevvelshelters.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      sevvelshelters@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Business Hours
                    </h4>
                    <p className="text-muted-foreground">
                      Monday - Saturday: 9:00 AM - 6:00 PM
                      <br />
                      Sunday: 10:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Integration */}
            <div className="rounded-lg overflow-hidden h-64 border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.8337193716086!2d77.03021777589231!3d11.065634089204593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAzJzU2LjMiTiA3N8KwMDEnNTcuOCJF!5e0!3m2!1sen!2sin!4v1695287654321!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sevvel Shelters Location"
                aria-label="Sevvel Shelters Location Map"
              ></iframe>
            </div>

            {/* Add a direct link to Google Maps */}
            <div className="text-center">
              <a
                href="https://www.google.com/maps?q=11.0656328,77.032723"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:underline"
              >
                <MapPin className="h-4 w-4 mr-1" />
                <span>View on Google Maps</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Send us a Message
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Fill out this form to reach out via email or WhatsApp
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {validationError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{validationError}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      First Name*
                    </label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email Address*
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Message*
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements..."
                    rows={4}
                  />
                </div>

                <div className="text-sm text-muted-foreground mb-4">
                  <p>* Required fields</p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Contact Method Selection Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background rounded-lg p-6 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-foreground">Choose Contact Method</h3>
              <button 
                onClick={() => setShowContactModal(false)}
                className="p-1 rounded-full hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="mb-6 text-muted-foreground">
              How would you like to send your message to Sevvel Shelters?
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={handleEmailContact}
                className="flex flex-col items-center justify-center gap-3 h-auto py-6"
                variant="outline"
              >
                <Mail className="h-8 w-8" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-xs text-muted-foreground">Send via email client</div>
                </div>
              </Button>
              
              <Button
                onClick={handleWhatsAppContact}
                className="flex flex-col items-center justify-center gap-3 h-auto py-6 bg-[#25D366] hover:bg-[#20BD5C] text-white"
              >
                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div>
                  <div className="font-medium">WhatsApp</div>
                  <div className="text-xs opacity-90">Chat on WhatsApp</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}