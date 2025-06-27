import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Send, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../hooks/use-toast';

interface ContactFormProps {
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields.",
      });
      
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("/.netlify/functions/send-email", JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        // Success toast
        toast({
          variant: "success",
          title: "Message Sent Successfully! 🎉",
          description: "Thank you for reaching out! We'll get back to you within 24 hours.",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Error toast
      toast({
        variant: "destructive",
        title: "Failed to Send Message",
        description: "Sorry, there was an error sending your message. Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-mono font-medium text-timberwolf mb-2">
          {t('contactName')} *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className="w-full px-4 py-3 border border-jet rounded-lg bg-eerie-black text-timberwolf font-mono focus:ring-2 focus:ring-jonquil focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-mono font-medium text-timberwolf mb-2">
          {t('contactEmail')} *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className="w-full px-4 py-3 border border-jet rounded-lg bg-eerie-black text-timberwolf font-mono focus:ring-2 focus:ring-jonquil focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        />
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-mono font-medium text-timberwolf mb-2">
          {t('contactPhone')}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full px-4 py-3 border border-jet rounded-lg bg-eerie-black text-timberwolf font-mono focus:ring-2 focus:ring-jonquil focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        />
      </div>

      {/* Company Field */}
      <div>
        <label htmlFor="company" className="block text-sm font-mono font-medium text-timberwolf mb-2">
          {t('contactCompany')}
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full px-4 py-3 border border-jet rounded-lg bg-eerie-black text-timberwolf font-mono focus:ring-2 focus:ring-jonquil focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        />
      </div>

      {/* Subject Field */}
      <div>
        <label htmlFor="subject" className="block text-sm font-mono font-medium text-timberwolf mb-2">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          placeholder="e.g., Automation consultation request"
          className="w-full px-4 py-3 border border-jet rounded-lg bg-eerie-black text-timberwolf font-mono focus:ring-2 focus:ring-jonquil focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-mono font-medium text-timberwolf mb-2">
          {t('contactMessage')} *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          required
          disabled={isSubmitting}
          placeholder="Tell us about your automation goals, current challenges, or specific workflows you'd like to optimize..."
          className="w-full px-4 py-3 border border-jet rounded-lg bg-eerie-black text-timberwolf font-mono focus:ring-2 focus:ring-jonquil focus:border-transparent resize-vertical disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        />
      </div>

      {/* Submit Button */}
      <Button 
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-jonquil hover:bg-aureolin text-eerie-black font-mono text-lg py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold border-2 border-transparent hover:border-eerie-black disabled:hover:border-transparent"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            {t('contactSubmit')}
          </>
        )}
      </Button>
    </form>
  );
}