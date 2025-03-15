'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { AnimatedGradient } from "./ui/animated-gradient"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { LoadSpinner } from "./SpinLoader";

const ContactForm: React.FC = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        phone : "",
        enquiryPurpose: 'enquiry'
    });
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
      })
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Post form data to API
        setIsLoading(true);
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
           
            toast({
              title: "Success",
              description: "Message Sent Successfully"
            })
            setFormData({
                name: '',email: '',message: '',enquiryPurpose: 'enquiry',phone: ""
            })
        } else {
          toast({
            title: "Error",
            description: "Failed to send message",
            variant: "destructive"
          })
        }
        setIsLoading(false);
    };

    return (
      <section id="contact" className="py-20">
       <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                ref={ref}
              >
                <AnimatedGradient className="inline-block">
                  <h2 className="text-3xl md:text-4xl font-bold text-white px-4 py-2">Inbox me</h2>
                </AnimatedGradient>
          </motion.div>
        <form onSubmit={handleSubmit} className="space-y-6 contact-form">
            <div>
                <h2>Contact me</h2>
            </div> 
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="borderless-top-side" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium ">
              Email
            </label>
            <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="borderless-top-side"/>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium ">
              Phone Number
            </label>
            <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="borderless-top-side"/>
          </div>
          <div>
                    <label className="block text-sm font-medium ">Purpose:</label>
                    <select name="enquiryPurpose" value={formData.enquiryPurpose} onChange={handleChange} className="select-ui" required>
                    <option value="enquiry">Enquiry</option>
                        <option value="freelancing">Freelancing Job</option>
                        <option value="contractjob">Contract Job</option>
                        <option value="consulation">Consultation</option>
                        <option value="training">Training</option>
                        <option value="mentorship">Guidance and Mentorship</option>
                        <option value="others">Others</option>
                       
                    </select>
                </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <Textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} required className="borderless-top-side" />
          </div>
          {
            isLoading ?
            <LoadSpinner /> :
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" style={{width : '60%',marginLeft:"20%", marginTop:"35px"}}>Send Message</Button>
          }
        </form>
      </section>
      )
};

export default ContactForm;